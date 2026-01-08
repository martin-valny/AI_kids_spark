#!/usr/bin/env node

/**
 * Quick Check Workflow
 * Fast feedback loop for rapid development (target: <30 seconds)
 * Runs: TypeScript type checking, ESLint, and smoke tests
 */

import { spawn } from 'child_process';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT_DIR = join(__dirname, '../..');

// Colors for terminal output
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

function logStep(step, total, name) {
  log(`\n[${step}/${total}] ${name}`, colors.bright + colors.cyan);
  console.log('-'.repeat(60));
}

// Run command and return result
async function runCommand(command, args, label) {
  return new Promise((resolve) => {
    const startTime = Date.now();
    const child = spawn(command, args, {
      cwd: ROOT_DIR,
      stdio: 'inherit',
      shell: true,
    });

    child.on('exit', (code) => {
      const duration = Date.now() - startTime;
      const success = code === 0;

      resolve({
        label,
        success,
        exitCode: code,
        duration,
      });
    });

    child.on('error', (error) => {
      const duration = Date.now() - startTime;
      resolve({
        label,
        success: false,
        error: error.message,
        duration,
      });
    });
  });
}

// Main quick check workflow
async function runQuickCheck() {
  const startTime = Date.now();
  const results = [];

  log('\n' + '='.repeat(80), colors.cyan);
  log('  ⚡ QUICK CHECK - Fast Development Feedback', colors.bright + colors.cyan);
  log('='.repeat(80), colors.cyan);
  log('Target: < 30 seconds for rapid iteration\n', colors.yellow);

  // Step 1: TypeScript Type Checking
  logStep(1, 3, '🔍 TypeScript Type Checking (tsc --noEmit)');
  const tscResult = await runCommand('npx', ['tsc', '--noEmit'], 'TypeScript');
  results.push(tscResult);

  // Step 2: ESLint
  logStep(2, 3, '🧹 ESLint (Code Quality & Standards)');
  const eslintResult = await runCommand('npm', ['run', 'lint'], 'ESLint');
  results.push(eslintResult);

  // Step 3: Smoke Tests (if test script exists)
  logStep(3, 3, '🧪 Smoke Tests (Critical Paths Only)');
  // Check if test script exists, otherwise skip
  try {
    const smokeResult = await runCommand('npm', ['run', 'test:smoke', '--if-present'], 'Smoke Tests');
    results.push(smokeResult);
  } catch (error) {
    log('ℹ️  No smoke tests configured - skipping', colors.yellow);
    results.push({
      label: 'Smoke Tests',
      success: true,
      skipped: true,
      duration: 0,
    });
  }

  const totalDuration = Date.now() - startTime;

  // Display summary
  console.log('\n' + '='.repeat(80));
  log('  📊 QUICK CHECK SUMMARY', colors.bright + colors.cyan);
  console.log('='.repeat(80) + '\n');

  let allPassed = true;
  results.forEach(result => {
    if (result.skipped) {
      log(`⏭️  ${result.label}: SKIPPED`, colors.yellow);
    } else if (result.success) {
      log(`✅ ${result.label}: PASSED (${(result.duration / 1000).toFixed(1)}s)`, colors.green);
    } else {
      log(`❌ ${result.label}: FAILED (${(result.duration / 1000).toFixed(1)}s)`, colors.red);
      allPassed = false;
    }
  });

  console.log('\n' + '-'.repeat(80));
  const durationSeconds = (totalDuration / 1000).toFixed(1);
  const targetMet = totalDuration < 30000;

  log(`⏱️  Total Duration: ${durationSeconds}s ${targetMet ? '✅' : '⚠️ (>30s)'}`,
    targetMet ? colors.green : colors.yellow);

  if (allPassed) {
    log('\n✅ QUICK CHECK PASSED! Ready to continue development.', colors.bright + colors.green);
    console.log('\nNext steps:');
    log('  • Continue making changes, or', colors.cyan);
    log('  • Run full verification: node .verification/workflows/full-verification.js', colors.cyan);
    process.exit(0);
  } else {
    log('\n❌ QUICK CHECK FAILED! Fix issues before continuing.', colors.bright + colors.red);
    console.log('\nTo fix:');
    log('  1. Review error messages above', colors.yellow);
    log('  2. Fix the issues in your code', colors.yellow);
    log('  3. Re-run: node .verification/workflows/quick-check.js', colors.yellow);
    process.exit(1);
  }
}

// Handle errors
process.on('unhandledRejection', (error) => {
  log(`\n❌ Fatal error: ${error.message}`, colors.bright + colors.red);
  console.error(error);
  process.exit(1);
});

// Run quick check
log('Starting quick check...', colors.cyan);
runQuickCheck();
