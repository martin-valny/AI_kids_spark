#!/usr/bin/env node

/**
 * Feedback Loop Orchestrator
 *
 * Unified interface for all feedback loops.
 * "Give Claude a way to verify its work = 2-3x better quality" - Boris
 *
 * Available Loops:
 * - Browser Testing Loop (Option A)
 * - Visual Comparison Loop (Option B)
 * - Test-Driven Loop (Option C)
 */

import { spawn } from 'child_process';
import { existsSync, writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const REPORT_DIR = '.verification/reports/feedback-loops';

class FeedbackLoopOrchestrator {
  constructor() {
    this.loops = {
      browser: {
        name: 'Browser Testing Loop',
        description: 'Build feature → Start dev server → Run UI tests → Fix issues → Repeat',
        script: '.verification/workflows/browser-testing-loop.js',
        emoji: '🌐'
      },
      visual: {
        name: 'Visual Comparison Loop',
        description: 'Implement design → Screenshot → Compare → Fix differences → Repeat',
        script: '.verification/workflows/visual-comparison-loop.js',
        emoji: '📸'
      },
      tdd: {
        name: 'Test-Driven Development Loop',
        description: 'Write tests → RED → Implement features → GREEN → Refactor',
        script: '.verification/workflows/test-driven-loop.js',
        emoji: '🔴'
      }
    };

    this.sessionLog = [];
  }

  async run(loopType, args = []) {
    if (!this.loops[loopType]) {
      console.error(`❌ Unknown loop type: ${loopType}`);
      console.log('\nAvailable loops:');
      this.listLoops();
      return { success: false, reason: 'unknown-loop' };
    }

    const loop = this.loops[loopType];

    console.log(`\n${loop.emoji} ${loop.name}`);
    console.log(`📋 ${loop.description}\n`);

    const startTime = Date.now();
    const result = await this.executeLoop(loop.script, args);
    const duration = Date.now() - startTime;

    const sessionEntry = {
      loopType,
      loopName: loop.name,
      success: result.success,
      exitCode: result.exitCode,
      duration,
      timestamp: new Date().toISOString(),
      args
    };

    this.sessionLog.push(sessionEntry);
    this.saveSessionLog();

    if (result.success) {
      console.log(`\n✅ ${loop.name} completed successfully!`);
      console.log(`⏱️  Duration: ${this.formatDuration(duration)}\n`);
    } else {
      console.log(`\n❌ ${loop.name} failed.`);
      console.log(`⏱️  Duration: ${this.formatDuration(duration)}\n`);
    }

    return result;
  }

  async executeLoop(scriptPath, args) {
    return new Promise((resolve) => {
      const proc = spawn('node', [scriptPath, ...args], {
        stdio: 'inherit',
        shell: true
      });

      proc.on('close', (code) => {
        resolve({
          success: code === 0,
          exitCode: code
        });
      });

      proc.on('error', (error) => {
        console.error('Error executing loop:', error.message);
        resolve({
          success: false,
          exitCode: -1,
          error: error.message
        });
      });
    });
  }

  async runAll(options = {}) {
    console.log('\n🔄 Running All Feedback Loops\n');
    console.log('This will sequentially run:');
    console.log('  1. Test-Driven Development Loop');
    console.log('  2. Browser Testing Loop');
    console.log('  3. Visual Comparison Loop\n');

    const results = {};

    // Run TDD loop first (write tests, implement features)
    if (!options.skipTdd) {
      console.log('━'.repeat(60));
      results.tdd = await this.run('tdd', options.tddArgs || []);
      if (!results.tdd.success && options.stopOnFailure) {
        console.log('\n⚠️  Stopping due to TDD loop failure (--stop-on-failure)\n');
        return { success: false, results };
      }
    }

    // Run browser testing loop (validate UI behavior)
    if (!options.skipBrowser) {
      console.log('━'.repeat(60));
      results.browser = await this.run('browser', options.browserArgs || []);
      if (!results.browser.success && options.stopOnFailure) {
        console.log('\n⚠️  Stopping due to browser testing failure (--stop-on-failure)\n');
        return { success: false, results };
      }
    }

    // Run visual comparison loop (validate appearance)
    if (!options.skipVisual) {
      console.log('━'.repeat(60));
      results.visual = await this.run('visual', options.visualArgs || []);
    }

    console.log('━'.repeat(60));
    console.log('\n📊 Feedback Loop Summary\n');

    let allPassed = true;
    for (const [type, result] of Object.entries(results)) {
      const loop = this.loops[type];
      const status = result.success ? '✅ PASS' : '❌ FAIL';
      console.log(`${loop.emoji} ${loop.name}: ${status}`);
      if (!result.success) allPassed = false;
    }

    console.log('');

    if (allPassed) {
      console.log('🎉 All feedback loops passed! Your feature is ready.\n');
    } else {
      console.log('⚠️  Some feedback loops failed. Review reports and fix issues.\n');
    }

    return { success: allPassed, results };
  }

  listLoops() {
    console.log('');
    for (const [type, loop] of Object.entries(this.loops)) {
      console.log(`${loop.emoji} ${type.padEnd(10)} - ${loop.name}`);
      console.log(`   ${loop.description}`);
      console.log('');
    }
  }

  async interactive() {
    console.log('\n🎯 Feedback Loop Orchestrator - Interactive Mode\n');
    this.listLoops();

    console.log('Choose a feedback loop:');
    console.log('  1. Browser Testing Loop');
    console.log('  2. Visual Comparison Loop');
    console.log('  3. Test-Driven Development Loop');
    console.log('  4. Run All Loops');
    console.log('  5. View Session Log');
    console.log('  0. Exit\n');

    // In real implementation, use readline for interactive input
    console.log('Use CLI arguments to run specific loops.\n');
    console.log('Examples:');
    console.log('  node feedback-loop-orchestrator.js browser');
    console.log('  node feedback-loop-orchestrator.js visual --update-baseline');
    console.log('  node feedback-loop-orchestrator.js tdd --test-file ./tests/feature.spec.ts');
    console.log('  node feedback-loop-orchestrator.js all --stop-on-failure\n');
  }

  saveSessionLog() {
    if (!existsSync(REPORT_DIR)) {
      mkdirSync(REPORT_DIR, { recursive: true });
    }

    const logPath = join(REPORT_DIR, 'session-log.json');
    const existingLog = existsSync(logPath)
      ? JSON.parse(require('fs').readFileSync(logPath, 'utf8'))
      : [];

    existingLog.push(...this.sessionLog);

    writeFileSync(logPath, JSON.stringify(existingLog, null, 2));
  }

  viewSessionLog() {
    const logPath = join(REPORT_DIR, 'session-log.json');

    if (!existsSync(logPath)) {
      console.log('📋 No session log found. Run some feedback loops first!\n');
      return;
    }

    const log = JSON.parse(require('fs').readFileSync(logPath, 'utf8'));

    console.log('\n📋 Feedback Loop Session Log\n');
    console.log(`Total sessions: ${log.length}\n`);

    // Show last 10 sessions
    const recent = log.slice(-10);
    recent.forEach((entry, index) => {
      const status = entry.success ? '✅' : '❌';
      const duration = this.formatDuration(entry.duration);
      console.log(`${status} ${entry.timestamp} - ${entry.loopName} (${duration})`);
    });

    console.log('');

    // Statistics
    const stats = {
      total: log.length,
      successful: log.filter(e => e.success).length,
      failed: log.filter(e => !e.success).length,
      byType: {}
    };

    for (const entry of log) {
      if (!stats.byType[entry.loopType]) {
        stats.byType[entry.loopType] = { total: 0, success: 0, fail: 0 };
      }
      stats.byType[entry.loopType].total++;
      if (entry.success) {
        stats.byType[entry.loopType].success++;
      } else {
        stats.byType[entry.loopType].fail++;
      }
    }

    console.log('📊 Statistics:\n');
    console.log(`Total runs: ${stats.total}`);
    console.log(`Successful: ${stats.successful} (${(stats.successful / stats.total * 100).toFixed(1)}%)`);
    console.log(`Failed: ${stats.failed} (${(stats.failed / stats.total * 100).toFixed(1)}%)\n`);

    console.log('By Loop Type:\n');
    for (const [type, data] of Object.entries(stats.byType)) {
      const loop = this.loops[type];
      console.log(`${loop.emoji} ${loop.name}:`);
      console.log(`   Total: ${data.total}, Success: ${data.success}, Fail: ${data.fail}`);
    }
    console.log('');
  }

  formatDuration(ms) {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    if (minutes > 0) {
      return `${minutes}m ${remainingSeconds}s`;
    }
    return `${seconds}s`;
  }

  showHelp() {
    console.log(`
Feedback Loop Orchestrator

Usage: node feedback-loop-orchestrator.js <command> [options]

Commands:
  browser              Run Browser Testing Loop
  visual               Run Visual Comparison Loop
  tdd                  Run Test-Driven Development Loop
  all                  Run all feedback loops sequentially
  list                 List available feedback loops
  log                  View session log and statistics
  help                 Show this help message

Options for 'all' command:
  --stop-on-failure    Stop execution if any loop fails
  --skip-tdd           Skip Test-Driven Development Loop
  --skip-browser       Skip Browser Testing Loop
  --skip-visual        Skip Visual Comparison Loop

Loop-specific options are passed through to individual loops.

Examples:
  # Run browser testing loop with smoke tests
  node feedback-loop-orchestrator.js browser --test-suite smoke

  # Update visual baselines
  node feedback-loop-orchestrator.js visual --update-baseline

  # Run TDD loop with specific test file
  node feedback-loop-orchestrator.js tdd --test-file ./tests/feature.spec.ts

  # Run all loops, stop on first failure
  node feedback-loop-orchestrator.js all --stop-on-failure

  # Run all except TDD
  node feedback-loop-orchestrator.js all --skip-tdd

  # View session history
  node feedback-loop-orchestrator.js log

The Three Feedback Loops (Boris's Recommendation):

🌐 Browser Testing Loop (Option A)
   Build → Dev Server → UI Tests → Fix → Repeat
   Best for: Functional validation, user interactions

📸 Visual Comparison Loop (Option B)
   Implement → Screenshot → Compare → Fix → Repeat
   Best for: Design accuracy, pixel-perfect implementation

🔴 Test-Driven Development Loop (Option C)
   Tests First → RED → Implement → GREEN → Refactor
   Best for: New features, robust implementation

"Give Claude a way to verify its work = 2-3x better quality" - Boris
    `);
  }
}

// CLI Interface
if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2);
  const command = args[0];

  const orchestrator = new FeedbackLoopOrchestrator();

  if (!command || command === 'help' || command === '--help') {
    orchestrator.showHelp();
    process.exit(0);
  }

  if (command === 'list') {
    orchestrator.listLoops();
    process.exit(0);
  }

  if (command === 'log') {
    orchestrator.viewSessionLog();
    process.exit(0);
  }

  if (command === 'interactive') {
    orchestrator.interactive();
    process.exit(0);
  }

  if (command === 'all') {
    const options = {
      stopOnFailure: args.includes('--stop-on-failure'),
      skipTdd: args.includes('--skip-tdd'),
      skipBrowser: args.includes('--skip-browser'),
      skipVisual: args.includes('--skip-visual')
    };

    orchestrator.runAll(options)
      .then(result => {
        process.exit(result.success ? 0 : 1);
      })
      .catch(error => {
        console.error('Error:', error.message);
        process.exit(1);
      });
  } else if (command === 'browser' || command === 'visual' || command === 'tdd') {
    const loopArgs = args.slice(1);
    orchestrator.run(command, loopArgs)
      .then(result => {
        process.exit(result.success ? 0 : 1);
      })
      .catch(error => {
        console.error('Error:', error.message);
        process.exit(1);
      });
  } else {
    console.error(`Unknown command: ${command}`);
    console.log('Run with --help for usage information.\n');
    process.exit(1);
  }
}

export default FeedbackLoopOrchestrator;
