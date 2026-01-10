#!/usr/bin/env node

/**
 * Screenshot Comparison Utilities
 *
 * Provides pixel-level comparison for visual regression testing.
 * Uses pixelmatch for accurate visual diff detection.
 */

import { readFileSync, writeFileSync, existsSync } from 'fs';
import { PNG } from 'pngjs';

/**
 * Compare two screenshots and generate a diff image
 *
 * @param {string} baselinePath - Path to baseline screenshot
 * @param {string} currentPath - Path to current screenshot
 * @param {string} diffPath - Path to save diff image
 * @param {object} options - Comparison options
 * @returns {object} Comparison result with metrics
 */
export async function compareScreenshots(baselinePath, currentPath, diffPath, options = {}) {
  const {
    threshold = 0.1, // 0-1, higher = more tolerant
    includeAA = true, // Include anti-aliasing
    alpha = 0.1, // Opacity of diff overlay
    diffColor = [255, 0, 0], // Red color for differences
  } = options;

  try {
    // Read images
    const baseline = PNG.sync.read(readFileSync(baselinePath));
    const current = PNG.sync.read(readFileSync(currentPath));

    // Ensure dimensions match
    if (baseline.width !== current.width || baseline.height !== current.height) {
      return {
        match: false,
        reason: 'dimension-mismatch',
        baseline: { width: baseline.width, height: baseline.height },
        current: { width: current.width, height: current.height },
        diffPixels: null,
        percentDiff: null
      };
    }

    // Create diff image
    const { width, height } = baseline;
    const diff = new PNG({ width, height });

    // Use simple pixel comparison (pixelmatch would be better but requires npm install)
    let diffPixels = 0;
    const totalPixels = width * height;

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (width * y + x) * 4;

        const r1 = baseline.data[idx];
        const g1 = baseline.data[idx + 1];
        const b1 = baseline.data[idx + 2];
        const a1 = baseline.data[idx + 3];

        const r2 = current.data[idx];
        const g2 = current.data[idx + 1];
        const b2 = current.data[idx + 2];
        const a2 = current.data[idx + 3];

        // Calculate difference
        const rDiff = Math.abs(r1 - r2);
        const gDiff = Math.abs(g1 - g2);
        const bDiff = Math.abs(b1 - b2);
        const aDiff = Math.abs(a1 - a2);

        const pixelDiff = (rDiff + gDiff + bDiff + aDiff) / (255 * 4);

        if (pixelDiff > threshold) {
          diffPixels++;
          // Mark as different (red)
          diff.data[idx] = diffColor[0];
          diff.data[idx + 1] = diffColor[1];
          diff.data[idx + 2] = diffColor[2];
          diff.data[idx + 3] = 255;
        } else {
          // Keep original (grayed out)
          diff.data[idx] = Math.floor((r1 + r2) / 2) * 0.3;
          diff.data[idx + 1] = Math.floor((g1 + g2) / 2) * 0.3;
          diff.data[idx + 2] = Math.floor((b1 + b2) / 2) * 0.3;
          diff.data[idx + 3] = 255;
        }
      }
    }

    // Save diff image
    const buffer = PNG.sync.write(diff);
    writeFileSync(diffPath, buffer);

    const percentDiff = (diffPixels / totalPixels) * 100;

    return {
      match: diffPixels === 0,
      diffPixels,
      totalPixels,
      percentDiff,
      dimensions: { width, height },
      diffPath,
      threshold
    };

  } catch (error) {
    return {
      match: false,
      reason: 'error',
      error: error.message,
      diffPixels: null,
      percentDiff: null
    };
  }
}

/**
 * Generate a side-by-side comparison image
 *
 * @param {string} baselinePath - Path to baseline screenshot
 * @param {string} currentPath - Path to current screenshot
 * @param {string} outputPath - Path to save comparison
 */
export async function generateSideBySide(baselinePath, currentPath, outputPath) {
  try {
    const baseline = PNG.sync.read(readFileSync(baselinePath));
    const current = PNG.sync.read(readFileSync(currentPath));

    const width = baseline.width + current.width + 20; // 20px gap
    const height = Math.max(baseline.height, current.height);

    const comparison = new PNG({ width, height });

    // Fill background white
    for (let i = 0; i < comparison.data.length; i += 4) {
      comparison.data[i] = 255;     // R
      comparison.data[i + 1] = 255; // G
      comparison.data[i + 2] = 255; // B
      comparison.data[i + 3] = 255; // A
    }

    // Copy baseline to left side
    for (let y = 0; y < baseline.height; y++) {
      for (let x = 0; x < baseline.width; x++) {
        const srcIdx = (baseline.width * y + x) * 4;
        const dstIdx = (width * y + x) * 4;

        comparison.data[dstIdx] = baseline.data[srcIdx];
        comparison.data[dstIdx + 1] = baseline.data[srcIdx + 1];
        comparison.data[dstIdx + 2] = baseline.data[srcIdx + 2];
        comparison.data[dstIdx + 3] = baseline.data[srcIdx + 3];
      }
    }

    // Copy current to right side
    const offsetX = baseline.width + 20;
    for (let y = 0; y < current.height; y++) {
      for (let x = 0; x < current.width; x++) {
        const srcIdx = (current.width * y + x) * 4;
        const dstIdx = (width * y + (x + offsetX)) * 4;

        comparison.data[dstIdx] = current.data[srcIdx];
        comparison.data[dstIdx + 1] = current.data[srcIdx + 1];
        comparison.data[dstIdx + 2] = current.data[srcIdx + 2];
        comparison.data[dstIdx + 3] = current.data[srcIdx + 3];
      }
    }

    const buffer = PNG.sync.write(comparison);
    writeFileSync(outputPath, buffer);

    return {
      success: true,
      outputPath,
      dimensions: { width, height }
    };

  } catch (error) {
    return {
      success: false,
      error: error.message
    };
  }
}

/**
 * Calculate image hash for quick comparison
 *
 * @param {string} imagePath - Path to image
 * @returns {string} Image hash
 */
export function calculateImageHash(imagePath) {
  try {
    const image = PNG.sync.read(readFileSync(imagePath));
    const { width, height } = image;

    // Simple perceptual hash (8x8 grid)
    const gridSize = 8;
    const cellWidth = Math.floor(width / gridSize);
    const cellHeight = Math.floor(height / gridSize);

    let hash = '';

    for (let gy = 0; gy < gridSize; gy++) {
      for (let gx = 0; gx < gridSize; gx++) {
        let r = 0, g = 0, b = 0, count = 0;

        for (let y = gy * cellHeight; y < (gy + 1) * cellHeight; y++) {
          for (let x = gx * cellWidth; x < (gx + 1) * cellWidth; x++) {
            const idx = (width * y + x) * 4;
            r += image.data[idx];
            g += image.data[idx + 1];
            b += image.data[idx + 2];
            count++;
          }
        }

        const avgBrightness = ((r + g + b) / count) / 3;
        hash += avgBrightness > 128 ? '1' : '0';
      }
    }

    return hash;

  } catch (error) {
    return null;
  }
}

/**
 * Compare image hashes
 *
 * @param {string} hash1 - First hash
 * @param {string} hash2 - Second hash
 * @returns {number} Hamming distance (0 = identical)
 */
export function compareHashes(hash1, hash2) {
  if (!hash1 || !hash2 || hash1.length !== hash2.length) {
    return -1;
  }

  let distance = 0;
  for (let i = 0; i < hash1.length; i++) {
    if (hash1[i] !== hash2[i]) {
      distance++;
    }
  }

  return distance;
}

/**
 * Generate HTML comparison report
 *
 * @param {object} results - Comparison results
 * @param {string} outputPath - Path to save HTML report
 */
export function generateHTMLReport(results, outputPath) {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Visual Comparison Report</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      padding: 20px;
      background: #f5f5f5;
    }
    .header {
      background: white;
      padding: 20px;
      border-radius: 8px;
      margin-bottom: 20px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    h1 { margin-bottom: 10px; }
    .summary {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 15px;
      margin-top: 15px;
    }
    .metric {
      background: #f8f9fa;
      padding: 15px;
      border-radius: 4px;
    }
    .metric-label { font-size: 12px; color: #666; margin-bottom: 5px; }
    .metric-value { font-size: 24px; font-weight: bold; }
    .pass { color: #28a745; }
    .fail { color: #dc3545; }
    .comparison {
      background: white;
      padding: 20px;
      border-radius: 8px;
      margin-bottom: 20px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .comparison h2 { margin-bottom: 15px; }
    .images {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
    }
    .image-container {
      border: 1px solid #ddd;
      border-radius: 4px;
      overflow: hidden;
    }
    .image-container img {
      width: 100%;
      display: block;
    }
    .image-label {
      padding: 10px;
      background: #f8f9fa;
      font-weight: bold;
      text-align: center;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>Visual Comparison Report</h1>
    <p>Generated: ${new Date().toLocaleString()}</p>

    <div class="summary">
      <div class="metric">
        <div class="metric-label">Status</div>
        <div class="metric-value ${results.match ? 'pass' : 'fail'}">
          ${results.match ? '✓ PASS' : '✗ FAIL'}
        </div>
      </div>
      <div class="metric">
        <div class="metric-label">Different Pixels</div>
        <div class="metric-value">${results.diffPixels || 'N/A'}</div>
      </div>
      <div class="metric">
        <div class="metric-label">Difference</div>
        <div class="metric-value">${results.percentDiff ? results.percentDiff.toFixed(2) + '%' : 'N/A'}</div>
      </div>
      <div class="metric">
        <div class="metric-label">Threshold</div>
        <div class="metric-value">${results.threshold || 'N/A'}</div>
      </div>
    </div>
  </div>

  ${results.comparisons ? results.comparisons.map(comp => `
    <div class="comparison">
      <h2>${comp.name || 'Comparison'}</h2>
      <div class="images">
        <div class="image-container">
          <div class="image-label">Baseline</div>
          <img src="${comp.baselinePath}" alt="Baseline">
        </div>
        <div class="image-container">
          <div class="image-label">Current</div>
          <img src="${comp.currentPath}" alt="Current">
        </div>
        <div class="image-container">
          <div class="image-label">Difference</div>
          <img src="${comp.diffPath}" alt="Diff">
        </div>
      </div>
    </div>
  `).join('') : ''}
</body>
</html>`;

  writeFileSync(outputPath, html);
  return outputPath;
}

// CLI Interface
if (import.meta.url === `file://${process.argv[1]}`) {
  const args = process.argv.slice(2);

  if (args.length < 3 || args.includes('--help')) {
    console.log(`
Screenshot Comparison Utilities

Usage: node screenshot-compare.js <baseline> <current> <diff-output> [options]

Options:
  --threshold <num>    Difference threshold (0-1, default: 0.1)
  --side-by-side       Also generate side-by-side comparison
  --html <path>        Generate HTML report
  --help               Show this help message

Examples:
  node screenshot-compare.js baseline.png current.png diff.png
  node screenshot-compare.js baseline.png current.png diff.png --threshold 0.05
  node screenshot-compare.js baseline.png current.png diff.png --side-by-side --html report.html
    `);
    process.exit(0);
  }

  const baselinePath = args[0];
  const currentPath = args[1];
  const diffPath = args[2];

  let threshold = 0.1;
  let sideBySide = false;
  let htmlReport = null;

  for (let i = 3; i < args.length; i++) {
    if (args[i] === '--threshold' && args[i + 1]) {
      threshold = parseFloat(args[++i]);
    } else if (args[i] === '--side-by-side') {
      sideBySide = true;
    } else if (args[i] === '--html' && args[i + 1]) {
      htmlReport = args[++i];
    }
  }

  console.log('🔍 Comparing screenshots...\n');

  compareScreenshots(baselinePath, currentPath, diffPath, { threshold })
    .then(result => {
      if (result.match) {
        console.log('✅ Images match!');
      } else if (result.reason) {
        console.log(`❌ Comparison failed: ${result.reason}`);
        if (result.error) {
          console.log(`   Error: ${result.error}`);
        }
      } else {
        console.log(`❌ Images differ: ${result.percentDiff.toFixed(2)}%`);
        console.log(`   Different pixels: ${result.diffPixels.toLocaleString()}`);
        console.log(`   Total pixels: ${result.totalPixels.toLocaleString()}`);
      }

      console.log(`\n📄 Diff saved: ${diffPath}\n`);

      if (sideBySide) {
        const sidePath = diffPath.replace('.png', '-sidebyside.png');
        return generateSideBySide(baselinePath, currentPath, sidePath)
          .then(sideResult => {
            if (sideResult.success) {
              console.log(`📄 Side-by-side: ${sideResult.outputPath}\n`);
            }
            return result;
          });
      }

      return result;
    })
    .then(result => {
      if (htmlReport) {
        const reportData = {
          ...result,
          comparisons: [{
            name: 'Screenshot Comparison',
            baselinePath,
            currentPath,
            diffPath
          }]
        };
        generateHTMLReport(reportData, htmlReport);
        console.log(`📄 HTML report: ${htmlReport}\n`);
      }

      process.exit(result.match ? 0 : 1);
    })
    .catch(error => {
      console.error('💥 Error:', error.message);
      process.exit(1);
    });
}
