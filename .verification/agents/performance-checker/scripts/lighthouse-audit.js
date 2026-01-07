#!/usr/bin/env node

/**
 * Lighthouse Audit Script for AI Kids Spark
 *
 * Runs Lighthouse audits on specified URLs and validates against thresholds.
 * Generates detailed reports and tracks performance over time.
 */

const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const fs = require('fs').promises;
const path = require('path');

// Configuration
const CONFIG_PATH = path.join(__dirname, '../agent.config.json');
const THRESHOLDS_PATH = path.join(__dirname, '../benchmarks/thresholds.json');
const BASELINE_PATH = path.join(__dirname, '../benchmarks/baseline.json');
const REPORTS_DIR = path.join(__dirname, '../../../.verification/reports/performance');

// Test URLs
const URLS = [
  { url: 'http://localhost:5173/', name: 'Home' },
  { url: 'http://localhost:5173/lessons', name: 'Lessons' },
  { url: 'http://localhost:5173/activities/pattern-detective', name: 'Pattern Detective' },
  { url: 'http://localhost:5173/activities/draw-ai-friend', name: 'Draw AI Friend' },
  { url: 'http://localhost:5173/lessons/intro-to-ai', name: 'Intro to AI' }
];

class LighthouseAuditor {
  constructor() {
    this.config = null;
    this.thresholds = null;
    this.baseline = null;
    this.results = [];
    this.failures = [];
  }

  /**
   * Load configuration files
   */
  async loadConfig() {
    try {
      const configData = await fs.readFile(CONFIG_PATH, 'utf8');
      this.config = JSON.parse(configData);

      const thresholdsData = await fs.readFile(THRESHOLDS_PATH, 'utf8');
      this.thresholds = JSON.parse(thresholdsData);

      try {
        const baselineData = await fs.readFile(BASELINE_PATH, 'utf8');
        this.baseline = JSON.parse(baselineData);
      } catch (err) {
        console.warn('⚠️  Baseline file not found, creating new baseline...');
        this.baseline = { pages: {}, metadata: { created: new Date().toISOString() } };
      }

      console.log('✅ Configuration loaded successfully');
    } catch (error) {
      console.error('❌ Failed to load configuration:', error.message);
      throw error;
    }
  }

  /**
   * Launch Chrome and run Lighthouse audit
   */
  async runAudit(url, name, formFactor = 'desktop') {
    console.log(`\n🔍 Running ${formFactor} audit for: ${name}`);

    let chrome;
    try {
      // Launch Chrome
      chrome = await chromeLauncher.launch({
        chromeFlags: ['--headless', '--disable-gpu', '--no-sandbox']
      });

      // Lighthouse options
      const options = {
        logLevel: 'info',
        output: 'json',
        onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
        port: chrome.port,
        formFactor: formFactor,
        throttling: formFactor === 'desktop'
          ? this.config.lighthouse.settings.throttling
          : this.config.lighthouse.mobileSettings.throttling,
        screenEmulation: formFactor === 'desktop'
          ? this.config.lighthouse.settings.screenEmulation
          : this.config.lighthouse.mobileSettings.screenEmulation
      };

      // Run Lighthouse
      const runnerResult = await lighthouse(url, options);

      if (!runnerResult || !runnerResult.lhr) {
        throw new Error('No Lighthouse results returned');
      }

      // Extract metrics
      const report = runnerResult.lhr;
      const metrics = this.extractMetrics(report);

      console.log(`  Performance: ${metrics.performance}`);
      console.log(`  Accessibility: ${metrics.accessibility}`);
      console.log(`  LCP: ${metrics.LCP}ms`);
      console.log(`  CLS: ${metrics.CLS}`);

      return {
        url,
        name,
        formFactor,
        timestamp: new Date().toISOString(),
        metrics,
        report: runnerResult.report
      };

    } catch (error) {
      console.error(`❌ Audit failed for ${name}:`, error.message);
      return {
        url,
        name,
        formFactor,
        error: error.message,
        timestamp: new Date().toISOString()
      };
    } finally {
      if (chrome) {
        await chrome.kill();
      }
    }
  }

  /**
   * Extract key metrics from Lighthouse report
   */
  extractMetrics(report) {
    const scores = report.categories;
    const audits = report.audits;

    return {
      // Lighthouse scores (0-100)
      performance: Math.round(scores.performance.score * 100),
      accessibility: Math.round(scores.accessibility.score * 100),
      bestPractices: Math.round(scores['best-practices'].score * 100),
      seo: Math.round(scores.seo.score * 100),

      // Web Vitals
      LCP: Math.round(audits['largest-contentful-paint']?.numericValue || 0),
      FCP: Math.round(audits['first-contentful-paint']?.numericValue || 0),
      CLS: parseFloat((audits['cumulative-layout-shift']?.numericValue || 0).toFixed(3)),
      TBT: Math.round(audits['total-blocking-time']?.numericValue || 0),
      SI: Math.round(audits['speed-index']?.numericValue || 0),
      TTI: Math.round(audits['interactive']?.numericValue || 0),

      // Resource sizes (in KB)
      javascript: Math.round((audits['total-byte-weight']?.details?.items?.filter(
        item => item.resourceType === 'script'
      ).reduce((sum, item) => sum + item.transferSize, 0) || 0) / 1024),

      css: Math.round((audits['total-byte-weight']?.details?.items?.filter(
        item => item.resourceType === 'stylesheet'
      ).reduce((sum, item) => sum + item.transferSize, 0) || 0) / 1024),

      images: Math.round((audits['total-byte-weight']?.details?.items?.filter(
        item => item.resourceType === 'image'
      ).reduce((sum, item) => sum + item.transferSize, 0) || 0) / 1024),

      total: Math.round((audits['total-byte-weight']?.numericValue || 0) / 1024),

      // Additional metrics
      errorsInConsole: audits['errors-in-console']?.details?.items?.length || 0,
      networkRequests: audits['network-requests']?.details?.items?.length || 0
    };
  }

  /**
   * Validate metrics against thresholds
   */
  validateMetrics(result) {
    const { metrics, name } = result;
    const failures = [];

    // Check Lighthouse scores
    if (metrics.performance < this.thresholds.lighthouse.performance.error) {
      failures.push({
        metric: 'Performance Score',
        value: metrics.performance,
        threshold: this.thresholds.lighthouse.performance.error,
        severity: 'error'
      });
    }

    if (metrics.accessibility < this.thresholds.lighthouse.accessibility.error) {
      failures.push({
        metric: 'Accessibility Score',
        value: metrics.accessibility,
        threshold: this.thresholds.lighthouse.accessibility.error,
        severity: 'error'
      });
    }

    // Check Web Vitals
    if (metrics.LCP > this.thresholds.webVitals.LCP.good) {
      failures.push({
        metric: 'LCP',
        value: metrics.LCP,
        threshold: this.thresholds.webVitals.LCP.good,
        severity: 'error'
      });
    }

    if (metrics.CLS > this.thresholds.webVitals.CLS.good) {
      failures.push({
        metric: 'CLS',
        value: metrics.CLS,
        threshold: this.thresholds.webVitals.CLS.good,
        severity: 'error'
      });
    }

    if (metrics.FCP > this.thresholds.webVitals.FCP.good) {
      failures.push({
        metric: 'FCP',
        value: metrics.FCP,
        threshold: this.thresholds.webVitals.FCP.good,
        severity: 'warning'
      });
    }

    if (metrics.TBT > this.thresholds.webVitals.TBT.good) {
      failures.push({
        metric: 'TBT',
        value: metrics.TBT,
        threshold: this.thresholds.webVitals.TBT.good,
        severity: 'warning'
      });
    }

    // Check resource budgets
    if (metrics.javascript > this.thresholds.resourceBudgets.javascript.error) {
      failures.push({
        metric: 'JavaScript Size',
        value: `${metrics.javascript}kb`,
        threshold: `${this.thresholds.resourceBudgets.javascript.error}kb`,
        severity: 'error'
      });
    }

    if (metrics.css > this.thresholds.resourceBudgets.css.error) {
      failures.push({
        metric: 'CSS Size',
        value: `${metrics.css}kb`,
        threshold: `${this.thresholds.resourceBudgets.css.error}kb`,
        severity: 'error'
      });
    }

    // Kids-specific checks
    if (metrics.errorsInConsole > this.thresholds.kidsSpecific.errorsInConsole.maximum) {
      failures.push({
        metric: 'Console Errors',
        value: metrics.errorsInConsole,
        threshold: this.thresholds.kidsSpecific.errorsInConsole.maximum,
        severity: 'error'
      });
    }

    if (failures.length > 0) {
      result.failures = failures;
      this.failures.push({ page: name, failures });
    }

    return failures.length === 0;
  }

  /**
   * Generate audit reports
   */
  async generateReports() {
    try {
      await fs.mkdir(REPORTS_DIR, { recursive: true });

      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const summaryPath = path.join(REPORTS_DIR, `summary-${timestamp}.json`);
      const htmlPath = path.join(REPORTS_DIR, `report-${timestamp}.html`);

      // Save JSON summary
      const summary = {
        timestamp: new Date().toISOString(),
        results: this.results,
        failures: this.failures,
        passed: this.failures.length === 0
      };

      await fs.writeFile(summaryPath, JSON.stringify(summary, null, 2));
      console.log(`\n📊 Summary saved to: ${summaryPath}`);

      // Generate HTML report
      const html = this.generateHTMLReport(summary);
      await fs.writeFile(htmlPath, html);
      console.log(`📄 HTML report saved to: ${htmlPath}`);

      // Save individual Lighthouse reports
      for (const result of this.results) {
        if (result.report) {
          const reportPath = path.join(
            REPORTS_DIR,
            `lighthouse-${result.name.toLowerCase().replace(/\s/g, '-')}-${timestamp}.html`
          );
          await fs.writeFile(reportPath, result.report);
        }
      }

    } catch (error) {
      console.error('❌ Failed to generate reports:', error.message);
    }
  }

  /**
   * Generate HTML report
   */
  generateHTMLReport(summary) {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Lighthouse Audit Report - AI Kids Spark</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; margin: 40px; background: #f5f5f5; }
    .container { max-width: 1200px; margin: 0 auto; background: white; padding: 40px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
    h1 { color: #333; border-bottom: 3px solid #4CAF50; padding-bottom: 10px; }
    .summary { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin: 30px 0; }
    .metric-card { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px; }
    .metric-card h3 { margin: 0 0 10px 0; font-size: 14px; opacity: 0.9; }
    .metric-card .value { font-size: 32px; font-weight: bold; }
    .result { border: 1px solid #ddd; margin: 20px 0; padding: 20px; border-radius: 8px; }
    .result.pass { border-left: 4px solid #4CAF50; }
    .result.fail { border-left: 4px solid #f44336; }
    .failures { background: #fff3cd; padding: 15px; border-radius: 4px; margin-top: 10px; }
    .failure-item { color: #856404; margin: 5px 0; }
    table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
    th { background: #f8f9fa; font-weight: 600; }
    .badge { padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: bold; }
    .badge.success { background: #d4edda; color: #155724; }
    .badge.error { background: #f8d7da; color: #721c24; }
    .badge.warning { background: #fff3cd; color: #856404; }
  </style>
</head>
<body>
  <div class="container">
    <h1>🚀 Lighthouse Audit Report</h1>
    <p><strong>Project:</strong> AI Kids Spark</p>
    <p><strong>Generated:</strong> ${summary.timestamp}</p>
    <p><strong>Status:</strong> <span class="badge ${summary.passed ? 'success' : 'error'}">${summary.passed ? 'PASSED' : 'FAILED'}</span></p>

    <div class="summary">
      ${summary.results.map(r => r.metrics ? `
        <div class="metric-card">
          <h3>${r.name}</h3>
          <div class="value">${r.metrics.performance}</div>
          <div>Performance Score</div>
        </div>
      ` : '').join('')}
    </div>

    <h2>Detailed Results</h2>
    ${summary.results.map(result => `
      <div class="result ${result.failures && result.failures.length > 0 ? 'fail' : 'pass'}">
        <h3>${result.name} (${result.formFactor})</h3>
        ${result.error ? `
          <p style="color: #f44336;">❌ Error: ${result.error}</p>
        ` : result.metrics ? `
          <table>
            <tr>
              <th>Metric</th>
              <th>Value</th>
              <th>Status</th>
            </tr>
            <tr>
              <td>Performance</td>
              <td>${result.metrics.performance}</td>
              <td><span class="badge ${result.metrics.performance >= 85 ? 'success' : 'error'}">${result.metrics.performance >= 85 ? 'PASS' : 'FAIL'}</span></td>
            </tr>
            <tr>
              <td>Accessibility</td>
              <td>${result.metrics.accessibility}</td>
              <td><span class="badge ${result.metrics.accessibility >= 95 ? 'success' : 'error'}">${result.metrics.accessibility >= 95 ? 'PASS' : 'FAIL'}</span></td>
            </tr>
            <tr>
              <td>LCP</td>
              <td>${result.metrics.LCP}ms</td>
              <td><span class="badge ${result.metrics.LCP <= 2500 ? 'success' : 'error'}">${result.metrics.LCP <= 2500 ? 'PASS' : 'FAIL'}</span></td>
            </tr>
            <tr>
              <td>CLS</td>
              <td>${result.metrics.CLS}</td>
              <td><span class="badge ${result.metrics.CLS <= 0.1 ? 'success' : 'error'}">${result.metrics.CLS <= 0.1 ? 'PASS' : 'FAIL'}</span></td>
            </tr>
            <tr>
              <td>JavaScript Size</td>
              <td>${result.metrics.javascript}kb</td>
              <td><span class="badge ${result.metrics.javascript <= 400 ? 'success' : 'error'}">${result.metrics.javascript <= 400 ? 'PASS' : 'FAIL'}</span></td>
            </tr>
          </table>
          ${result.failures && result.failures.length > 0 ? `
            <div class="failures">
              <strong>⚠️ Threshold Violations:</strong>
              ${result.failures.map(f => `
                <div class="failure-item">
                  ${f.metric}: ${f.value} (threshold: ${f.threshold})
                </div>
              `).join('')}
            </div>
          ` : ''}
        ` : ''}
      </div>
    `).join('')}
  </div>
</body>
</html>
    `;
  }

  /**
   * Main execution
   */
  async run() {
    console.log('🚀 Starting Lighthouse Audit for AI Kids Spark\n');

    try {
      // Load configuration
      await this.loadConfig();

      // Run audits for all URLs
      for (const { url, name } of URLS) {
        const result = await this.runAudit(url, name, 'desktop');
        this.results.push(result);

        if (result.metrics) {
          this.validateMetrics(result);
        }

        // Wait between audits
        await new Promise(resolve => setTimeout(resolve, 2000));
      }

      // Generate reports
      await this.generateReports();

      // Print summary
      console.log('\n' + '='.repeat(60));
      console.log('📊 AUDIT SUMMARY');
      console.log('='.repeat(60));
      console.log(`Total Pages Tested: ${this.results.length}`);
      console.log(`Passed: ${this.results.length - this.failures.length}`);
      console.log(`Failed: ${this.failures.length}`);

      if (this.failures.length > 0) {
        console.log('\n❌ FAILURES:');
        this.failures.forEach(({ page, failures }) => {
          console.log(`\n  ${page}:`);
          failures.forEach(f => {
            console.log(`    - ${f.metric}: ${f.value} (threshold: ${f.threshold}) [${f.severity}]`);
          });
        });
        process.exit(1);
      } else {
        console.log('\n✅ All audits passed!');
        process.exit(0);
      }

    } catch (error) {
      console.error('\n❌ Audit failed:', error.message);
      console.error(error.stack);
      process.exit(1);
    }
  }
}

// Run if called directly
if (require.main === module) {
  const auditor = new LighthouseAuditor();
  auditor.run();
}

module.exports = LighthouseAuditor;
