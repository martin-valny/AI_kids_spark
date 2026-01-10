#!/usr/bin/env node

/**
 * Browser Testing Feedback Loop
 *
 * Implementation of Option A: Browser Testing Loop
 * "Give Claude a way to verify its work = 2-3x better quality" - Boris
 *
 * Workflow:
 * 1. Start local dev server
 * 2. Run UI tests to validate in browser
 * 3. If issues found, report them clearly
 * 4. Re-test until all checks pass
 * 5. Only then mark as complete
 */

import { spawn } from 'child_process';
import { writeFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

const MAX_ITERATIONS = 5;
const DEV_SERVER_PORT = 8080;
const REPORT_DIR = '.verification/reports/browser-testing-loop';

class BrowserTestingLoop {
  constructor(options = {}) {
    this.maxIterations = options.maxIterations || MAX_ITERATIONS;
    this.testSuite = options.testSuite || 'smoke'; // smoke, homepage, interactive, responsive
    this.autoFix = options.autoFix || false;
    this.iteration = 0;
    this.devServer = null;
    this.results = [];
  }

  async run() {
    console.log('\n🔄 Starting Browser Testing Feedback Loop...\n');
    console.log(`📋 Test Suite: ${this.testSuite}`);
    console.log(`🔁 Max Iterations: ${this.maxIterations}\n`);

    // Ensure report directory exists
    if (!existsSync(REPORT_DIR)) {
      mkdirSync(REPORT_DIR, { recursive: true });
    }

    try {
      // Step 1: Start dev server
      await this.startDevServer();

      // Step 2-4: Test and iterate
      let allTestsPass = false;
      while (this.iteration < this.maxIterations && !allTestsPass) {
        this.iteration++;
        console.log(`\n📍 Iteration ${this.iteration}/${this.maxIterations}\n`);

        allTestsPass = await this.runTests();

        if (!allTestsPass) {
          await this.reportIssues();

          if (this.autoFix) {
            console.log('\n🔧 Auto-fix is enabled, but manual fixes are recommended.');
            console.log('   Review the report and fix issues before next iteration.\n');
          }

          if (this.iteration < this.maxIterations) {
            console.log('⏳ Waiting 5 seconds before next iteration...\n');
            await this.sleep(5000);
          }
        }
      }

      // Step 5: Final result
      if (allTestsPass) {
        console.log('\n✅ SUCCESS! All tests passing. Feature is ready.\n');
        this.generateSuccessReport();
        return { success: true, iterations: this.iteration };
      } else {
        console.log(`\n❌ FAILED: Tests still failing after ${this.maxIterations} iterations.\n`);
        console.log('📄 Review the detailed report and fix remaining issues.\n');
        this.generateFailureReport();
        return { success: false, iterations: this.iteration };
      }

    } finally {
      await this.stopDevServer();
    }
  }

  async startDevServer() {
    console.log('🚀 Starting dev server on port', DEV_SERVER_PORT, '...\n');

    return new Promise((resolve, reject) => {
      this.devServer = spawn('npm', ['run', 'dev'], {
        stdio: 'pipe',
        shell: true
      });

      let output = '';
      const timeout = setTimeout(() => {
        reject(new Error('Dev server timeout - failed to start in 30s'));
      }, 30000);

      this.devServer.stdout.on('data', (data) => {
        output += data.toString();
        // Look for Vite's ready message
        if (output.includes('Local:') || output.includes('localhost')) {
          clearTimeout(timeout);
          console.log('✅ Dev server ready!\n');
          // Wait a bit more to ensure server is fully ready
          setTimeout(resolve, 2000);
        }
      });

      this.devServer.stderr.on('data', (data) => {
        console.error('Dev server error:', data.toString());
      });

      this.devServer.on('error', (error) => {
        clearTimeout(timeout);
        reject(error);
      });
    });
  }

  async stopDevServer() {
    if (this.devServer) {
      console.log('\n🛑 Stopping dev server...\n');
      this.devServer.kill();
      // Wait for process to cleanup
      await this.sleep(1000);
    }
  }

  async runTests() {
    console.log('🧪 Running UI tests...\n');

    return new Promise((resolve) => {
      const testFile = this.getTestFile();
      const test = spawn('npx', ['playwright', 'test', testFile, '--reporter=json'], {
        stdio: 'pipe',
        shell: true
      });

      let stdout = '';
      let stderr = '';

      test.stdout.on('data', (data) => {
        stdout += data.toString();
      });

      test.stderr.on('data', (data) => {
        stderr += data.toString();
      });

      test.on('close', (code) => {
        const result = {
          iteration: this.iteration,
          passed: code === 0,
          exitCode: code,
          timestamp: new Date().toISOString(),
          output: stdout,
          errors: stderr
        };

        this.results.push(result);

        if (code === 0) {
          console.log('✅ All tests passed!\n');
          resolve(true);
        } else {
          console.log(`❌ Tests failed with exit code ${code}\n`);
          resolve(false);
        }
      });
    });
  }

  getTestFile() {
    const testFiles = {
      'smoke': '.verification/agents/ui-tester/test-suites/smoke.spec.ts',
      'homepage': '.verification/agents/ui-tester/test-suites/homepage.spec.ts',
      'interactive': '.verification/agents/ui-tester/test-suites/interactive.spec.ts',
      'responsive': '.verification/agents/ui-tester/test-suites/responsive.spec.ts'
    };

    return testFiles[this.testSuite] || testFiles['smoke'];
  }

  async reportIssues() {
    const currentResult = this.results[this.results.length - 1];

    console.log('📊 Test Results:\n');
    console.log('   Exit Code:', currentResult.exitCode);
    console.log('   Timestamp:', currentResult.timestamp);

    if (currentResult.errors) {
      console.log('\n🔍 Error Details:\n');
      console.log(currentResult.errors);
    }

    // Save detailed report
    const reportPath = join(REPORT_DIR, `iteration-${this.iteration}.json`);
    writeFileSync(reportPath, JSON.stringify(currentResult, null, 2));
    console.log(`\n📄 Detailed report saved: ${reportPath}\n`);

    // Extract and display actionable issues
    this.extractActionableIssues(currentResult);
  }

  extractActionableIssues(result) {
    console.log('🎯 Action Items:\n');

    // Parse Playwright output for specific failures
    const lines = result.output.split('\n');
    let issueCount = 0;

    for (const line of lines) {
      if (line.includes('FAIL') || line.includes('Error:') || line.includes('expected')) {
        console.log(`   ${++issueCount}. ${line.trim()}`);
      }
    }

    if (issueCount === 0) {
      console.log('   Check the detailed report for more information.');
    }

    console.log('');
  }

  generateSuccessReport() {
    const report = {
      status: 'SUCCESS',
      iterations: this.iteration,
      testSuite: this.testSuite,
      completedAt: new Date().toISOString(),
      summary: `All tests passed after ${this.iteration} iteration(s)`,
      results: this.results
    };

    const reportPath = join(REPORT_DIR, 'success-report.json');
    writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`📄 Success report: ${reportPath}\n`);
  }

  generateFailureReport() {
    const report = {
      status: 'FAILURE',
      iterations: this.iteration,
      testSuite: this.testSuite,
      failedAt: new Date().toISOString(),
      summary: `Tests still failing after ${this.iteration} iterations`,
      nextSteps: [
        'Review iteration reports in ' + REPORT_DIR,
        'Fix identified issues manually',
        'Re-run the feedback loop',
        'Consider breaking down the feature into smaller parts'
      ],
      results: this.results
    };

    const reportPath = join(REPORT_DIR, 'failure-report.json');
    writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`📄 Failure report: ${reportPath}\n`);
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// CLI Interface
if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2);
  const options = {};

  // Parse arguments
  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--test-suite' && args[i + 1]) {
      options.testSuite = args[++i];
    } else if (args[i] === '--max-iterations' && args[i + 1]) {
      options.maxIterations = parseInt(args[++i], 10);
    } else if (args[i] === '--auto-fix') {
      options.autoFix = true;
    } else if (args[i] === '--help') {
      console.log(`
Browser Testing Feedback Loop

Usage: node browser-testing-loop.js [options]

Options:
  --test-suite <name>      Test suite to run (smoke, homepage, interactive, responsive)
                           Default: smoke
  --max-iterations <num>   Maximum number of test iterations
                           Default: 5
  --auto-fix               Enable automatic fixing (experimental)
  --help                   Show this help message

Examples:
  node browser-testing-loop.js
  node browser-testing-loop.js --test-suite interactive --max-iterations 3
  node browser-testing-loop.js --test-suite responsive --auto-fix
      `);
      process.exit(0);
    }
  }

  const loop = new BrowserTestingLoop(options);
  loop.run()
    .then(result => {
      process.exit(result.success ? 0 : 1);
    })
    .catch(error => {
      console.error('\n💥 Fatal error:', error.message);
      process.exit(1);
    });
}

export default BrowserTestingLoop;
