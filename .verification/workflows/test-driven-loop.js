#!/usr/bin/env node

/**
 * Test-Driven Development Feedback Loop
 *
 * Implementation of Option C: Test-Driven Loop
 * "Give Claude a way to verify its work = 2-3x better quality" - Boris
 *
 * Workflow:
 * 1. Write E2E tests first for:
 *    - Form submission
 *    - Navigation
 *    - Responsive breakpoints
 *    - User interactions
 * 2. Run tests (they should fail initially - RED)
 * 3. Implement features to pass tests
 * 4. Run tests again (should pass - GREEN)
 * 5. Refactor if needed (keep tests passing)
 * 6. Keep iterating until all tests green
 */

import { spawn } from 'child_process';
import { writeFileSync, readFileSync, existsSync, mkdirSync } from 'fs';
import { join } from 'path';

const MAX_ITERATIONS = 10;
const REPORT_DIR = '.verification/reports/test-driven-loop';
const TEST_TEMPLATE_DIR = '.verification/templates/test-driven';

class TestDrivenLoop {
  constructor(options = {}) {
    this.maxIterations = options.maxIterations || MAX_ITERATIONS;
    this.testFile = options.testFile || null;
    this.testType = options.testType || 'e2e'; // e2e, unit, integration
    this.watchMode = options.watchMode || false;
    this.iteration = 0;
    this.results = [];
    this.phase = 'RED'; // RED -> GREEN -> REFACTOR
  }

  async run() {
    console.log('\n🔴 Starting Test-Driven Development Feedback Loop...\n');
    console.log(`📋 Test Type: ${this.testType}`);
    console.log(`🔁 Max Iterations: ${this.maxIterations}\n`);

    // Ensure report directory exists
    if (!existsSync(REPORT_DIR)) {
      mkdirSync(REPORT_DIR, { recursive: true });
    }

    // Phase 1: Write tests (or verify they exist)
    if (!this.testFile) {
      console.log('⚠️  No test file specified. TDD requires tests first!\n');
      console.log('Options:');
      console.log('  1. Specify existing test with --test-file <path>');
      console.log('  2. Create new test template with --create-test <name>\n');
      return { success: false, reason: 'no-tests' };
    }

    if (!existsSync(this.testFile)) {
      console.log(`❌ Test file not found: ${this.testFile}\n`);
      return { success: false, reason: 'test-not-found' };
    }

    console.log(`✅ Test file: ${this.testFile}\n`);

    // Phase 2-6: Red-Green-Refactor loop
    let allTestsPass = false;
    while (this.iteration < this.maxIterations && !allTestsPass) {
      this.iteration++;
      console.log(`\n📍 Iteration ${this.iteration}/${this.maxIterations} [${this.phase}]\n`);

      const testResult = await this.runTests();
      allTestsPass = testResult.passed;

      if (this.phase === 'RED' && allTestsPass) {
        console.log('\n⚠️  Tests are passing in RED phase!');
        console.log('   This might indicate tests are not comprehensive enough.\n');
        this.phase = 'GREEN';
      } else if (this.phase === 'RED' && !allTestsPass) {
        console.log('\n🔴 RED: Tests failing as expected.');
        console.log('   Now implement features to make them pass.\n');
        this.phase = 'GREEN';
        await this.waitForImplementation();
      } else if (this.phase === 'GREEN' && allTestsPass) {
        console.log('\n🟢 GREEN: All tests passing!');
        console.log('   Consider refactoring while keeping tests green.\n');
        this.generateSuccessReport();
        return { success: true, iterations: this.iteration };
      } else if (this.phase === 'GREEN' && !allTestsPass) {
        console.log('\n🔴 Still in RED phase. Keep implementing...\n');
        await this.reportFailures(testResult);

        if (this.iteration < this.maxIterations) {
          await this.waitForImplementation();
        }
      }
    }

    if (!allTestsPass) {
      console.log(`\n❌ FAILED: Tests still failing after ${this.maxIterations} iterations.\n`);
      this.generateFailureReport();
      return { success: false, iterations: this.iteration };
    }

    return { success: true, iterations: this.iteration };
  }

  async runTests() {
    console.log('🧪 Running tests...\n');

    const testCommand = this.getTestCommand();

    return new Promise((resolve) => {
      const test = spawn('npm', ['run', testCommand], {
        stdio: 'pipe',
        shell: true
      });

      let stdout = '';
      let stderr = '';

      test.stdout.on('data', (data) => {
        const output = data.toString();
        stdout += output;
        // Show real-time output
        process.stdout.write(output);
      });

      test.stderr.on('data', (data) => {
        const output = data.toString();
        stderr += output;
        process.stderr.write(output);
      });

      test.on('close', (code) => {
        const result = {
          iteration: this.iteration,
          phase: this.phase,
          passed: code === 0,
          exitCode: code,
          timestamp: new Date().toISOString(),
          output: stdout,
          errors: stderr,
          testFile: this.testFile
        };

        this.results.push(result);

        if (code === 0) {
          console.log('\n✅ All tests passed!\n');
        } else {
          console.log(`\n❌ Tests failed (exit code: ${code})\n`);
        }

        resolve(result);
      });
    });
  }

  getTestCommand() {
    if (this.testType === 'e2e') {
      return 'test:e2e';
    } else if (this.testType === 'unit') {
      return 'test:run';
    } else {
      return 'test';
    }
  }

  async reportFailures(testResult) {
    console.log('📊 Test Failure Analysis:\n');

    // Parse test output for failures
    const failures = this.parseFailures(testResult.output);

    if (failures.length === 0) {
      console.log('   No specific failures identified. Check detailed output above.\n');
    } else {
      console.log('🎯 Failed Tests:\n');
      failures.forEach((failure, index) => {
        console.log(`   ${index + 1}. ${failure.test}`);
        if (failure.error) {
          console.log(`      Error: ${failure.error}`);
        }
      });
      console.log('');
    }

    // Save detailed report
    const reportPath = join(REPORT_DIR, `iteration-${this.iteration}.json`);
    writeFileSync(reportPath, JSON.stringify({
      ...testResult,
      failures
    }, null, 2));
    console.log(`📄 Detailed report: ${reportPath}\n`);
  }

  parseFailures(output) {
    const failures = [];
    const lines = output.split('\n');

    let currentTest = null;
    let currentError = null;

    for (const line of lines) {
      // Playwright format
      if (line.includes('✘') || line.includes('FAIL')) {
        currentTest = line.trim();
      } else if (line.includes('Error:') && currentTest) {
        currentError = line.trim();
        failures.push({
          test: currentTest,
          error: currentError
        });
        currentTest = null;
        currentError = null;
      }

      // Vitest format
      if (line.includes('FAIL') && line.includes('test')) {
        failures.push({
          test: line.trim(),
          error: null
        });
      }
    }

    return failures;
  }

  async waitForImplementation() {
    if (this.watchMode) {
      console.log('⏳ Watch mode enabled. Tests will re-run on file changes...\n');
      await this.sleep(2000);
    } else {
      console.log('⏸️  Paused. Implement features to fix failing tests.\n');
      console.log('   Press Enter when ready to re-run tests (or wait 60s)...\n');
      await this.waitForUserOrTimeout(60000);
    }
  }

  generateSuccessReport() {
    const report = {
      status: 'SUCCESS',
      methodology: 'Test-Driven Development',
      iterations: this.iteration,
      completedAt: new Date().toISOString(),
      summary: `All tests passing after ${this.iteration} iteration(s)`,
      testFile: this.testFile,
      results: this.results,
      tddCycle: {
        red: 'Tests written and initially failing',
        green: `Features implemented (${this.iteration} iterations)`,
        refactor: 'Ready for refactoring while keeping tests green'
      }
    };

    const reportPath = join(REPORT_DIR, 'success-report.json');
    writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`📄 Success report: ${reportPath}\n`);

    // Show TDD cycle summary
    console.log('🔄 TDD Cycle Completed:\n');
    console.log('   🔴 RED: Tests written and failing');
    console.log('   🟢 GREEN: Features implemented, tests passing');
    console.log('   ♻️  REFACTOR: Ready to improve code while maintaining green tests\n');
  }

  generateFailureReport() {
    const report = {
      status: 'FAILURE',
      methodology: 'Test-Driven Development',
      iterations: this.iteration,
      failedAt: new Date().toISOString(),
      summary: `Tests still failing after ${this.iteration} iterations`,
      testFile: this.testFile,
      nextSteps: [
        'Review test failures in iteration reports',
        'Check if tests are too strict or implementation is incomplete',
        'Consider breaking down features into smaller pieces',
        'Ensure tests are actually testing the right behavior',
        'Re-run with more iterations if needed'
      ],
      results: this.results
    };

    const reportPath = join(REPORT_DIR, 'failure-report.json');
    writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`📄 Failure report: ${reportPath}\n`);
  }

  async createTestTemplate(featureName, templateType) {
    if (!existsSync(TEST_TEMPLATE_DIR)) {
      mkdirSync(TEST_TEMPLATE_DIR, { recursive: true });
    }

    const templates = {
      'form': this.getFormTestTemplate(featureName),
      'navigation': this.getNavigationTestTemplate(featureName),
      'responsive': this.getResponsiveTestTemplate(featureName),
      'interaction': this.getInteractionTestTemplate(featureName)
    };

    const template = templates[templateType] || templates['interaction'];
    const testPath = join(TEST_TEMPLATE_DIR, `${featureName}.spec.ts`);

    writeFileSync(testPath, template);
    console.log(`✅ Test template created: ${testPath}\n`);

    return testPath;
  }

  getFormTestTemplate(featureName) {
    return `import { test, expect } from '@playwright/test';

/**
 * Test-Driven Development: ${featureName}
 *
 * These tests define the expected behavior BEFORE implementation.
 * Follow the Red-Green-Refactor cycle:
 * 1. RED: Tests fail (feature not implemented)
 * 2. GREEN: Implement minimum code to pass tests
 * 3. REFACTOR: Improve code while keeping tests green
 */

test.describe('${featureName}', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the feature page
    await page.goto('/'); // Update with actual path
  });

  test('should display the form', async ({ page }) => {
    const form = page.locator('form'); // Update selector
    await expect(form).toBeVisible();
  });

  test('should validate required fields', async ({ page }) => {
    const submitButton = page.locator('button[type="submit"]');
    await submitButton.click();

    // Should show validation errors
    const error = page.locator('.error'); // Update selector
    await expect(error).toBeVisible();
  });

  test('should submit form with valid data', async ({ page }) => {
    // Fill form fields
    await page.fill('input[name="field1"]', 'test value'); // Update

    // Submit
    await page.click('button[type="submit"]');

    // Should show success message
    const success = page.locator('.success'); // Update selector
    await expect(success).toBeVisible();
  });

  test('should handle submission errors gracefully', async ({ page }) => {
    // TODO: Implement error scenario
  });
});
`;
  }

  getNavigationTestTemplate(featureName) {
    return `import { test, expect } from '@playwright/test';

test.describe('${featureName} Navigation', () => {
  test('should navigate to correct pages', async ({ page }) => {
    await page.goto('/');

    // Test navigation
    await page.click('a[href="/target"]'); // Update selector
    await expect(page).toHaveURL('/target');
  });

  test('should maintain navigation state', async ({ page }) => {
    // TODO: Implement navigation state tests
  });
});
`;
  }

  getResponsiveTestTemplate(featureName) {
    return `import { test, expect } from '@playwright/test';

const viewports = [
  { name: 'mobile', width: 375, height: 667 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1920, height: 1080 }
];

test.describe('${featureName} Responsive', () => {
  for (const viewport of viewports) {
    test(\`should render correctly on \${viewport.name}\`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('/');

      // Test responsive behavior
      const element = page.locator('.responsive-element'); // Update
      await expect(element).toBeVisible();
    });
  }
});
`;
  }

  getInteractionTestTemplate(featureName) {
    return `import { test, expect } from '@playwright/test';

test.describe('${featureName} Interactions', () => {
  test('should handle user interactions', async ({ page }) => {
    await page.goto('/');

    // Test interaction
    const button = page.locator('button'); // Update selector
    await button.click();

    // Verify result
    const result = page.locator('.result'); // Update selector
    await expect(result).toBeVisible();
  });
});
`;
  }

  async waitForUserOrTimeout(ms) {
    return new Promise((resolve) => {
      const timeout = setTimeout(resolve, ms);

      if (process.stdin.isTTY) {
        process.stdin.setRawMode(true);
        process.stdin.resume();
        process.stdin.once('data', () => {
          clearTimeout(timeout);
          if (process.stdin.isTTY) {
            process.stdin.setRawMode(false);
          }
          process.stdin.pause();
          resolve();
        });
      } else {
        // Non-interactive mode, just wait
        setTimeout(resolve, ms);
      }
    });
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

// CLI Interface
if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2);
  const options = {};
  let shouldRunLoop = true;

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--test-file' && args[i + 1]) {
      options.testFile = args[++i];
    } else if (args[i] === '--test-type' && args[i + 1]) {
      options.testType = args[++i];
    } else if (args[i] === '--max-iterations' && args[i + 1]) {
      options.maxIterations = parseInt(args[++i], 10);
    } else if (args[i] === '--watch') {
      options.watchMode = true;
    } else if (args[i] === '--create-test' && args[i + 1]) {
      const featureName = args[++i];
      const templateType = args[i + 1] && !args[i + 1].startsWith('--') ? args[++i] : 'interaction';

      shouldRunLoop = false;
      (async () => {
        const loop = new TestDrivenLoop();
        try {
          const testPath = await loop.createTestTemplate(featureName, templateType);
          console.log('Next steps:');
          console.log(`  1. Edit the test: ${testPath}`);
          console.log(`  2. Run TDD loop: node test-driven-loop.js --test-file ${testPath}\n`);
          process.exit(0);
        } catch (error) {
          console.error('Error creating template:', error.message);
          process.exit(1);
        }
      })();
    } else if (args[i] === '--help') {
      console.log(`
Test-Driven Development Feedback Loop

Usage: node test-driven-loop.js [options]

Options:
  --test-file <path>       Path to test file (required for running tests)
  --test-type <type>       Type of test (e2e, unit, integration)
                           Default: e2e
  --max-iterations <num>   Maximum number of iterations
                           Default: 10
  --watch                  Enable watch mode (auto re-run on changes)
  --create-test <name> [type]  Create test template
                           Types: form, navigation, responsive, interaction
  --help                   Show this help message

Examples:
  # Create a test template
  node test-driven-loop.js --create-test user-profile form

  # Run TDD loop with existing test
  node test-driven-loop.js --test-file .verification/templates/test-driven/user-profile.spec.ts

  # Run in watch mode
  node test-driven-loop.js --test-file ./tests/feature.spec.ts --watch

  # Run with more iterations
  node test-driven-loop.js --test-file ./tests/feature.spec.ts --max-iterations 20

TDD Methodology:
  🔴 RED: Write tests that fail (feature not implemented yet)
  🟢 GREEN: Implement minimum code to make tests pass
  ♻️  REFACTOR: Improve code while keeping tests green
      `);
      process.exit(0);
    }
  }

  if (shouldRunLoop) {
    const loop = new TestDrivenLoop(options);
    loop.run()
      .then(result => {
        process.exit(result.success ? 0 : 1);
      })
      .catch(error => {
        console.error('\n💥 Fatal error:', error.message);
        console.error(error.stack);
        process.exit(1);
      });
  }
}

export default TestDrivenLoop;
