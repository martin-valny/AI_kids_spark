/**
 * CLAUDE.md Documentation Checker
 *
 * Verifies that CLAUDE.md is kept up-to-date when architectural changes are made.
 *
 * Checks:
 * 1. Last Updated date is current (within last 30 days if significant changes exist)
 * 2. Refactoring phase status matches actual code
 * 3. New components are documented
 * 4. Critical sections exist and are complete
 *
 * @returns {Promise<{passed: boolean, warnings: string[], errors: string[]}>}
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../../..');

const CLAUDE_MD_PATH = path.join(rootDir, 'Claude.md');
const DESIGN_SYSTEM_PATH = path.join(rootDir, 'src/design-system');

// ANSI color codes
const colors = {
  reset: '\x1b[0m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  green: '\x1b[32m',
  blue: '\x1b[36m',
  bold: '\x1b[1m',
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

/**
 * Check if CLAUDE.md exists
 */
function checkClaudeMdExists() {
  if (!fs.existsSync(CLAUDE_MD_PATH)) {
    return {
      passed: false,
      error: 'CLAUDE.md does not exist in repository root',
    };
  }
  return { passed: true };
}

/**
 * Check Last Updated date
 */
function checkLastUpdatedDate() {
  const content = fs.readFileSync(CLAUDE_MD_PATH, 'utf-8');
  const dateMatch = content.match(/\*\*Last Updated:\*\*\s*(\d{4}-\d{2}-\d{2})/);

  if (!dateMatch) {
    return {
      passed: false,
      warning: 'CLAUDE.md is missing "Last Updated" date in header',
    };
  }

  const lastUpdated = new Date(dateMatch[1]);
  const now = new Date();
  const daysSinceUpdate = Math.floor((now - lastUpdated) / (1000 * 60 * 60 * 24));

  // Check if there were significant code changes in the last 30 days
  try {
    const gitLog = execSync('git log --since="30 days ago" --oneline --no-merges', {
      encoding: 'utf-8',
      cwd: rootDir
    }).trim();

    const commitCount = gitLog.split('\n').filter(line => line.trim()).length;

    if (commitCount > 5 && daysSinceUpdate > 30) {
      return {
        passed: false,
        warning: `CLAUDE.md hasn't been updated in ${daysSinceUpdate} days, but ${commitCount} commits were made in the last 30 days. Consider updating documentation.`,
      };
    }
  } catch (err) {
    // Git not available or no commits - skip this check
  }

  return { passed: true };
}

/**
 * Check if refactoring status matches actual files
 */
function checkRefactoringStatus() {
  const content = fs.readFileSync(CLAUDE_MD_PATH, 'utf-8');
  const warnings = [];

  // Check if design-system files exist
  const designSystemExists = fs.existsSync(DESIGN_SYSTEM_PATH);
  const tokensExist = fs.existsSync(path.join(DESIGN_SYSTEM_PATH, 'tokens.ts'));
  const patternsExist = fs.existsSync(path.join(DESIGN_SYSTEM_PATH, 'patterns.md'));

  if (designSystemExists && tokensExist && patternsExist) {
    // Phase 1 should be marked complete
    if (!content.includes('Phase 1: Design System Setup') ||
        !content.includes('✅') && content.includes('Phase 1')) {
      warnings.push('Phase 1 design system files exist, but CLAUDE.md may not reflect completion status');
    }
  }

  // Check for component library (Phase 3)
  const componentLibraryFiles = [
    'src/components/InnerCard.tsx',
    'src/components/HighlightBox.tsx',
    'src/components/ActivityCard.tsx',
  ];

  const componentLibraryExists = componentLibraryFiles.some(file =>
    fs.existsSync(path.join(rootDir, file))
  );

  if (componentLibraryExists && content.includes('⏸️ Phase 3')) {
    warnings.push('Component library files detected, but Phase 3 is still marked as PENDING in CLAUDE.md');
  }

  return {
    passed: warnings.length === 0,
    warnings,
  };
}

/**
 * Check if critical sections exist
 */
function checkCriticalSections() {
  const content = fs.readFileSync(CLAUDE_MD_PATH, 'utf-8');
  const requiredSections = [
    '## 🎯 Project Overview',
    '## 🏗️ Architecture & Key Decisions',
    '## 📁 Project Structure',
    '## 🛠️ Development Workflow',
    '## 📋 Code Standards',
    '## 🎨 Design System Usage',
    '## 🧪 Testing Strategy',
    '## 🚀 Refactoring Plan Status',
  ];

  const missingSections = requiredSections.filter(section =>
    !content.includes(section)
  );

  if (missingSections.length > 0) {
    return {
      passed: false,
      errors: missingSections.map(section =>
        `Missing critical section: "${section}"`
      ),
    };
  }

  return { passed: true };
}

/**
 * Check if new components are documented
 */
function checkNewComponentsDocumented() {
  const content = fs.readFileSync(CLAUDE_MD_PATH, 'utf-8');
  const warnings = [];

  // Check if design-system components are documented
  if (fs.existsSync(path.join(DESIGN_SYSTEM_PATH, 'tokens.ts'))) {
    if (!content.includes('getInnerCardClasses') ||
        !content.includes('getIconContainerClasses') ||
        !content.includes('getHighlightBoxClasses')) {
      warnings.push('Design system helper functions exist but may not be fully documented in CLAUDE.md');
    }
  }

  // Check if design tokens location is mentioned
  if (fs.existsSync(path.join(DESIGN_SYSTEM_PATH, 'tokens.ts'))) {
    if (!content.includes('src/design-system/tokens.ts')) {
      warnings.push('Design tokens file exists but path is not documented in CLAUDE.md');
    }
  }

  return {
    passed: warnings.length === 0,
    warnings,
  };
}

/**
 * Check if git commits mention architectural changes without updating CLAUDE.md
 */
function checkRecentCommitsVsClaudeMd() {
  try {
    // Get last 10 commits
    const commits = execSync('git log -10 --pretty=format:"%H|%s|%an|%ad" --date=short', {
      encoding: 'utf-8',
      cwd: rootDir
    }).trim().split('\n');

    const claudeMdCommits = execSync('git log -10 --oneline Claude.md', {
      encoding: 'utf-8',
      cwd: rootDir
    }).trim().split('\n').filter(line => line.trim());

    // Keywords that suggest architectural changes
    const architecturalKeywords = [
      'feat:', 'refactor:', 'design system', 'pattern', 'component library',
      'phase', 'architecture', 'breaking change', 'new rule', 'add eslint'
    ];

    const architecturalCommits = commits.filter(commit => {
      const message = commit.split('|')[1]?.toLowerCase() || '';
      return architecturalKeywords.some(keyword => message.includes(keyword));
    });

    if (architecturalCommits.length > 0 && claudeMdCommits.length === 0) {
      return {
        passed: false,
        warning: `${architecturalCommits.length} architectural commits detected in last 10 commits, but CLAUDE.md hasn't been updated recently. Consider documenting changes.`,
      };
    }
  } catch (err) {
    // Git not available - skip this check
  }

  return { passed: true };
}

/**
 * Main checker function
 */
async function checkDocumentation() {
  log('\n================================================================================', 'blue');
  log('  📚 CLAUDE.MD DOCUMENTATION CHECKER', 'bold');
  log('================================================================================\n', 'blue');

  const results = {
    passed: true,
    warnings: [],
    errors: [],
  };

  // Run all checks
  const checks = [
    { name: 'CLAUDE.md exists', fn: checkClaudeMdExists },
    { name: 'Last Updated date', fn: checkLastUpdatedDate },
    { name: 'Refactoring status accuracy', fn: checkRefactoringStatus },
    { name: 'Critical sections present', fn: checkCriticalSections },
    { name: 'New components documented', fn: checkNewComponentsDocumented },
    { name: 'Recent commits vs updates', fn: checkRecentCommitsVsClaudeMd },
  ];

  for (const check of checks) {
    log(`[Checking] ${check.name}...`, 'blue');
    const result = check.fn();

    if (result.error) {
      results.errors.push(result.error);
      results.passed = false;
      log(`  ❌ ${result.error}`, 'red');
    } else if (result.errors) {
      results.errors.push(...result.errors);
      results.passed = false;
      result.errors.forEach(err => log(`  ❌ ${err}`, 'red'));
    } else if (result.warning) {
      results.warnings.push(result.warning);
      log(`  ⚠️  ${result.warning}`, 'yellow');
    } else if (result.warnings) {
      results.warnings.push(...result.warnings);
      result.warnings.forEach(warn => log(`  ⚠️  ${warn}`, 'yellow'));
    } else {
      log(`  ✅ Passed`, 'green');
    }
  }

  // Summary
  log('\n================================================================================', 'blue');
  log('  📊 DOCUMENTATION CHECK SUMMARY', 'bold');
  log('================================================================================\n', 'blue');

  if (results.errors.length > 0) {
    log(`❌ Errors: ${results.errors.length}`, 'red');
    results.errors.forEach(err => log(`   • ${err}`, 'red'));
  }

  if (results.warnings.length > 0) {
    log(`⚠️  Warnings: ${results.warnings.length}`, 'yellow');
    results.warnings.forEach(warn => log(`   • ${warn}`, 'yellow'));
  }

  if (results.errors.length === 0 && results.warnings.length === 0) {
    log('✅ All documentation checks passed!', 'green');
  }

  log('\n' + '─'.repeat(80), 'blue');

  if (results.errors.length > 0) {
    log('\n❌ DOCUMENTATION CHECK FAILED!', 'red');
    log('\nPlease update CLAUDE.md to reflect recent changes:', 'yellow');
    log('  1. Update "Last Updated" date', 'yellow');
    log('  2. Mark completed phases with ✅', 'yellow');
    log('  3. Document new components and patterns', 'yellow');
    log('  4. Ensure all critical sections are present\n', 'yellow');
  } else if (results.warnings.length > 0) {
    log('\n⚠️  Documentation check passed with warnings.', 'yellow');
    log('Consider updating CLAUDE.md to improve documentation quality.\n', 'yellow');
  } else {
    log('\n✅ DOCUMENTATION CHECK PASSED!\n', 'green');
  }

  return results;
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  checkDocumentation().then(result => {
    // Exit with error code if critical errors found
    // Warnings are allowed (exit 0)
    process.exit(result.errors.length > 0 ? 1 : 0);
  }).catch(err => {
    console.error('Documentation checker failed:', err);
    process.exit(1);
  });
}

export { checkDocumentation };
