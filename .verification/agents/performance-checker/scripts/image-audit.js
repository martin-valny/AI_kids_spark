#!/usr/bin/env node

/**
 * Image Audit Script for AI Kids Spark
 *
 * Analyzes images for:
 * - File sizes and formats
 * - Optimization opportunities
 * - Modern format usage (WebP, AVIF)
 * - Responsive image implementation
 * - Alt text coverage
 */

const fs = require('fs').promises;
const path = require('path');
const glob = require('glob');
const sizeOf = require('image-size');

// Configuration
const CONFIG_PATH = path.join(__dirname, '../agent.config.json');
const THRESHOLDS_PATH = path.join(__dirname, '../benchmarks/thresholds.json');
const REPORTS_DIR = path.join(__dirname, '../../../.verification/reports/performance');
const PUBLIC_DIR = path.join(__dirname, '../../../public');
const SRC_DIR = path.join(__dirname, '../../../src');

// Image extensions to check
const IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'gif', 'svg', 'webp', 'avif'];

class ImageAuditor {
  constructor() {
    this.config = null;
    this.thresholds = null;
    this.images = [];
    this.issues = [];
    this.stats = {
      totalImages: 0,
      totalSize: 0,
      largeImages: 0,
      unoptimized: 0,
      modernFormats: 0,
      missingAlt: 0
    };
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
   * Find all images in the project
   */
  async findImages() {
    console.log('\n🔍 Finding images...');

    const patterns = IMAGE_EXTENSIONS.map(ext => `**/*.${ext}`);
    const images = [];

    for (const dir of [PUBLIC_DIR, SRC_DIR]) {
      try {
        await fs.access(dir);

        for (const pattern of patterns) {
          const files = await this.findFiles(dir, pattern);
          images.push(...files.map(file => ({
            path: file,
            relativePath: path.relative(process.cwd(), file),
            directory: path.relative(process.cwd(), dir)
          })));
        }
      } catch (err) {
        console.log(`  ℹ️  Directory not found: ${dir}`);
      }
    }

    console.log(`  Found ${images.length} images`);
    return images;
  }

  /**
   * Analyze individual image
   */
  async analyzeImage(image) {
    try {
      const stats = await fs.stat(image.path);
      const sizeKB = Math.round(stats.size / 1024);

      // Get dimensions
      let dimensions = { width: 0, height: 0, type: '' };
      try {
        dimensions = sizeOf(image.path);
      } catch (err) {
        // SVG or other format that image-size can't handle
        dimensions.type = path.extname(image.path).slice(1);
      }

      const analysis = {
        ...image,
        size: sizeKB,
        sizeBytes: stats.size,
        width: dimensions.width,
        height: dimensions.height,
        format: dimensions.type || path.extname(image.path).slice(1),
        issues: []
      };

      // Check file size
      if (sizeKB > 500) {
        analysis.issues.push({
          type: 'large-file',
          severity: 'error',
          message: `Image is ${sizeKB}kb (recommended < 500kb)`
        });
        this.stats.largeImages++;
      } else if (sizeKB > 200) {
        analysis.issues.push({
          type: 'large-file',
          severity: 'warning',
          message: `Image is ${sizeKB}kb (recommended < 200kb)`
        });
      }

      // Check format optimization
      const format = analysis.format.toLowerCase();
      if (['jpg', 'jpeg', 'png'].includes(format)) {
        analysis.issues.push({
          type: 'format-optimization',
          severity: 'info',
          message: `Consider converting ${format.toUpperCase()} to WebP for better compression`
        });
        this.stats.unoptimized++;
      } else if (['webp', 'avif'].includes(format)) {
        this.stats.modernFormats++;
      }

      // Check dimensions
      if (dimensions.width > 2000 || dimensions.height > 2000) {
        analysis.issues.push({
          type: 'large-dimensions',
          severity: 'warning',
          message: `Large dimensions (${dimensions.width}x${dimensions.height}). Consider responsive images.`
        });
      }

      // Check for retina images
      if (image.relativePath.includes('@2x') || image.relativePath.includes('@3x')) {
        analysis.retina = true;
      }

      this.stats.totalSize += sizeKB;
      this.stats.totalImages++;

      return analysis;

    } catch (error) {
      console.error(`  ❌ Failed to analyze ${image.relativePath}:`, error.message);
      return null;
    }
  }

  /**
   * Check for alt text usage in source files
   */
  async checkAltText() {
    console.log('\n📝 Checking alt text coverage...');

    try {
      const srcFiles = await this.findFiles(SRC_DIR, '**/*.{jsx,tsx,html}');
      let totalImgTags = 0;
      let withAlt = 0;
      let withoutAlt = 0;
      const missingAlt = [];

      for (const file of srcFiles) {
        const content = await fs.readFile(file, 'utf8');
        const relativePath = path.relative(process.cwd(), file);

        // Find img tags
        const imgRegex = /<img[^>]*>/gi;
        const imgMatches = content.match(imgRegex) || [];

        for (const imgTag of imgMatches) {
          totalImgTags++;

          // Check for alt attribute
          if (/alt\s*=\s*["'][^"']*["']/.test(imgTag) || /alt\s*=\s*{/.test(imgTag)) {
            // Check if alt is not empty
            const altMatch = imgTag.match(/alt\s*=\s*["']([^"']*)["']/);
            if (altMatch && altMatch[1].trim().length > 0) {
              withAlt++;
            } else if (!/alt\s*=\s*{/.test(imgTag)) {
              // Empty alt (which is okay for decorative images)
              withAlt++;
            }
          } else {
            withoutAlt++;
            missingAlt.push({
              file: relativePath,
              tag: imgTag.substring(0, 100) + '...'
            });
          }
        }
      }

      console.log(`  Total <img> tags: ${totalImgTags}`);
      console.log(`  With alt text: ${withAlt}`);
      console.log(`  Without alt text: ${withoutAlt}`);

      if (withoutAlt > 0) {
        console.log(`  ⚠️  ${withoutAlt} images missing alt text`);
        this.issues.push({
          type: 'accessibility',
          severity: 'error',
          message: `${withoutAlt} images missing alt text`,
          details: missingAlt
        });
      } else {
        console.log('  ✅ All images have alt text');
      }

      this.stats.missingAlt = withoutAlt;

      return {
        total: totalImgTags,
        withAlt,
        withoutAlt,
        coverage: totalImgTags > 0 ? Math.round((withAlt / totalImgTags) * 100) : 100,
        missingAlt
      };

    } catch (error) {
      console.error('❌ Alt text check failed:', error.message);
      return null;
    }
  }

  /**
   * Check for lazy loading implementation
   */
  async checkLazyLoading() {
    console.log('\n⚡ Checking lazy loading implementation...');

    try {
      const srcFiles = await this.findFiles(SRC_DIR, '**/*.{jsx,tsx,html}');
      let totalImgTags = 0;
      let withLazyLoading = 0;

      for (const file of srcFiles) {
        const content = await fs.readFile(file, 'utf8');

        const imgRegex = /<img[^>]*>/gi;
        const imgMatches = content.match(imgRegex) || [];

        for (const imgTag of imgMatches) {
          totalImgTags++;

          // Check for loading="lazy" or React lazy loading patterns
          if (
            /loading\s*=\s*["']lazy["']/.test(imgTag) ||
            /loading\s*=\s*{["']lazy["']}/.test(imgTag) ||
            /react-lazy-load/i.test(imgTag)
          ) {
            withLazyLoading++;
          }
        }
      }

      const coverage = totalImgTags > 0 ? Math.round((withLazyLoading / totalImgTags) * 100) : 0;

      console.log(`  Images with lazy loading: ${withLazyLoading}/${totalImgTags} (${coverage}%)`);

      if (coverage < 50 && totalImgTags > 5) {
        console.log('  ℹ️  Consider implementing lazy loading for below-the-fold images');
        this.issues.push({
          type: 'performance',
          severity: 'info',
          message: `Only ${coverage}% of images use lazy loading`
        });
      } else {
        console.log('  ✅ Good lazy loading coverage');
      }

      return {
        total: totalImgTags,
        withLazyLoading,
        coverage
      };

    } catch (error) {
      console.error('❌ Lazy loading check failed:', error.message);
      return null;
    }
  }

  /**
   * Generate optimization recommendations
   */
  generateRecommendations() {
    console.log('\n💡 Optimization Recommendations:');

    const recommendations = [];

    // Large files
    if (this.stats.largeImages > 0) {
      recommendations.push({
        priority: 'high',
        category: 'compression',
        message: `${this.stats.largeImages} images are larger than 500kb`,
        action: 'Compress images using tools like TinyPNG, Squoosh, or imagemin'
      });
    }

    // Modern formats
    const modernFormatPercent = this.stats.totalImages > 0
      ? Math.round((this.stats.modernFormats / this.stats.totalImages) * 100)
      : 0;

    if (modernFormatPercent < 50 && this.stats.totalImages > 5) {
      recommendations.push({
        priority: 'medium',
        category: 'format',
        message: `Only ${modernFormatPercent}% of images use modern formats (WebP/AVIF)`,
        action: 'Convert JPEG/PNG images to WebP format for 25-35% size reduction'
      });
    }

    // Alt text
    if (this.stats.missingAlt > 0) {
      recommendations.push({
        priority: 'high',
        category: 'accessibility',
        message: `${this.stats.missingAlt} images missing alt text`,
        action: 'Add descriptive alt text to all images for accessibility'
      });
    }

    // Total size
    const avgSizePerImage = this.stats.totalImages > 0
      ? Math.round(this.stats.totalSize / this.stats.totalImages)
      : 0;

    if (avgSizePerImage > 100) {
      recommendations.push({
        priority: 'medium',
        category: 'optimization',
        message: `Average image size is ${avgSizePerImage}kb`,
        action: 'Aim for average < 100kb through compression and format optimization'
      });
    }

    recommendations.forEach((rec, i) => {
      console.log(`\n  ${i + 1}. [${rec.priority.toUpperCase()}] ${rec.category}`);
      console.log(`     ${rec.message}`);
      console.log(`     → ${rec.action}`);
    });

    if (recommendations.length === 0) {
      console.log('  ✅ No major optimization opportunities found!');
    }

    return recommendations;
  }

  /**
   * Generate detailed report
   */
  async generateReport() {
    console.log('\n📊 Generating image audit report...');

    try {
      await fs.mkdir(REPORTS_DIR, { recursive: true });

      const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
      const reportPath = path.join(REPORTS_DIR, `image-audit-${timestamp}.json`);
      const htmlPath = path.join(REPORTS_DIR, `image-audit-${timestamp}.html`);

      const report = {
        timestamp: new Date().toISOString(),
        stats: this.stats,
        images: this.images,
        issues: this.issues,
        recommendations: this.generateRecommendations(),
        passed: this.issues.filter(i => i.severity === 'error').length === 0
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
    const largeImages = report.images.filter(img =>
      img.issues.some(i => i.type === 'large-file' && i.severity === 'error')
    );

    return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Image Audit Report - AI Kids Spark</title>
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif; margin: 0; padding: 40px; background: #f5f5f5; }
    .container { max-width: 1200px; margin: 0 auto; background: white; padding: 40px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
    h1 { color: #333; border-bottom: 3px solid #FF9800; padding-bottom: 10px; }
    .summary { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 20px; margin: 30px 0; }
    .stat-card { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 20px; border-radius: 8px; text-align: center; }
    .stat-card .value { font-size: 36px; font-weight: bold; margin: 10px 0; }
    .stat-card .label { font-size: 14px; opacity: 0.9; }
    .section { margin: 30px 0; }
    .issue-card { border-left: 4px solid #ffc107; background: #fff3cd; padding: 20px; margin: 15px 0; border-radius: 4px; }
    .issue-card.error { border-left-color: #f44336; background: #ffebee; }
    .recommendation { background: #e3f2fd; border-left: 4px solid #2196F3; padding: 15px; margin: 10px 0; border-radius: 4px; }
    .recommendation .priority { display: inline-block; padding: 4px 8px; border-radius: 4px; font-size: 11px; font-weight: bold; margin-bottom: 8px; }
    .priority.high { background: #f44336; color: white; }
    .priority.medium { background: #ff9800; color: white; }
    .priority.low { background: #4CAF50; color: white; }
    table { width: 100%; border-collapse: collapse; margin: 20px 0; }
    th, td { padding: 12px; text-align: left; border-bottom: 1px solid #ddd; }
    th { background: #f8f9fa; font-weight: 600; }
    .badge { padding: 4px 8px; border-radius: 4px; font-size: 12px; font-weight: bold; }
    .badge.success { background: #d4edda; color: #155724; }
    .badge.error { background: #f8d7da; color: #721c24; }
    .badge.warning { background: #fff3cd; color: #856404; }
    .image-preview { max-width: 100px; max-height: 100px; object-fit: cover; border-radius: 4px; }
  </style>
</head>
<body>
  <div class="container">
    <h1>🖼️ Image Audit Report</h1>
    <p><strong>Project:</strong> AI Kids Spark</p>
    <p><strong>Generated:</strong> ${report.timestamp}</p>
    <p><strong>Status:</strong> <span class="badge ${report.passed ? 'success' : 'error'}">${report.passed ? 'PASSED' : 'NEEDS ATTENTION'}</span></p>

    <div class="summary">
      <div class="stat-card">
        <div class="value">${report.stats.totalImages}</div>
        <div class="label">Total Images</div>
      </div>
      <div class="stat-card">
        <div class="value">${report.stats.totalSize}kb</div>
        <div class="label">Total Size</div>
      </div>
      <div class="stat-card">
        <div class="value">${report.stats.largeImages}</div>
        <div class="label">Large Images (&gt;500kb)</div>
      </div>
      <div class="stat-card">
        <div class="value">${report.stats.modernFormats}</div>
        <div class="label">Modern Formats</div>
      </div>
      <div class="stat-card">
        <div class="value">${report.stats.missingAlt}</div>
        <div class="label">Missing Alt Text</div>
      </div>
    </div>

    ${report.recommendations.length > 0 ? `
      <div class="section">
        <h2>💡 Recommendations</h2>
        ${report.recommendations.map(rec => `
          <div class="recommendation">
            <span class="priority ${rec.priority}">${rec.priority.toUpperCase()}</span>
            <div><strong>${rec.category}:</strong> ${rec.message}</div>
            <div style="margin-top: 8px; color: #666;">→ ${rec.action}</div>
          </div>
        `).join('')}
      </div>
    ` : ''}

    ${report.issues.length > 0 ? `
      <div class="section">
        <h2>⚠️ Issues Found</h2>
        ${report.issues.map(issue => `
          <div class="issue-card ${issue.severity}">
            <div><strong>${issue.type}:</strong> ${issue.message}</div>
            <span class="badge ${issue.severity}">${issue.severity.toUpperCase()}</span>
          </div>
        `).join('')}
      </div>
    ` : ''}

    ${largeImages.length > 0 ? `
      <div class="section">
        <h2>🔍 Large Images Requiring Attention</h2>
        <table>
          <thead>
            <tr>
              <th>File</th>
              <th>Size</th>
              <th>Dimensions</th>
              <th>Format</th>
              <th>Issues</th>
            </tr>
          </thead>
          <tbody>
            ${largeImages.map(img => `
              <tr>
                <td>${img.relativePath}</td>
                <td>${img.size}kb</td>
                <td>${img.width}x${img.height}</td>
                <td>${img.format.toUpperCase()}</td>
                <td>${img.issues.length}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    ` : ''}

    <div class="section">
      <h2>📋 All Images</h2>
      <table>
        <thead>
          <tr>
            <th>File</th>
            <th>Size</th>
            <th>Format</th>
            <th>Dimensions</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          ${report.images.slice(0, 50).map(img => `
            <tr>
              <td>${img.relativePath}</td>
              <td>${img.size}kb</td>
              <td>${img.format.toUpperCase()}</td>
              <td>${img.width}x${img.height}</td>
              <td>
                ${img.issues.length === 0
                  ? '<span class="badge success">OK</span>'
                  : `<span class="badge ${img.issues[0].severity}">${img.issues.length} issue${img.issues.length > 1 ? 's' : ''}</span>`
                }
              </td>
            </tr>
          `).join('')}
          ${report.images.length > 50 ? `
            <tr>
              <td colspan="5" style="text-align: center; color: #666;">
                ... and ${report.images.length - 50} more images
              </td>
            </tr>
          ` : ''}
        </tbody>
      </table>
    </div>
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
      glob(pattern, { cwd: dir, absolute: true, nodir: true }, (err, files) => {
        if (err) reject(err);
        else resolve(files);
      });
    });
  }

  /**
   * Main execution
   */
  async run() {
    console.log('🖼️  Image Audit for AI Kids Spark\n');

    try {
      await this.loadConfig();

      // Find and analyze all images
      const imageFiles = await this.findImages();

      console.log('\n📸 Analyzing images...');
      for (const imageFile of imageFiles) {
        const analysis = await this.analyzeImage(imageFile);
        if (analysis) {
          this.images.push(analysis);

          // Collect issues
          if (analysis.issues.length > 0) {
            analysis.issues.forEach(issue => {
              if (issue.severity === 'error') {
                this.issues.push({
                  file: analysis.relativePath,
                  ...issue
                });
              }
            });
          }
        }
      }

      // Run additional checks
      await this.checkAltText();
      await this.checkLazyLoading();

      // Generate recommendations
      this.generateRecommendations();

      // Generate report
      const report = await this.generateReport();

      // Print summary
      console.log('\n' + '='.repeat(60));
      console.log('📊 IMAGE AUDIT SUMMARY');
      console.log('='.repeat(60));
      console.log(`Total Images: ${this.stats.totalImages}`);
      console.log(`Total Size: ${this.stats.totalSize}kb`);
      console.log(`Average Size: ${this.stats.totalImages > 0 ? Math.round(this.stats.totalSize / this.stats.totalImages) : 0}kb`);
      console.log(`Large Images (>500kb): ${this.stats.largeImages}`);
      console.log(`Modern Formats: ${this.stats.modernFormats}/${this.stats.totalImages}`);
      console.log(`Missing Alt Text: ${this.stats.missingAlt}`);
      console.log(`Critical Issues: ${this.issues.filter(i => i.severity === 'error').length}`);

      const hasErrors = this.issues.some(i => i.severity === 'error');
      if (hasErrors) {
        console.log('\n⚠️  Image audit completed with issues that need attention');
        process.exit(1);
      } else {
        console.log('\n✅ Image audit passed - all images meet quality standards!');
        process.exit(0);
      }

    } catch (error) {
      console.error('\n❌ Image audit failed:', error.message);
      console.error(error.stack);
      process.exit(1);
    }
  }
}

// Run if called directly
if (require.main === module) {
  const auditor = new ImageAuditor();
  auditor.run();
}

module.exports = ImageAuditor;
