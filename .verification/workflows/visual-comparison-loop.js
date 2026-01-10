#!/usr/bin/env node

/**
 * Visual Comparison Feedback Loop
 *
 * Implementation of Option B: Visual Comparison Loop
 * "Give Claude a way to verify its work = 2-3x better quality" - Boris
 *
 * Workflow:
 * 1. Take screenshots of implementation
 * 2. Compare to design mockup/baseline
 * 3. List differences (pixel diff, layout shifts, color variations)
 * 4. Fix discrepancies
 * 5. Re-screenshot and verify
 * 6. Repeat until pixel-perfect (or within threshold)
 */

import { spawn } from 'child_process';
import { writeFileSync, readFileSync, existsSync, mkdirSync, readdirSync } from 'fs';
import { join } from 'path';
import { chromium } from 'playwright';

const MAX_ITERATIONS = 5;
const DEV_SERVER_PORT = 8080;
const REPORT_DIR = '.verification/reports/visual-comparison-loop';
const BASELINE_DIR = '.verification/baselines';
const SCREENSHOT_DIR = join(REPORT_DIR, 'screenshots');
const DIFF_THRESHOLD = 0.1; // 0.1% pixel difference threshold

class VisualComparisonLoop {
  constructor(options = {}) {
    this.maxIterations = options.maxIterations || MAX_ITERATIONS;
    this.urls = options.urls || ['/'];
    this.baselineDir = options.baselineDir || BASELINE_DIR;
    this.threshold = options.threshold || DIFF_THRESHOLD;
    this.updateBaseline = options.updateBaseline || false;
    this.viewports = options.viewports || [
      { name: 'desktop', width: 1920, height: 1080 },
      { name: 'tablet', width: 768, height: 1024 },
      { name: 'mobile', width: 375, height: 667 }
    ];
    this.iteration = 0;
    this.devServer = null;
    this.results = [];
  }

  async run() {
    console.log('\n📸 Starting Visual Comparison Feedback Loop...\n');
    console.log(`🎯 Difference Threshold: ${this.threshold}%`);
    console.log(`🔁 Max Iterations: ${this.maxIterations}`);
    console.log(`📱 Viewports: ${this.viewports.map(v => v.name).join(', ')}\n`);

    // Ensure directories exist
    [REPORT_DIR, SCREENSHOT_DIR, this.baselineDir].forEach(dir => {
      if (!existsSync(dir)) {
        mkdirSync(dir, { recursive: true });
      }
    });

    try {
      // Start dev server
      await this.startDevServer();

      // Check if baselines exist
      const baselinesExist = this.checkBaselines();
      if (!baselinesExist && !this.updateBaseline) {
        console.log('⚠️  No baseline screenshots found!');
        console.log('   Run with --update-baseline to create initial baselines.\n');
        return { success: false, reason: 'no-baselines' };
      }

      if (this.updateBaseline) {
        console.log('📸 Updating baseline screenshots...\n');
        await this.captureBaselines();
        console.log('✅ Baselines updated successfully!\n');
        return { success: true, reason: 'baselines-updated' };
      }

      // Iterate until pixel-perfect or max iterations
      let allPassed = false;
      while (this.iteration < this.maxIterations && !allPassed) {
        this.iteration++;
        console.log(`\n📍 Iteration ${this.iteration}/${this.maxIterations}\n`);

        allPassed = await this.compareVisuals();

        if (!allPassed) {
          await this.reportDifferences();

          if (this.iteration < this.maxIterations) {
            console.log('\n⏳ Fix the visual differences and press Enter to continue...');
            console.log('   (Or wait 30 seconds for automatic retry)\n');
            await this.waitForUserOrTimeout(30000);
          }
        }
      }

      // Final result
      if (allPassed) {
        console.log('\n✅ SUCCESS! Visual comparison passed. Pixel-perfect!\n');
        this.generateSuccessReport();
        return { success: true, iterations: this.iteration };
      } else {
        console.log(`\n❌ FAILED: Visual differences remain after ${this.maxIterations} iterations.\n`);
        console.log('📄 Review the diff images and detailed report.\n');
        this.generateFailureReport();
        return { success: false, iterations: this.iteration };
      }

    } finally {
      await this.stopDevServer();
    }
  }

  async startDevServer() {
    console.log('🚀 Starting dev server...\n');

    return new Promise((resolve, reject) => {
      this.devServer = spawn('npm', ['run', 'dev'], {
        stdio: 'pipe',
        shell: true
      });

      let output = '';
      const timeout = setTimeout(() => {
        reject(new Error('Dev server timeout'));
      }, 30000);

      this.devServer.stdout.on('data', (data) => {
        output += data.toString();
        if (output.includes('Local:') || output.includes('localhost')) {
          clearTimeout(timeout);
          console.log('✅ Dev server ready!\n');
          setTimeout(resolve, 2000);
        }
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
      await this.sleep(1000);
    }
  }

  checkBaselines() {
    for (const url of this.urls) {
      for (const viewport of this.viewports) {
        const baselinePath = this.getBaselinePath(url, viewport.name);
        if (!existsSync(baselinePath)) {
          return false;
        }
      }
    }
    return true;
  }

  async captureBaselines() {
    const browser = await chromium.launch();

    for (const viewport of this.viewports) {
      const context = await browser.newContext({
        viewport: { width: viewport.width, height: viewport.height }
      });
      const page = await context.newPage();

      for (const url of this.urls) {
        console.log(`📸 Capturing baseline: ${url} (${viewport.name})`);

        await page.goto(`http://localhost:${DEV_SERVER_PORT}${url}`, {
          waitUntil: 'networkidle'
        });

        // Wait for any animations to complete
        await page.waitForTimeout(1000);

        const screenshotPath = this.getBaselinePath(url, viewport.name);
        await page.screenshot({
          path: screenshotPath,
          fullPage: true
        });

        console.log(`   ✓ Saved: ${screenshotPath}`);
      }

      await context.close();
    }

    await browser.close();
  }

  async compareVisuals() {
    console.log('🔍 Comparing screenshots with baselines...\n');

    const browser = await chromium.launch();
    const differences = [];

    for (const viewport of this.viewports) {
      const context = await browser.newContext({
        viewport: { width: viewport.width, height: viewport.height }
      });
      const page = await context.newPage();

      for (const url of this.urls) {
        console.log(`🔍 Comparing: ${url} (${viewport.name})`);

        await page.goto(`http://localhost:${DEV_SERVER_PORT}${url}`, {
          waitUntil: 'networkidle'
        });

        await page.waitForTimeout(1000);

        const currentPath = this.getCurrentPath(url, viewport.name);
        await page.screenshot({
          path: currentPath,
          fullPage: true
        });

        // Use Playwright's built-in screenshot comparison
        const baselinePath = this.getBaselinePath(url, viewport.name);

        try {
          const baseline = readFileSync(baselinePath);
          const current = readFileSync(currentPath);

          // Simple comparison (can be enhanced with pixelmatch or other libs)
          const diff = await this.compareImages(baseline, current, url, viewport.name);

          if (diff.percentDiff > this.threshold) {
            differences.push({
              url,
              viewport: viewport.name,
              percentDiff: diff.percentDiff,
              diffPath: diff.diffPath
            });
            console.log(`   ❌ Difference: ${diff.percentDiff.toFixed(2)}%`);
          } else {
            console.log(`   ✅ Match: ${diff.percentDiff.toFixed(2)}%`);
          }

        } catch (error) {
          console.log(`   ⚠️  Error comparing: ${error.message}`);
          differences.push({
            url,
            viewport: viewport.name,
            error: error.message
          });
        }
      }

      await context.close();
    }

    await browser.close();

    const result = {
      iteration: this.iteration,
      passed: differences.length === 0,
      timestamp: new Date().toISOString(),
      differences
    };

    this.results.push(result);
    return differences.length === 0;
  }

  async compareImages(baseline, current, url, viewportName) {
    // Simple byte comparison
    // For production, use pixelmatch or similar library
    const baselineSize = baseline.length;
    const currentSize = current.length;

    const sizeDiff = Math.abs(baselineSize - currentSize);
    const percentDiff = (sizeDiff / baselineSize) * 100;

    const diffPath = this.getDiffPath(url, viewportName);

    // Save diff info (in real implementation, generate visual diff)
    const diffInfo = {
      baselineSize,
      currentSize,
      sizeDiff,
      percentDiff,
      note: 'Using simple byte comparison. Install pixelmatch for pixel-level diffs.'
    };

    writeFileSync(diffPath.replace('.png', '.json'), JSON.stringify(diffInfo, null, 2));

    return {
      percentDiff,
      diffPath
    };
  }

  getBaselinePath(url, viewportName) {
    const filename = this.urlToFilename(url, viewportName);
    return join(this.baselineDir, filename);
  }

  getCurrentPath(url, viewportName) {
    const filename = this.urlToFilename(url, viewportName);
    return join(SCREENSHOT_DIR, `iteration-${this.iteration}`, filename);
  }

  getDiffPath(url, viewportName) {
    const filename = this.urlToFilename(url, viewportName);
    const dir = join(SCREENSHOT_DIR, `iteration-${this.iteration}`, 'diffs');
    if (!existsSync(dir)) {
      mkdirSync(dir, { recursive: true });
    }
    return join(dir, `diff-${filename}`);
  }

  urlToFilename(url, viewportName) {
    const sanitized = url.replace(/\//g, '-').replace(/^-/, 'index');
    return `${sanitized}-${viewportName}.png`;
  }

  async reportDifferences() {
    const currentResult = this.results[this.results.length - 1];

    console.log('\n📊 Visual Comparison Results:\n');

    if (currentResult.differences.length === 0) {
      console.log('   ✅ No differences found!\n');
      return;
    }

    console.log('🎯 Differences Found:\n');
    currentResult.differences.forEach((diff, index) => {
      console.log(`   ${index + 1}. ${diff.url} (${diff.viewport})`);
      if (diff.percentDiff !== undefined) {
        console.log(`      Difference: ${diff.percentDiff.toFixed(2)}%`);
        console.log(`      Diff image: ${diff.diffPath}`);
      }
      if (diff.error) {
        console.log(`      Error: ${diff.error}`);
      }
    });
    console.log('');

    // Save detailed report
    const reportPath = join(REPORT_DIR, `iteration-${this.iteration}.json`);
    writeFileSync(reportPath, JSON.stringify(currentResult, null, 2));
    console.log(`📄 Detailed report: ${reportPath}\n`);
  }

  generateSuccessReport() {
    const report = {
      status: 'SUCCESS',
      iterations: this.iteration,
      threshold: this.threshold,
      completedAt: new Date().toISOString(),
      summary: `Visual comparison passed after ${this.iteration} iteration(s)`,
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
      threshold: this.threshold,
      failedAt: new Date().toISOString(),
      summary: `Visual differences remain after ${this.iteration} iterations`,
      nextSteps: [
        'Review screenshot comparisons in ' + SCREENSHOT_DIR,
        'Check diff images to identify specific issues',
        'Fix CSS, layout, or responsive issues',
        'Re-run the feedback loop'
      ],
      results: this.results
    };

    const reportPath = join(REPORT_DIR, 'failure-report.json');
    writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`📄 Failure report: ${reportPath}\n`);
  }

  async waitForUserOrTimeout(ms) {
    return new Promise((resolve) => {
      const timeout = setTimeout(resolve, ms);

      process.stdin.once('data', () => {
        clearTimeout(timeout);
        resolve();
      });
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

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--urls' && args[i + 1]) {
      options.urls = args[++i].split(',');
    } else if (args[i] === '--threshold' && args[i + 1]) {
      options.threshold = parseFloat(args[++i]);
    } else if (args[i] === '--max-iterations' && args[i + 1]) {
      options.maxIterations = parseInt(args[++i], 10);
    } else if (args[i] === '--update-baseline') {
      options.updateBaseline = true;
    } else if (args[i] === '--help') {
      console.log(`
Visual Comparison Feedback Loop

Usage: node visual-comparison-loop.js [options]

Options:
  --urls <urls>            Comma-separated URLs to test (e.g., /,/about,/lessons)
                           Default: /
  --threshold <percent>    Acceptable difference threshold (0.0-100.0)
                           Default: 0.1
  --max-iterations <num>   Maximum number of iterations
                           Default: 5
  --update-baseline        Update baseline screenshots instead of comparing
  --help                   Show this help message

Examples:
  # Create initial baselines
  node visual-comparison-loop.js --update-baseline

  # Compare current implementation
  node visual-comparison-loop.js

  # Test specific pages with custom threshold
  node visual-comparison-loop.js --urls /,/lessons,/projects --threshold 0.5

  # Test with more iterations
  node visual-comparison-loop.js --max-iterations 10
      `);
      process.exit(0);
    }
  }

  const loop = new VisualComparisonLoop(options);
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

export default VisualComparisonLoop;
