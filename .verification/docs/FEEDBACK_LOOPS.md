# Feedback Loops Implementation Guide

> **"Give Claude a way to verify its work = 2-3x better quality"** - Boris

This guide documents the three feedback loop implementations for AI Kids Spark, designed to ensure high-quality development through automated verification and iterative improvement.

## 📋 Table of Contents

1. [Overview](#overview)
2. [The Three Feedback Loops](#the-three-feedback-loops)
3. [Quick Start](#quick-start)
4. [Detailed Usage](#detailed-usage)
5. [Best Practices](#best-practices)
6. [Integration with Development Workflow](#integration-with-development-workflow)
7. [Troubleshooting](#troubleshooting)

---

## Overview

Feedback loops are automated workflows that verify implementation quality through iterative testing and refinement. Each loop focuses on a specific aspect of quality:

- **Browser Testing Loop**: Validates functional behavior in a real browser
- **Visual Comparison Loop**: Ensures pixel-perfect design implementation
- **Test-Driven Development Loop**: Drives implementation through test specifications

### Why Feedback Loops?

Traditional development:
```
Code → Manual Testing → Debug → Hope it works
```

With feedback loops:
```
Code → Automated Verification → Clear Issues → Fix → Re-verify → Done ✅
```

**Result**: 2-3x better quality, faster iteration, fewer regressions.

---

## The Three Feedback Loops

### 🌐 Option A: Browser Testing Loop

**Purpose**: Validate UI functionality in a real browser environment

**Workflow**:
```
1. Build the feature
2. Start local dev server
3. Run UI tests (Playwright)
4. If issues found → Report clearly
5. Fix issues
6. Re-test until all checks pass
7. Only then mark as complete
```

**When to Use**:
- After implementing new features
- Before committing UI changes
- When user interactions are critical
- For cross-browser compatibility

**Command**:
```bash
npm run feedback:browser
```

**Example**:
```bash
# Run with specific test suite
npm run feedback:browser -- --test-suite interactive

# Run with more iterations
npm run feedback:browser -- --max-iterations 10
```

---

### 📸 Option B: Visual Comparison Loop

**Purpose**: Ensure pixel-perfect design implementation

**Workflow**:
```
1. Implement the design
2. Take screenshots (multiple viewports)
3. Compare to design mockup/baseline
4. List differences (pixel diff, layout shifts, colors)
5. Fix discrepancies
6. Re-screenshot and verify
7. Repeat until pixel-perfect
```

**When to Use**:
- Implementing new UI designs
- Refactoring visual components
- Ensuring responsive design accuracy
- Preventing visual regressions

**Command**:
```bash
# First: Create baseline screenshots
npm run feedback:visual -- --update-baseline

# Then: Compare implementation
npm run feedback:visual
```

**Example**:
```bash
# Test specific pages
npm run feedback:visual -- --urls /,/lessons,/projects

# Custom threshold (0.5% difference allowed)
npm run feedback:visual -- --threshold 0.5
```

---

### 🔴 Option C: Test-Driven Development Loop

**Purpose**: Drive implementation through comprehensive test specifications

**Workflow**:
```
1. Write E2E tests FIRST for:
   - Form submission
   - Navigation flows
   - Responsive breakpoints
   - User interactions
2. Run tests → They FAIL (RED phase)
3. Implement features to pass tests
4. Run tests → They PASS (GREEN phase)
5. Refactor while keeping tests green
6. Keep iterating until all tests green
```

**When to Use**:
- Starting new features
- Complex user interactions
- Critical business logic
- When requirements are clear

**Command**:
```bash
# Create test template
npm run feedback:tdd -- --create-test feature-name form

# Run TDD loop
npm run feedback:tdd -- --test-file path/to/test.spec.ts
```

**Example**:
```bash
# Create navigation test
npm run feedback:tdd -- --create-test user-navigation navigation

# Run with watch mode
npm run feedback:tdd -- --test-file ./tests/feature.spec.ts --watch
```

---

## Quick Start

### Option 1: Run Individual Loop

```bash
# Browser Testing
npm run feedback:browser

# Visual Comparison (create baselines first)
npm run feedback:visual -- --update-baseline
npm run feedback:visual

# Test-Driven Development
npm run feedback:tdd -- --test-file ./tests/my-feature.spec.ts
```

### Option 2: Run All Loops

```bash
# Run all feedback loops sequentially
npm run feedback:all

# Run all, stop on first failure
npm run feedback:all -- --stop-on-failure

# Run specific combination
npm run feedback:all -- --skip-visual
```

### Option 3: Use Orchestrator

```bash
# List available loops
npm run feedback:list

# View execution history
npm run feedback:log

# Run specific loop with orchestrator
node .verification/workflows/feedback-loop-orchestrator.js browser --test-suite smoke
```

---

## Detailed Usage

### Browser Testing Loop

**Configuration Options**:

| Option | Description | Default |
|--------|-------------|---------|
| `--test-suite` | Test suite to run (smoke, homepage, interactive, responsive) | `smoke` |
| `--max-iterations` | Maximum test iterations | `5` |
| `--auto-fix` | Enable experimental auto-fixing | `false` |

**Available Test Suites**:
- `smoke`: Critical path tests (11 tests)
- `homepage`: Hero section and CTA tests
- `interactive`: User interaction flows
- `responsive`: Responsive design validation

**Output**:
- Real-time test results
- Iteration reports in `.verification/reports/browser-testing-loop/`
- Success/failure summary with actionable issues

**Example Workflow**:
```bash
# 1. Implement feature
# 2. Run browser testing loop
npm run feedback:browser -- --test-suite interactive

# 3. Review output
# ✅ All tests passed! or
# ❌ Tests failed - see detailed issues

# 4. Fix issues if any
# 5. Loop auto-retries or run again
```

---

### Visual Comparison Loop

**Configuration Options**:

| Option | Description | Default |
|--------|-------------|---------|
| `--urls` | Comma-separated URLs to test | `/` |
| `--threshold` | Acceptable difference % (0.0-100.0) | `0.1` |
| `--max-iterations` | Maximum iterations | `5` |
| `--update-baseline` | Create/update baseline screenshots | `false` |

**Viewports Tested**:
- Desktop: 1920x1080
- Tablet: 768x1024
- Mobile: 375x667

**Output**:
- Screenshot comparisons
- Pixel difference calculations
- Visual diff images
- Side-by-side comparisons
- Reports in `.verification/reports/visual-comparison-loop/`

**Example Workflow**:
```bash
# 1. Create initial baselines (once)
npm run feedback:visual -- --update-baseline

# 2. Implement design changes
# 3. Run visual comparison
npm run feedback:visual -- --urls /,/lessons

# 4. Review diff images
# 5. Fix visual discrepancies
# 6. Press Enter to retry (or wait 30s)
# 7. Repeat until pixel-perfect
```

**Baseline Management**:
```bash
# Update all baselines
npm run feedback:visual -- --update-baseline

# Update specific pages
npm run feedback:visual -- --urls /new-page --update-baseline

# Baselines stored in: .verification/baselines/
```

---

### Test-Driven Development Loop

**Configuration Options**:

| Option | Description | Default |
|--------|-------------|---------|
| `--test-file` | Path to test file | Required |
| `--test-type` | Type (e2e, unit, integration) | `e2e` |
| `--max-iterations` | Maximum iterations | `10` |
| `--watch` | Enable watch mode | `false` |
| `--create-test` | Create test template | N/A |

**Test Templates**:
- `form`: Form submission tests
- `navigation`: Navigation flow tests
- `responsive`: Responsive design tests
- `interaction`: User interaction tests

**Output**:
- Real-time test execution
- Failure analysis with specific issues
- Iteration reports
- TDD cycle tracking (RED → GREEN → REFACTOR)

**Example Workflow**:
```bash
# 1. Create test template
npm run feedback:tdd -- --create-test user-profile form

# 2. Edit the generated test file
# .verification/templates/test-driven/user-profile.spec.ts

# 3. Run TDD loop (tests will fail - RED)
npm run feedback:tdd -- --test-file .verification/templates/test-driven/user-profile.spec.ts

# 4. Implement feature to make tests pass
# 5. Tests pass - GREEN
# 6. Refactor while keeping tests green
```

**TDD Cycle**:
```
🔴 RED:      Tests written and failing
             ↓
🟢 GREEN:    Minimum implementation to pass
             ↓
♻️  REFACTOR: Improve code quality
             ↓
             Repeat for next feature
```

---

## Best Practices

### 1. Choose the Right Loop for the Task

| Task Type | Recommended Loop | Why |
|-----------|------------------|-----|
| New feature | TDD Loop | Drives implementation with clear specs |
| UI component | Visual Loop | Ensures design accuracy |
| User flow | Browser Loop | Validates real interactions |
| Refactoring | All Loops | Prevents regressions |
| Bug fix | Browser + TDD | Tests catch bug, fix prevents regression |

### 2. Combine Loops for Comprehensive Quality

```bash
# Full quality check
npm run feedback:all

# Custom combination
npm run feedback:tdd -- --test-file ./tests/feature.spec.ts && \
npm run feedback:browser -- --test-suite interactive && \
npm run feedback:visual
```

### 3. Integrate with Git Workflow

```bash
# Before committing
npm run feedback:all

# Pre-commit hook (add to .husky/pre-commit)
npm run feedback:browser -- --test-suite smoke
```

### 4. Use Appropriate Thresholds

**Visual Comparison**:
- `0.0`: Pixel-perfect (strict, may catch font rendering differences)
- `0.1`: Very strict (default, good for most cases)
- `0.5`: Moderate (allows minor anti-aliasing differences)
- `1.0`: Lenient (allows small layout shifts)

**Iterations**:
- Browser Testing: 5 iterations (default, usually sufficient)
- Visual Comparison: 3-5 iterations (manual fixes needed)
- TDD: 10 iterations (more time for implementation)

### 5. Maintain Clean Baselines

```bash
# Update baselines when design changes
npm run feedback:visual -- --update-baseline

# Review baseline images before committing
git diff .verification/baselines/

# Commit baselines with design changes
git add .verification/baselines/
git commit -m "Update visual baselines for new design"
```

### 6. Create Meaningful Test Templates

When using TDD loop, create specific, actionable tests:

```typescript
// ✅ Good: Specific, testable behavior
test('should display error when email is invalid', async ({ page }) => {
  await page.fill('#email', 'invalid-email');
  await page.click('#submit');
  await expect(page.locator('.error')).toContainText('Invalid email');
});

// ❌ Bad: Vague, hard to implement
test('should work correctly', async ({ page }) => {
  // What does "work correctly" mean?
});
```

### 7. Monitor Feedback Loop Performance

```bash
# View execution history and statistics
npm run feedback:log

# Analyze patterns:
# - Which loops fail most often?
# - How many iterations typically needed?
# - Which test suites catch most issues?
```

---

## Integration with Development Workflow

### Development Cycle with Feedback Loops

```
1. Feature Planning
   ↓
2. Write Tests (TDD Loop)
   ↓
3. Implement Feature
   ↓
4. Run Browser Testing Loop
   ↓
5. Run Visual Comparison Loop
   ↓
6. All Loops Pass?
   ↓ No → Fix Issues → Retry
   ↓ Yes
7. Commit & Push
```

### Continuous Integration

Add to `.github/workflows/verification.yml`:

```yaml
- name: Run Feedback Loops
  run: |
    npm run feedback:all -- --stop-on-failure
```

### Pre-Commit Hook

Add to `.husky/pre-commit`:

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

# Quick browser test before commit
npm run feedback:browser -- --test-suite smoke --max-iterations 3
```

### Claude Code Integration

When working with Claude Code, use feedback loops proactively:

```
User: "Add a dark mode toggle"

Claude:
1. I'll create a test for dark mode functionality
   [Runs TDD loop]

2. Now implementing the dark mode feature
   [Writes code]

3. Verifying with browser testing loop
   [Runs browser loop]

4. Checking visual accuracy
   [Runs visual loop]

5. All loops passed! Dark mode is ready.
```

---

## Troubleshooting

### Browser Testing Loop Issues

**Problem**: Dev server fails to start
```bash
# Check if port 8080 is in use
lsof -i :8080

# Kill existing process
kill -9 <PID>

# Or use different port (modify loop script)
```

**Problem**: Tests timeout
```bash
# Increase timeout in playwright.config.ts
timeout: 60000  // 60 seconds
```

**Problem**: Flaky tests
```bash
# Add more wait time
await page.waitForLoadState('networkidle');
await page.waitForTimeout(1000);
```

---

### Visual Comparison Loop Issues

**Problem**: Baseline images missing
```bash
# Create baselines first
npm run feedback:visual -- --update-baseline
```

**Problem**: False positives (minor font differences)
```bash
# Increase threshold
npm run feedback:visual -- --threshold 0.5
```

**Problem**: Screenshots differ in size
```bash
# Ensure consistent viewport
# Check for dynamic content (ads, timestamps)
# Review baseline creation process
```

---

### Test-Driven Development Loop Issues

**Problem**: No test file specified
```bash
# Create test template first
npm run feedback:tdd -- --create-test feature-name

# Then run with test file
npm run feedback:tdd -- --test-file <path>
```

**Problem**: Tests never pass
```bash
# Increase max iterations
npm run feedback:tdd -- --test-file <path> --max-iterations 20

# Or review test expectations
# Are they realistic?
```

**Problem**: Watch mode not working
```bash
# Ensure file watcher is available
# Try without watch mode first
npm run feedback:tdd -- --test-file <path>
```

---

## Advanced Usage

### Custom Test Suites

Create custom test suite for browser loop:

```typescript
// .verification/agents/ui-tester/test-suites/custom.spec.ts
import { test, expect } from '@playwright/test';

test.describe('Custom Feature Tests', () => {
  test('custom test', async ({ page }) => {
    // Your test logic
  });
});
```

Run with:
```bash
npm run feedback:browser -- --test-suite custom
```

### Parallel Execution

```bash
# Run loops in parallel (use with caution - resource intensive)
npm run feedback:browser &
npm run feedback:visual &
wait
```

### CI/CD Integration

```yaml
# .github/workflows/feedback-loops.yml
name: Feedback Loops

on: [push, pull_request]

jobs:
  quality-check:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run feedback:all -- --stop-on-failure
      - uses: actions/upload-artifact@v3
        if: failure()
        with:
          name: feedback-reports
          path: .verification/reports/
```

---

## Summary

Feedback loops transform development from "code and hope" to "code, verify, and know."

**Key Takeaways**:
- ✅ Use TDD Loop for new features
- ✅ Use Browser Loop for functional validation
- ✅ Use Visual Loop for design accuracy
- ✅ Run all loops before committing
- ✅ Iterate until all loops pass
- ✅ Maintain clean baselines

**Result**: 2-3x better quality, confident deployments, happy users.

---

## Resources

- [Browser Testing Loop Script](.verification/workflows/browser-testing-loop.js)
- [Visual Comparison Loop Script](.verification/workflows/visual-comparison-loop.js)
- [Test-Driven Loop Script](.verification/workflows/test-driven-loop.js)
- [Feedback Loop Orchestrator](.verification/workflows/feedback-loop-orchestrator.js)
- [Screenshot Utilities](.verification/utils/screenshot-compare.js)
- [Main Claude Documentation](../../Claude.md)

---

*"Give Claude a way to verify its work = 2-3x better quality" - Boris*
