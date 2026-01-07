#!/usr/bin/env node

/**
 * Full Verification Workflow
 * Runs all 3 agents sequentially: UI Tester → Code Reviewer → Performance Checker
 * Stops on critical failures and generates aggregated summary report
 */

import { spawn } from 'child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT_DIR = join(__dirname, '../..');
const REPORTS_DIR = join(ROOT_DIR, '.verification/reports');
const LATEST_DIR = join(REPORTS_DIR, 'latest');

// Ensure directories exist
if (!existsSync(LATEST_DIR)) {
  mkdirSync(LATEST_DIR, { recursive: true });
}

// Agent configuration
const AGENTS = [
  {
    name: 'UI Tester',
    id: 'ui-tester',
    command: 'node',
    args: ['.verification/agents/ui-tester/index.js'],
    critical: true,
    timeout: 300000, // 5 minutes
  },
  {
    name: 'Code Reviewer',
    id: 'code-reviewer',
    command: 'node',
    args: ['.verification/agents/code-reviewer/index.js'],
    critical: true,
    timeout: 180000, // 3 minutes
  },
  {
    name: 'Performance Checker',
    id: 'performance-checker',
    command: 'node',
    args: ['.verification/agents/performance-checker/index.js'],
    critical: false, // Performance issues are warnings, not blockers
    timeout: 600000, // 10 minutes
  },
];

// Logging utilities
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

function log(message, color = colors.reset) {
  console.log(`${color}${message}${colors.reset}`);
}

function logSection(title) {
  console.log('\n' + '='.repeat(80));
  log(`  ${title}`, colors.bright + colors.cyan);
  console.log('='.repeat(80) + '\n');
}

// Run agent with timeout and error handling
async function runAgent(agent) {
  return new Promise((resolve) => {
    const startTime = Date.now();
    log(`Starting ${agent.name}...`, colors.blue);

    const child = spawn(agent.command, agent.args, {
      cwd: ROOT_DIR,
      stdio: 'inherit',
      shell: true,
    });

    const timeoutId = setTimeout(() => {
      log(`${agent.name} timed out after ${agent.timeout / 1000}s`, colors.yellow);
      child.kill('SIGTERM');
      resolve({
        agent: agent.id,
        name: agent.name,
        success: false,
        error: 'Timeout',
        duration: agent.timeout,
        critical: agent.critical,
      });
    }, agent.timeout);

    child.on('exit', (code) => {
      clearTimeout(timeoutId);
      const duration = Date.now() - startTime;
      const success = code === 0;

      if (success) {
        log(`${agent.name} completed successfully in ${(duration / 1000).toFixed(2)}s`, colors.green);
      } else {
        log(`${agent.name} failed with exit code ${code}`, colors.red);
      }

      resolve({
        agent: agent.id,
        name: agent.name,
        success,
        exitCode: code,
        duration,
        critical: agent.critical,
      });
    });

    child.on('error', (error) => {
      clearTimeout(timeoutId);
      const duration = Date.now() - startTime;
      log(`${agent.name} encountered an error: ${error.message}`, colors.red);

      resolve({
        agent: agent.id,
        name: agent.name,
        success: false,
        error: error.message,
        duration,
        critical: agent.critical,
      });
    });
  });
}

// Main verification workflow
async function runFullVerification() {
  const startTime = Date.now();
  const results = [];
  let criticalFailure = false;

  logSection('Full Verification Workflow - Starting');
  log(`Running ${AGENTS.length} agents sequentially...`, colors.cyan);

  for (const agent of AGENTS) {
    const result = await runAgent(agent);
    results.push(result);

    // Check for critical failure
    if (!result.success && result.critical) {
      criticalFailure = true;
      log(`\n❌ CRITICAL FAILURE: ${agent.name} failed!`, colors.bright + colors.red);
      log('Stopping verification workflow.', colors.red);
      break;
    }

    // Small delay between agents
    if (agent !== AGENTS[AGENTS.length - 1]) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
  }

  const totalDuration = Date.now() - startTime;

  // Generate summary
  logSection('Verification Summary');

  const summary = {
    timestamp: new Date().toISOString(),
    duration: totalDuration,
    totalAgents: AGENTS.length,
    ranAgents: results.length,
    passed: results.filter(r => r.success).length,
    failed: results.filter(r => !r.success).length,
    criticalFailure,
    results,
  };

  // Display results
  results.forEach(result => {
    const icon = result.success ? '✅' : '❌';
    const statusColor = result.success ? colors.green : colors.red;
    const criticalTag = result.critical ? ' [CRITICAL]' : '';
    log(
      `${icon} ${result.name}${criticalTag}: ${result.success ? 'PASSED' : 'FAILED'} (${(result.duration / 1000).toFixed(2)}s)`,
      statusColor
    );
  });

  console.log('\n' + '-'.repeat(80));
  log(`Total Duration: ${(totalDuration / 1000).toFixed(2)}s`, colors.bright);
  log(`Passed: ${summary.passed}/${summary.totalAgents}`, summary.passed === summary.totalAgents ? colors.green : colors.yellow);
  log(`Failed: ${summary.failed}/${summary.totalAgents}`, summary.failed > 0 ? colors.red : colors.green);

  // Save summary to file
  const summaryPath = join(LATEST_DIR, 'verification-summary.json');
  writeFileSync(summaryPath, JSON.stringify(summary, null, 2));
  log(`\nSummary saved to: ${summaryPath}`, colors.cyan);

  // Generate aggregated report
  log('\nGenerating aggregated report...', colors.cyan);
  try {
    const reportGenerator = spawn('node', ['.verification/scripts/generate-report.js'], {
      cwd: ROOT_DIR,
      stdio: 'inherit',
    });

    await new Promise((resolve) => {
      reportGenerator.on('exit', resolve);
    });
  } catch (error) {
    log(`Warning: Could not generate HTML report: ${error.message}`, colors.yellow);
  }

  // Final status
  logSection('Verification Complete');

  if (criticalFailure) {
    log('❌ VERIFICATION FAILED - Critical issues detected', colors.bright + colors.red);
    log('Fix the issues above and re-run verification.', colors.yellow);
    process.exit(1);
  } else if (summary.failed > 0) {
    log('⚠️  VERIFICATION PASSED WITH WARNINGS', colors.bright + colors.yellow);
    log('Non-critical issues detected. Review and address when possible.', colors.yellow);
    process.exit(0);
  } else {
    log('✅ ALL VERIFICATIONS PASSED!', colors.bright + colors.green);
    log('Your code meets all quality standards.', colors.green);
    process.exit(0);
  }
}

// Run the workflow
runFullVerification().catch((error) => {
  log(`\nFatal error: ${error.message}`, colors.bright + colors.red);
  console.error(error);
  process.exit(1);
});
