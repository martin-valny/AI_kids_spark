#!/usr/bin/env node

/**
 * Bundle Analysis Script for AI Kids Spark
 *
 * Analyzes JavaScript and CSS bundle sizes using rollup-plugin-visualizer
 * and other bundle analysis tools. Validates against size budgets.
 */

const fs = require('fs').promises;
const path = require('path');
const { promisify } = require('util');
const exec = promisify(require('child_process').exec);
const glob = require('glob');

// Configuration
const CONFIG_PATH = path.join(__dirname, '../agent.config.json');
const THRESHOLDS_PATH = path.join(__dirname, '../benchmarks/thresholds.json');
const REPORTS_DIR = path.join(__dirname, '../../../.verification/reports/performance');
const DIST_DIR = path.join(__dirname, '../../../dist');

class BundleAnalyzer {
  constructor() {
    this.config = null;
    this.thresholds = null;
    this.bundles = [];
    this.violations = [];
  }

  /**
   * Load configuration
   */
  async loadConfig() {
    try {
      const configData = await fs.readFile(CONFIG_PATH, 'utf8');
      this.config = JSON.parse(configData);

      const thresholdsData = await fs.readFile(THRESHOLDS_PATH, 'utf8');
      this.thresholds = JSON.parse(thresholdsData);

      console.log('✅ Configuration loaded');
    } catch (error) {
      console.error('❌ Failed to load configuration:', error.message);
      throw error;
    }
  }

  /**
   * Check if dist directory exists
   */
  async checkDistDirectory() {
    try {
      await fs.access(DIST_DIR);
      return true;
    } catch {
      console.error('❌ Dist directory not found. Run `npm run build` first.');
      return false;
    }
  }

  /**
   * Analyze JavaScript bundles
   */
  async analyzeJavaScript() {
    console.log('\n📦 Analyzing JavaScript bundles...');

    try {
      const jsFiles = await this.findFiles(DIST_DIR, '**/*.js');
      let totalSize = 0;
      const jsAnalysis = [];

      for (const file of jsFiles) {
        const stats = await fs.stat(file);
        const sizeKB = Math.round(stats.size / 1024);
        const relativePath = path.relative(DIST_DIR, file);

        totalSize += sizeKB;

        jsAnalysis.push({
          file: relativePath,
          size: sizeKB,
          sizeBytes: stats.size,
          type: this.categorizeJSFile(relativePath)
        });

        console.log(`  ${relativePath}: ${sizeKB}kb`);
      }

      // Sort by size
      jsAnalysis.sort((a, b) => b.size - a.size);

      console.log(`\n  Total JavaScript: ${totalSize}kb`);

      // Check against budget
      const budget = this.thresholds.resourceBudgets.javascript.error;
      if (totalSize > budget) {
        this.violations.push({
          type: 'JavaScript Budget',
          actual: totalSize,
          budget: budget,
          excess: totalSize - budget,
          severity: 'error'
        });
        console.log(`  ⚠️  Exceeds budget by ${totalSize - budget}kb`);
      } else {
        console.log(`  ✅ Within budget (${budget}kb)`);
      }

      return {
        totalSize,
        files: jsAnalysis,
        budget: budget,
        withinBudget: totalSize <= budget
      };

    } catch (error) {
      console.error('❌ JavaScript analysis failed:', error.message);
      return null;
    }
  }

  /**
   * Analyze CSS bundles
   */
  async analyzeCSS() {
    console.log('\n🎨 Analyzing CSS bundles...');

    try {
      const cssFiles = await this.findFiles(DIST_DIR, '**/*.css');
      let totalSize = 0;
      const cssAnalysis = [];

      for (const file of cssFiles) {
        const stats = await fs.stat(file);
        const sizeKB = Math.round(stats.size / 1024);
        const relativePath = path.relative(DIST_DIR, file);

        totalSize += sizeKB;

        cssAnalysis.push({
          file: relativePath,
          size: sizeKB,
          sizeBytes: stats.size
        });

        console.log(`  ${relativePath}: ${sizeKB}kb`);
      }

      cssAnalysis.sort((a, b) => b.size - a.size);

      console.log(`\n  Total CSS: ${totalSize}kb`);

      // Check against budget
      const budget = this.thresholds.resourceBudgets.css.error;
      if (totalSize > budget) {
        this.violations.push({
          type: 'CSS Budget',
          actual: totalSize,
          budget: budget,
          excess: totalSize - budget,
          severity: 'error'
        });
        console.log(`  ⚠️  Exceeds budget by ${totalSize - budget}kb`);
      } else {
        console.log(`  ✅ Within budget (${budget}kb)`);
      }

      return {
        totalSize,
        files: cssAnalysis,
        budget: budget,
        withinBudget: totalSize <= budget
      };

    } catch (error) {
      console.error('❌ CSS analysis failed:', error.message);
      return null;
    }
  }

  /**
   * Analyze fonts
   */
  async analyzeFonts() {
    console.log('\n🔤 Analyzing fonts...');

    try {
      const fontFiles = await this.findFiles(DIST_DIR, '**/*.{woff,woff2,ttf,otf,eot}');
      let totalSize = 0;
      const fontAnalysis = [];

      for (const file of fontFiles) {
        const stats = await fs.stat(file);
        const sizeKB = Math.round(stats.size / 1024);
        const relativePath = path.relative(DIST_DIR, file);

        totalSize += sizeKB;

        fontAnalysis.push({
          file: relativePath,
          size: sizeKB,
          format: path.extname(file).slice(1)
        });

        console.log(`  ${relativePath}: ${sizeKB}kb`);
      }

      console.log(`\n  Total Fonts: ${totalSize}kb`);

      const budget = this.thresholds.resourceBudgets.fonts.error;
      if (totalSize > budget) {
        this.violations.push({
          type: 'Fonts Budget',
          actual: totalSize,
          budget: budget,
          excess: totalSize - budget,
          severity: 'warning'
        });
        console.log(`  ⚠️  Exceeds budget by ${totalSize - budget}kb`);
      } else {
        console.log(`  ✅ Within budget (${budget}kb)`);
      }

      return {
        totalSize,
        files: fontAnalysis,
        budget: budget,
        withinBudget: totalSize <= budget
      };

    } catch (error) {
      console.error('❌ Font analysis failed:', error.message);
      return null;
    }
  }

  /**
   * Analyze duplicate dependencies
   */
  async analyzeDuplicates() {
    console.log('\n🔍 Checking for duplicate dependencies...');

    try {
      // This would typically use webpack-bundle-analyzer or similar
      // For now, we'll do a simple check based on file names
      const jsFiles = await this.findFiles(DIST_DIR, '**/*.js');
      const duplicates = [];

      // Check for common duplicate patterns
      const patterns = {
        'react': 'React library',
        'lodash': 'Lodash utility',
        'moment': 'Moment.js date library',
        'axios': 'HTTP client'
      };

      for (const [pattern, description] of Object.entries(patterns)) {
        const matches = jsFiles.filter(f => f.toLowerCase().includes(pattern));
        if (matches.length > 1) {
          duplicates.push({
            library: description,
            occurrences: matches.length,
            files: matches.map(f => path.relative(DIST_DIR, f))
          });
        }
      }

      if (duplicates.length > 0) {
        console.log('  ⚠️  Potential duplicates found:');
        duplicates.forEach(dup => {
          console.log(`    - ${dup.library}: ${dup.occurrences} occurrences`);
        });
        this.violations.push({
          type: 'Duplicate Dependencies',
          duplicates: duplicates,
          severity: 'warning'
        });
      } else {
        console.log('  ✅ No obvious duplicates detected');
      }

      return duplicates;

    } catch (error) {
      console.error('❌ Duplicate analysis failed:', error.message);
      return [];
    }
  }

  /**
   * Analyze code splitting
   */
  async analyzeCodeSplitting() {
    console.log('\n✂️  Analyzing code splitting...');

    try {
      const jsFiles = await this.findFiles(DIST_DIR, '**/*.js');

      const chunks = {
        main: [],
        vendor: [],
        async: [],
        other: []
      };

      jsFiles.forEach(file => {
        const name = path.basename(file);
        if (name.includes('vendor')) {
          chunks.vendor.push(file);
        } else if (name.includes('async') || name.includes('chunk')) {
          chunks.async.push(file);
        } else if (name.includes('index') || name.includes('main')) {
          chunks.main.push(file);
        } else {
          chunks.other.push(file);
        }
      });

      console.log(`  Main bundles: ${chunks.main.length}`);
      console.log(`  Vendor bundles: ${chunks.vendor.length}`);
      console.log(`  Async chunks: ${chunks.async.length}`);
      console.log(`  Other: ${chunks.other.length}`);

      if (chunks.async.length === 0 && jsFiles.length > 2) {
        console.log('  ⚠️  No async chunks detected - consider code splitting');
        this.violations.push({
          type: 'Code Splitting',
          message: 'No async chunks detected',
          severity: 'info'
        });
      } else {
        console.log('  ✅ Code splitting appears to be implemented');
      }

      return chunks;

    } catch (error) {
      console.error('❌ Code splitting analysis failed:', error.message);
      return null;
    }
  }

  /**
   * Generate tree map visualization
   */
  async generateTreeMap() {
    console.log('\n🌳 Generating bundle tree map...');

    try {
      // Check if stats.json exists (from rollup-plugin-visualizer)
      const statsPath = path.join(DIST_DIR, 'stats.html');

      try {
        await fs.access(statsPath);
        console.log('  ✅ Bundle visualization found at dist/stats.html');

        // Copy to reports directory
        const reportPath = path.join(REPORTS_DIR, 'bundle-treemap.html');
        await fs.mkdir(REPORTS_DIR, { recursive: true });
        await fs.copyFile(statsPath, reportPath);
        console.log(`  📊 Copied to: ${reportPath}`);

        return reportPath;
      } catch {
        console.log('  ℹ️  No stats.html found. Add rollup-plugin-visualizer to build.');
        console.log('  Add to vite.config.js:');
        console.log('    import { visualizer } from "rollup-plugin-visualizer";');
        console.log('    plugins: [visualizer({ open: false, gzipSize: true })]');
        return null;
      }

    } catch (error) {
      console.error('❌ Tree map generation failed:', error.message);
      return null;
    }
  }

  /**
   * Generate detailed report
   */
  async generateReport() {
    console.log('\n📊 Generating bundle analysis report...');

    try {
      await fs.mkdir(REPORTS_DIR, { recursive: true });

      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const reportPath = path.join(REPORTS_DIR, `bundle-analysis-${timestamp}.json`);
      const htmlPath = path.join(REPORTS_DIR, `bundle-analysis-${timestamp}.html`);

      const report = {
        timestamp: new Date().toISOString(),
        summary: {
          javascript: this.bundles.javascript,
          css: this.bundles.css,
          fonts: this.bundles.fonts,
          totalSize: (this.bundles.javascript?.totalSize || 0) +
                     (this.bundles.css?.totalSize || 0) +
                     (this.bundles.fonts?.totalSize || 0)
        },
        violations: this.violations,
        passed: this.violations.filter(v => v.severity === 'error').length === 0
      };

      // Save JSON report
      await fs.writeFile(reportPath, JSON.stringify(report, null, 2));
      console.log(`  ✅ JSON report: ${reportPath}`);

      // Generate HTML report
      const html = this.generateHTMLReport(report);
      await fs.writeFile(htmlPath, html);
      console.log(`  ✅ HTML report: ${htmlPath}`);

      return report;

    } catch (error) {
      console.error('❌ Report generation failed:', error.message);
      return null;
    }
  }

  /**
   * Generate HTML report
   */
  generateHTMLReport(report) {
    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bundle Analysis Report - AI Kids Spark</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; margin: 0; padding: 40px; background: #f5f5f5; }
    .container { max-width: 1200px; margin: 0 auto; background: white; padding: 40px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
    h1 { color: #333; border-bottom: 3px solid #2196F3; padding-bottom: 10px; }
    .summary { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin: 30px 0; }
    .card { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 25px; border-radius: 8px; }
    .card h3 { margin: 0 0 10px 0; font-size: 14px; opacity: 0.9; }
    .card .value { font-size: 36px; font-weight: bold; margin: 10px 0; }
    .card .budget { font-size: 14px; opacity: 0.9; }
    .section { margin: 30px 0; }
    .file-list { background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 10px 0; }
    .file-item { padding: 10px; border-bottom: 1px solid #dee2e6; display: flex; justify-content: space-between; }
    .file-item:last-child { border-bottom: none; }
    .violations { background: #fff3cd; border-left: 4px solid #ffc107; padding: 20px; border-radius: 4px; margin: 20px 0; }
    .violation-item { margin: 10px 0; padding: 10px; background: white; border-radius: 4px; }
    .badge { padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: bold; }
    .badge.success { background: #d4edda; color: #155724; }
    .badge.error { background: #f8d7da; color: #721c24; }
    .badge.warning { background: #fff3cd; color: #856404; }
    table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
    th { background: #f8f9fa; font-weight: 600; }
    .progress-bar { background: #e9ecef; border-radius: 4px; height: 20px; margin: 10px 0; overflow: hidden; }
    .progress-fill { background: linear-gradient(90deg, #4CAF50 0%, #45a049 100%); height: 100%; transition: width 0.3s; }
    .progress-fill.over { background: linear-gradient(90deg, #f44336 0%, #da190b 100%); }
  </style>
</head>
<body>
  <div class="container">
    <h1>📦 Bundle Analysis Report</h1>
    <p><strong>Project:</strong> AI Kids Spark</p>
    <p><strong>Generated:</strong> ${report.timestamp}</p>
    <p><strong>Status:</strong> <span class="badge ${report.passed ? 'success' : 'error'}">${report.passed ? 'PASSED' : 'FAILED'}</span></p>

    <div class="summary">
      ${report.summary.javascript ? `
        <div class="card">
          <h3>JavaScript</h3>
          <div class="value">${report.summary.javascript.totalSize}kb</div>
          <div class="budget">Budget: ${report.summary.javascript.budget}kb</div>
          <div class="progress-bar">
            <div class="progress-fill ${report.summary.javascript.totalSize > report.summary.javascript.budget ? 'over' : ''}"
                 style="width: ${Math.min(100, (report.summary.javascript.totalSize / report.summary.javascript.budget) * 100)}%"></div>
          </div>
        </div>
      ` : ''}

      ${report.summary.css ? `
        <div class="card">
          <h3>CSS</h3>
          <div class="value">${report.summary.css.totalSize}kb</div>
          <div class="budget">Budget: ${report.summary.css.budget}kb</div>
          <div class="progress-bar">
            <div class="progress-fill ${report.summary.css.totalSize > report.summary.css.budget ? 'over' : ''}"
                 style="width: ${Math.min(100, (report.summary.css.totalSize / report.summary.css.budget) * 100)}%"></div>
          </div>
        </div>
      ` : ''}

      <div class="card">
        <h3>Total Size</h3>
        <div class="value">${report.summary.totalSize}kb</div>
        <div class="budget">All Resources</div>
      </div>
    </div>

    ${report.violations.length > 0 ? `
      <div class="violations">
        <h2>⚠️ Budget Violations</h2>
        ${report.violations.map(v => `
          <div class="violation-item">
            <strong>${v.type}</strong>
            <span class="badge ${v.severity}">${v.severity.toUpperCase()}</span>
            ${v.actual && v.budget ? `
              <p>Actual: ${v.actual}kb | Budget: ${v.budget}kb | Over by: ${v.excess}kb</p>
            ` : ''}
            ${v.message ? `<p>${v.message}</p>` : ''}
          </div>
        `).join('')}
      </div>
    ` : '<div class="badge success" style="display: inline-block; margin: 20px 0;">✅ All budgets within limits</div>'}

    ${report.summary.javascript ? `
      <div class="section">
        <h2>JavaScript Files</h2>
        <div class="file-list">
          ${report.summary.javascript.files.map(f => `
            <div class="file-item">
              <span>${f.file}</span>
              <strong>${f.size}kb</strong>
            </div>
          `).join('')}
        </div>
      </div>
    ` : ''}

    ${report.summary.css ? `
      <div class="section">
        <h2>CSS Files</h2>
        <div class="file-list">
          ${report.summary.css.files.map(f => `
            <div class="file-item">
              <span>${f.file}</span>
              <strong>${f.size}kb</strong>
            </div>
          `).join('')}
        </div>
      </div>
    ` : ''}
  </div>
</body>
</html>
    `;
  }

  /**
   * Helper: Find files matching pattern
   */
  async findFiles(dir, pattern) {
    return new Promise((resolve, reject) => {
      glob(pattern, { cwd: dir, absolute: true }, (err, files) => {
        if (err) reject(err);
        else resolve(files);
      });
    });
  }

  /**
   * Helper: Categorize JS file
   */
  categorizeJSFile(filename) {
    if (filename.includes('vendor')) return 'vendor';
    if (filename.includes('chunk')) return 'async';
    if (filename.includes('index') || filename.includes('main')) return 'main';
    return 'other';
  }

  /**
   * Main execution
   */
  async run() {
    console.log('📦 Bundle Analysis for AI Kids Spark\n');

    try {
      await this.loadConfig();

      const hasDistwe = await this.checkDistDirectory();
      if (!hasDist) {
        console.log('\n💡 Tip: Run `npm run build` to generate dist files first.');
        process.exit(1);
      }

      // Run all analyses
      this.bundles.javascript = await this.analyzeJavaScript();
      this.bundles.css = await this.analyzeCSS();
      this.bundles.fonts = await this.analyzeFonts();

      await this.analyzeDuplicates();
      await this.analyzeCodeSplitting();
      await this.generateTreeMap();

      // Generate report
      const report = await this.generateReport();

      // Print summary
      console.log('\n' + '='.repeat(60));
      console.log('📊 BUNDLE ANALYSIS SUMMARY');
      console.log('='.repeat(60));
      console.log(`JavaScript: ${this.bundles.javascript?.totalSize || 0}kb / ${this.thresholds.resourceBudgets.javascript.error}kb`);
      console.log(`CSS: ${this.bundles.css?.totalSize || 0}kb / ${this.thresholds.resourceBudgets.css.error}kb`);
      console.log(`Fonts: ${this.bundles.fonts?.totalSize || 0}kb / ${this.thresholds.resourceBudgets.fonts.error}kb`);
      console.log(`Total: ${report.summary.totalSize}kb`);
      console.log(`Violations: ${this.violations.length}`);

      const hasErrors = this.violations.some(v => v.severity === 'error');
      if (hasErrors) {
        console.log('\n❌ Bundle analysis failed due to budget violations');
        process.exit(1);
      } else {
        console.log('\n✅ All bundle budgets within limits');
        process.exit(0);
      }

    } catch (error) {
      console.error('\n❌ Bundle analysis failed:', error.message);
      console.error(error.stack);
      process.exit(1);
    }
  }
}

// Run if called directly
if (require.main === module) {
  const analyzer = new BundleAnalyzer();
  analyzer.run();
}

module.exports = BundleAnalyzer;
