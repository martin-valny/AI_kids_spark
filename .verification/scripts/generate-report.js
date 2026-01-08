#!/usr/bin/env node

/**
 * Generate Aggregated HTML Report
 * Reads results from all agents and generates a comprehensive HTML report
 * Outputs to: .verification/reports/latest/index.html
 */

import { existsSync, readFileSync, writeFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT_DIR = join(__dirname, '../..');
const REPORTS_DIR = join(ROOT_DIR, '.verification/reports');
const LATEST_DIR = join(REPORTS_DIR, 'latest');

// Helper to safely read JSON file
function readJSONFile(filePath) {
  try {
    if (existsSync(filePath)) {
      const content = readFileSync(filePath, 'utf-8');
      return JSON.parse(content);
    }
  } catch (error) {
    console.warn(`Warning: Could not read ${filePath}: ${error.message}`);
  }
  return null;
}

// Collect all agent results
function collectAgentResults() {
  const results = {
    summary: null,
    uiTester: null,
    codeReviewer: null,
    performanceChecker: null,
  };

  // Read verification summary
  const summaryPath = join(LATEST_DIR, 'verification-summary.json');
  results.summary = readJSONFile(summaryPath);

  // Read UI Tester results
  const uiTesterPaths = [
    join(REPORTS_DIR, 'ui-tester/latest-results.json'),
    join(LATEST_DIR, 'ui-tester-results.json'),
  ];
  for (const path of uiTesterPaths) {
    const data = readJSONFile(path);
    if (data) {
      results.uiTester = data;
      break;
    }
  }

  // Read Code Reviewer results
  const codeReviewerPaths = [
    join(REPORTS_DIR, 'code-reviewer/latest-results.json'),
    join(LATEST_DIR, 'code-review-results.json'),
  ];
  for (const path of codeReviewerPaths) {
    const data = readJSONFile(path);
    if (data) {
      results.codeReviewer = data;
      break;
    }
  }

  // Read Performance Checker results
  const performancePaths = [
    join(REPORTS_DIR, 'performance/latest-results.json'),
    join(LATEST_DIR, 'performance-results.json'),
  ];
  for (const path of performancePaths) {
    const data = readJSONFile(path);
    if (data) {
      results.performanceChecker = data;
      break;
    }
  }

  return results;
}

// Generate HTML report
function generateHTML(results) {
  const { summary, uiTester, codeReviewer, performanceChecker } = results;

  const timestamp = summary?.timestamp || new Date().toISOString();
  const duration = summary?.duration || 0;
  const overallPassed = summary?.criticalFailure === false;
  const statusClass = overallPassed ? 'success' : 'failure';
  const statusText = overallPassed ? 'PASSED' : 'FAILED';

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Verification Report - AI Kids Spark</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      line-height: 1.6;
      color: #333;
      background: #f5f5f5;
      padding: 20px;
    }

    .container {
      max-width: 1200px;
      margin: 0 auto;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      overflow: hidden;
    }

    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 40px;
      text-align: center;
    }

    .header h1 {
      font-size: 2.5em;
      margin-bottom: 10px;
    }

    .header .timestamp {
      opacity: 0.9;
      font-size: 0.9em;
    }

    .status-banner {
      padding: 30px;
      text-align: center;
      font-size: 1.5em;
      font-weight: bold;
    }

    .status-banner.success {
      background: #10b981;
      color: white;
    }

    .status-banner.failure {
      background: #ef4444;
      color: white;
    }

    .summary {
      padding: 30px;
      background: #f9fafb;
      border-bottom: 1px solid #e5e7eb;
    }

    .summary h2 {
      margin-bottom: 20px;
      color: #1f2937;
    }

    .metrics {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 20px;
      margin-top: 20px;
    }

    .metric {
      background: white;
      padding: 20px;
      border-radius: 8px;
      border: 1px solid #e5e7eb;
      text-align: center;
    }

    .metric-value {
      font-size: 2em;
      font-weight: bold;
      margin-bottom: 5px;
    }

    .metric-label {
      color: #6b7280;
      font-size: 0.9em;
    }

    .metric.success .metric-value { color: #10b981; }
    .metric.failure .metric-value { color: #ef4444; }
    .metric.warning .metric-value { color: #f59e0b; }
    .metric.info .metric-value { color: #3b82f6; }

    .agents {
      padding: 30px;
    }

    .agent {
      margin-bottom: 30px;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      overflow: hidden;
    }

    .agent-header {
      padding: 20px;
      background: #f9fafb;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: pointer;
      user-select: none;
    }

    .agent-header:hover {
      background: #f3f4f6;
    }

    .agent-title {
      display: flex;
      align-items: center;
      gap: 10px;
      font-size: 1.2em;
      font-weight: 600;
    }

    .agent-status {
      padding: 5px 15px;
      border-radius: 20px;
      font-size: 0.9em;
      font-weight: 600;
    }

    .agent-status.passed {
      background: #d1fae5;
      color: #065f46;
    }

    .agent-status.failed {
      background: #fee2e2;
      color: #991b1b;
    }

    .agent-status.skipped {
      background: #e5e7eb;
      color: #4b5563;
    }

    .agent-body {
      padding: 20px;
      background: white;
      border-top: 1px solid #e5e7eb;
      display: none;
    }

    .agent-body.expanded {
      display: block;
    }

    .agent-detail {
      margin-bottom: 15px;
    }

    .agent-detail strong {
      color: #374151;
      display: inline-block;
      min-width: 120px;
    }

    .next-steps {
      padding: 30px;
      background: #fffbeb;
      border-top: 1px solid #fde68a;
    }

    .next-steps h2 {
      margin-bottom: 15px;
      color: #92400e;
    }

    .next-steps ul {
      list-style-position: inside;
      color: #78350f;
    }

    .next-steps li {
      margin-bottom: 8px;
    }

    .footer {
      padding: 20px;
      text-align: center;
      background: #f9fafb;
      color: #6b7280;
      font-size: 0.9em;
    }

    .icon {
      display: inline-block;
      width: 24px;
      height: 24px;
    }

    @media print {
      body {
        background: white;
        padding: 0;
      }
      .agent-body {
        display: block !important;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🚀 Verification Report</h1>
      <p>AI Kids Spark - Quality Assurance</p>
      <p class="timestamp">${new Date(timestamp).toLocaleString()}</p>
    </div>

    <div class="status-banner ${statusClass}">
      ${overallPassed ? '✅' : '❌'} ${statusText}
    </div>

    <div class="summary">
      <h2>Summary</h2>
      <div class="metrics">
        <div class="metric info">
          <div class="metric-value">${summary?.ranAgents || 0}/${summary?.totalAgents || 0}</div>
          <div class="metric-label">Agents Run</div>
        </div>
        <div class="metric success">
          <div class="metric-value">${summary?.passed || 0}</div>
          <div class="metric-label">Passed</div>
        </div>
        <div class="metric ${summary?.failed > 0 ? 'failure' : 'success'}">
          <div class="metric-value">${summary?.failed || 0}</div>
          <div class="metric-label">Failed</div>
        </div>
        <div class="metric info">
          <div class="metric-value">${(duration / 1000).toFixed(1)}s</div>
          <div class="metric-label">Duration</div>
        </div>
      </div>
    </div>

    <div class="agents">
      <h2 style="margin-bottom: 20px;">Agent Results</h2>

      ${generateAgentSection('UI Tester', summary?.results?.find(r => r.agent === 'ui-tester'), uiTester)}
      ${generateAgentSection('Code Reviewer', summary?.results?.find(r => r.agent === 'code-reviewer'), codeReviewer)}
      ${generateAgentSection('Performance Checker', summary?.results?.find(r => r.agent === 'performance-checker'), performanceChecker)}
    </div>

    ${generateNextSteps(overallPassed, summary)}

    <div class="footer">
      <p>Generated by AI Kids Spark Verification System</p>
      <p>Report timestamp: ${new Date().toISOString()}</p>
    </div>
  </div>

  <script>
    // Toggle agent details
    document.querySelectorAll('.agent-header').forEach(header => {
      header.addEventListener('click', () => {
        const body = header.nextElementSibling;
        body.classList.toggle('expanded');
      });
    });

    // Expand failed agents by default
    document.querySelectorAll('.agent-status.failed').forEach(status => {
      const body = status.closest('.agent').querySelector('.agent-body');
      body.classList.add('expanded');
    });
  </script>
</body>
</html>`;
}

// Generate agent section HTML
function generateAgentSection(name, summaryData, detailData) {
  if (!summaryData) {
    return `
      <div class="agent">
        <div class="agent-header">
          <div class="agent-title">${name}</div>
          <div class="agent-status skipped">SKIPPED</div>
        </div>
        <div class="agent-body">
          <p>This agent was not run in this verification cycle.</p>
        </div>
      </div>
    `;
  }

  const passed = summaryData.success;
  const statusClass = passed ? 'passed' : 'failed';
  const statusText = passed ? 'PASSED' : 'FAILED';
  const duration = (summaryData.duration / 1000).toFixed(2);

  return `
    <div class="agent">
      <div class="agent-header">
        <div class="agent-title">
          ${passed ? '✅' : '❌'} ${name}
          ${summaryData.critical ? '<span style="color: #ef4444; font-size: 0.8em;">[CRITICAL]</span>' : ''}
        </div>
        <div class="agent-status ${statusClass}">${statusText}</div>
      </div>
      <div class="agent-body">
        <div class="agent-detail">
          <strong>Duration:</strong> ${duration}s
        </div>
        ${summaryData.exitCode !== undefined ? `
        <div class="agent-detail">
          <strong>Exit Code:</strong> ${summaryData.exitCode}
        </div>
        ` : ''}
        ${summaryData.error ? `
        <div class="agent-detail">
          <strong>Error:</strong> <span style="color: #ef4444;">${summaryData.error}</span>
        </div>
        ` : ''}
        ${detailData ? `
        <div class="agent-detail">
          <strong>Details:</strong>
          <pre style="background: #f3f4f6; padding: 10px; border-radius: 4px; overflow-x: auto; margin-top: 10px;">${JSON.stringify(detailData, null, 2)}</pre>
        </div>
        ` : '<p>No detailed results available.</p>'}
      </div>
    </div>
  `;
}

// Generate next steps section
function generateNextSteps(passed, summary) {
  if (passed) {
    return `
      <div class="next-steps" style="background: #d1fae5; border-top-color: #6ee7b7;">
        <h2 style="color: #065f46;">✅ Next Steps</h2>
        <ul>
          <li>All verifications passed! You're ready to commit your changes.</li>
          <li>Run <code>git add .</code> and <code>git commit -m "your message"</code></li>
          <li>Consider creating a pull request if ready to merge</li>
          <li>Continue developing with confidence!</li>
        </ul>
      </div>
    `;
  }

  const failedAgents = summary?.results?.filter(r => !r.success).map(r => r.name) || [];

  return `
    <div class="next-steps">
      <h2>⚠️ Next Steps</h2>
      <ul>
        <li><strong>Review failed agents:</strong> ${failedAgents.join(', ') || 'Check above for details'}</li>
        <li><strong>Fix identified issues:</strong> Address errors shown in agent outputs</li>
        <li><strong>Run quick check:</strong> <code>node .verification/workflows/quick-check.js</code></li>
        <li><strong>Re-run full verification:</strong> <code>node .verification/workflows/full-verification.js</code></li>
        <li><strong>Iterate until passing:</strong> Repeat the process until all checks pass</li>
      </ul>
    </div>
  `;
}

// Main execution
console.log('📊 Generating aggregated verification report...\n');

const results = collectAgentResults();

if (!results.summary) {
  console.warn('⚠️  Warning: No verification summary found. Report may be incomplete.');
}

const html = generateHTML(results);
const outputPath = join(LATEST_DIR, 'index.html');

writeFileSync(outputPath, html);

console.log('✅ Report generated successfully!');
console.log(`📄 Location: ${outputPath}\n`);
console.log('To view the report, open it in your browser:');
console.log(`   open ${outputPath}`);
console.log('   or');
console.log(`   firefox ${outputPath}`);
