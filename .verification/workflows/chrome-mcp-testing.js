#!/usr/bin/env node

/**
 * Chrome MCP UI Testing Helper Script
 *
 * Loads and displays test scenarios and routes for Chrome MCP browser testing.
 * This script is used by Claude to understand what tests are available and
 * by developers to see the test configuration.
 *
 * Usage:
 *   node chrome-mcp-testing.js scenarios  - Display all test scenarios
 *   node chrome-mcp-testing.js routes     - Display all routes to test
 *   node chrome-mcp-testing.js routes smoke - Display only smoke test routes
 *   node chrome-mcp-testing.js help       - Show help
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const SCENARIOS_PATH = join(__dirname, '../chrome-mcp-tests/scenarios.json');
const ROUTES_PATH = join(__dirname, '../chrome-mcp-tests/routes.json');
const REPORTS_DIR = join(__dirname, '../reports/chrome-mcp');

/**
 * Load JSON file with error handling
 */
function loadJson(path) {
  try {
    const content = readFileSync(path, 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.error(`Error loading ${path}:`, error.message);
    process.exit(1);
  }
}

/**
 * Display all test scenarios
 */
function displayScenarios(filter = null) {
  const data = loadJson(SCENARIOS_PATH);

  console.log('\n╔══════════════════════════════════════════════════════════════╗');
  console.log('║         Chrome MCP UI Test Scenarios                         ║');
  console.log('╚══════════════════════════════════════════════════════════════╝\n');

  console.log(`Version: ${data.version}`);
  console.log(`Last Updated: ${data.lastUpdated}`);
  console.log(`Total Scenarios: ${data.scenarios.length}\n`);

  // Group by category
  const byCategory = {};
  for (const scenario of data.scenarios) {
    const cat = scenario.category || 'uncategorized';
    if (!byCategory[cat]) {
      byCategory[cat] = [];
    }
    if (!filter || cat === filter) {
      byCategory[cat].push(scenario);
    }
  }

  for (const [category, scenarios] of Object.entries(byCategory)) {
    if (scenarios.length === 0) continue;

    const catInfo = data.categories[category] || { description: 'No description' };
    console.log(`\n┌─ ${category.toUpperCase()} ─────────────────────────────────────────`);
    console.log(`│  ${catInfo.description}`);
    console.log(`│  Run on quick check: ${catInfo.runOnQuickCheck ? 'Yes' : 'No'}`);
    console.log('│');

    for (const scenario of scenarios) {
      const priority = scenario.priority === 'critical' ? '🔴' :
                       scenario.priority === 'high' ? '🟡' : '⚪';
      console.log(`│  ${priority} [${scenario.id}]`);
      console.log(`│     ${scenario.name}`);
      console.log(`│     ${scenario.description}`);
      console.log(`│     Steps: ${scenario.steps.length}`);
      if (scenario.knownIssues && scenario.knownIssues.length > 0) {
        console.log(`│     ⚠️  Known issues: ${scenario.knownIssues.join(', ')}`);
      }
      console.log('│');
    }
    console.log('└────────────────────────────────────────────────────────────');
  }

  console.log('\n\nCategories Summary:');
  console.log('────────────────────');
  for (const [name, info] of Object.entries(data.categories)) {
    const count = byCategory[name]?.length || 0;
    console.log(`  ${name}: ${count} scenarios - ${info.description}`);
  }
}

/**
 * Display all routes
 */
function displayRoutes(group = null) {
  const data = loadJson(ROUTES_PATH);

  console.log('\n╔══════════════════════════════════════════════════════════════╗');
  console.log('║         Chrome MCP Testable Routes                           ║');
  console.log('╚══════════════════════════════════════════════════════════════╝\n');

  console.log(`Version: ${data.version}`);
  console.log(`Last Updated: ${data.lastUpdated}`);
  console.log(`Base URL: ${data.baseUrl}\n`);

  // Determine which categories to show
  let categories = Object.keys(data.routes);
  if (group && data.testGroups[group]) {
    categories = data.testGroups[group].include || [];
    console.log(`Test Group: ${group}`);
    console.log(`Description: ${data.testGroups[group].description}\n`);
  }

  let totalRoutes = 0;
  let canvasRoutes = 0;
  let formRoutes = 0;

  for (const category of categories) {
    const catData = data.routes[category];
    if (!catData) continue;

    console.log(`\n┌─ ${category.toUpperCase()} ─────────────────────────────────────────`);
    console.log(`│  ${catData.description}`);
    console.log('│');

    for (const route of catData.routes) {
      totalRoutes++;
      if (route.hasCanvas) canvasRoutes++;
      if (route.hasForm) formRoutes++;

      const flags = [];
      if (route.hasCanvas) flags.push('🎨 Canvas');
      if (route.hasForm) flags.push('📝 Form');
      if (route.requiresAuth) flags.push('🔐 Auth');
      if (route.internal) flags.push('🔧 Internal');

      console.log(`│  ${route.path}`);
      console.log(`│     Name: ${route.name}`);
      if (flags.length > 0) {
        console.log(`│     Flags: ${flags.join(' | ')}`);
      }
      if (route.expectedBackLink) {
        console.log(`│     Back link → ${route.expectedBackLink}`);
      }
      console.log('│');
    }
    console.log('└────────────────────────────────────────────────────────────');
  }

  console.log('\n\nRoutes Summary:');
  console.log('────────────────────');
  console.log(`  Total routes: ${totalRoutes}`);
  console.log(`  With canvas/WebGL: ${canvasRoutes}`);
  console.log(`  With forms: ${formRoutes}`);

  console.log('\n\nAvailable Test Groups:');
  console.log('────────────────────');
  for (const [name, info] of Object.entries(data.testGroups)) {
    console.log(`  ${name}: ${info.description}`);
  }

  console.log('\n\nScroll Position Check Config:');
  console.log('────────────────────');
  const scrollConfig = data.scrollPositionCheck;
  console.log(`  Expected value: ${scrollConfig.expectedValue}`);
  console.log(`  Tolerance: ±${scrollConfig.tolerance}px`);
  console.log(`  Check delay: ${scrollConfig.checkDelay}ms`);
}

/**
 * Save a test report
 */
function saveReport(results) {
  if (!existsSync(REPORTS_DIR)) {
    mkdirSync(REPORTS_DIR, { recursive: true });
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
  const reportPath = join(REPORTS_DIR, `report-${timestamp}.json`);

  writeFileSync(reportPath, JSON.stringify(results, null, 2));
  console.log(`Report saved to: ${reportPath}`);
  return reportPath;
}

/**
 * Display help
 */
function displayHelp() {
  console.log(`
Chrome MCP UI Testing Helper
═══════════════════════════════════════════════════════════════

Usage:
  node chrome-mcp-testing.js <command> [options]

Commands:
  scenarios [category]  Display test scenarios (optionally filter by category)
  routes [group]        Display routes to test (optionally filter by test group)
  help                  Show this help message

Examples:
  node chrome-mcp-testing.js scenarios
  node chrome-mcp-testing.js scenarios smoke
  node chrome-mcp-testing.js routes
  node chrome-mcp-testing.js routes smoke

Test Groups:
  smoke           - Quick smoke test (critical pages only)
  full            - Full test (all public pages)
  lessons-only    - Test only lesson pages
  activities-only - Test only activity pages
  canvas-activities - Activities with canvas/WebGL elements

For Claude:
  When user says "test the UI", refer to CLAUDE.md for the
  Chrome MCP UI Testing Workflow section.
`);
}

// Main
const command = process.argv[2];
const option = process.argv[3];

switch (command) {
  case 'scenarios':
    displayScenarios(option);
    break;
  case 'routes':
    displayRoutes(option);
    break;
  case 'help':
  case '--help':
  case '-h':
    displayHelp();
    break;
  default:
    console.log('Unknown command. Use "help" for usage information.');
    displayHelp();
    process.exit(1);
}
