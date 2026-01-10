# Feedback Loop Workflows

This directory contains the implementation of Boris's three feedback loop patterns for ensuring 2-3x better code quality through automated verification.

## Overview

**"Give Claude a way to verify its work = 2-3x better quality"** - Boris

Feedback loops provide automated ways to verify implementation quality through iterative testing and refinement.

## Available Workflows

### 1. Browser Testing Loop (`browser-testing-loop.js`)

Validates functional behavior in a real browser environment.

**Workflow**: Build → Start Dev Server → Run Tests → Fix Issues → Repeat

**Usage**:
```bash
node browser-testing-loop.js [options]
# Or via NPM:
npm run feedback:browser
```

**Options**:
- `--test-suite <name>`: Test suite (smoke, homepage, interactive, responsive)
- `--max-iterations <n>`: Maximum iterations (default: 5)
- `--auto-fix`: Enable experimental auto-fixing

**Test Suites**:
- `smoke`: Critical path tests (11 tests)
- `homepage`: Hero section and CTA
- `interactive`: User interactions
- `responsive`: Responsive design

---

### 2. Visual Comparison Loop (`visual-comparison-loop.js`)

Ensures pixel-perfect design implementation through screenshot comparison.

**Workflow**: Implement → Screenshot → Compare → Fix → Repeat

**Usage**:
```bash
# Create baselines first
node visual-comparison-loop.js --update-baseline

# Then compare
node visual-comparison-loop.js [options]
# Or via NPM:
npm run feedback:visual
```

**Options**:
- `--urls <list>`: Comma-separated URLs to test
- `--threshold <n>`: Acceptable difference % (default: 0.1)
- `--max-iterations <n>`: Maximum iterations (default: 5)
- `--update-baseline`: Create/update baseline screenshots

**Viewports**:
- Desktop: 1920x1080
- Tablet: 768x1024
- Mobile: 375x667

---

### 3. Test-Driven Development Loop (`test-driven-loop.js`)

Drives implementation through test specifications following Red-Green-Refactor.

**Workflow**: Write Tests → RED → Implement → GREEN → Refactor

**Usage**:
```bash
# Create test template
node test-driven-loop.js --create-test feature-name form

# Run TDD loop
node test-driven-loop.js --test-file path/to/test.spec.ts
# Or via NPM:
npm run feedback:tdd -- --test-file path/to/test.spec.ts
```

**Options**:
- `--test-file <path>`: Path to test file (required)
- `--test-type <type>`: Test type (e2e, unit, integration)
- `--max-iterations <n>`: Maximum iterations (default: 10)
- `--watch`: Enable watch mode
- `--create-test <name> [type]`: Create test template

**Templates**:
- `form`: Form submission tests
- `navigation`: Navigation flow tests
- `responsive`: Responsive design tests
- `interaction`: User interaction tests

---

### 4. Feedback Loop Orchestrator (`feedback-loop-orchestrator.js`)

Unified interface for running and managing all feedback loops.

**Usage**:
```bash
# Run specific loop
node feedback-loop-orchestrator.js browser
node feedback-loop-orchestrator.js visual
node feedback-loop-orchestrator.js tdd

# Run all loops
node feedback-loop-orchestrator.js all [options]

# View session log
node feedback-loop-orchestrator.js log

# List available loops
node feedback-loop-orchestrator.js list

# Or via NPM:
npm run feedback:all
npm run feedback:log
npm run feedback:list
```

**Options for 'all' command**:
- `--stop-on-failure`: Stop on first loop failure
- `--skip-tdd`: Skip TDD loop
- `--skip-browser`: Skip browser loop
- `--skip-visual`: Skip visual loop

---

## Quick Start

### 1. Browser Testing

```bash
npm run feedback:browser
```

### 2. Visual Comparison

```bash
# First time: create baselines
npm run feedback:visual -- --update-baseline

# Subsequent runs: compare
npm run feedback:visual
```

### 3. Test-Driven Development

```bash
# Create test
npm run feedback:tdd -- --create-test my-feature form

# Edit generated test file
# .verification/templates/test-driven/my-feature.spec.ts

# Run TDD loop
npm run feedback:tdd -- --test-file .verification/templates/test-driven/my-feature.spec.ts
```

### 4. Run All

```bash
npm run feedback:all
```

---

## Integration Points

### With Quick Check Workflow

```javascript
// .verification/workflows/quick-check.js
// Add feedback loop integration for rapid iteration
```

### With Full Verification

```javascript
// .verification/workflows/full-verification.js
// Incorporate feedback loops as part of comprehensive verification
```

### With CI/CD

```yaml
# .github/workflows/verification.yml
- name: Run Feedback Loops
  run: npm run feedback:all -- --stop-on-failure
```

### With Pre-Commit Hook

```bash
# .husky/pre-commit
npm run feedback:browser -- --test-suite smoke
```

---

## Directory Structure

```
.verification/workflows/
├── README.md                           # This file
├── browser-testing-loop.js             # Browser testing implementation
├── visual-comparison-loop.js           # Visual comparison implementation
├── test-driven-loop.js                 # TDD implementation
├── feedback-loop-orchestrator.js       # Unified orchestrator
├── quick-check.js                      # Quick verification (existing)
├── full-verification.js                # Full verification (existing)
└── claude-feedback-loop.md             # Original guidance (existing)
```

---

## Output and Reports

### Browser Testing Loop
```
.verification/reports/browser-testing-loop/
├── iteration-1.json
├── iteration-2.json
├── ...
├── success-report.json (if passed)
└── failure-report.json (if failed)
```

### Visual Comparison Loop
```
.verification/reports/visual-comparison-loop/
├── screenshots/
│   ├── iteration-1/
│   │   ├── index-desktop.png
│   │   ├── index-mobile.png
│   │   └── diffs/
│   │       └── diff-*.png
│   └── iteration-2/
├── iteration-1.json
└── success-report.json
```

### Test-Driven Development Loop
```
.verification/reports/test-driven-loop/
├── iteration-1.json
├── iteration-2.json
└── success-report.json
```

### Orchestrator Session Log
```
.verification/reports/feedback-loops/
└── session-log.json
```

---

## Utilities

### Screenshot Comparison (`../utils/screenshot-compare.js`)

Used by Visual Comparison Loop for pixel-level comparison.

**Features**:
- Pixel-by-pixel comparison
- Difference percentage calculation
- Visual diff image generation
- Side-by-side comparisons
- HTML report generation

**Usage**:
```bash
node .verification/utils/screenshot-compare.js baseline.png current.png diff.png
```

---

## Best Practices

1. **Choose the Right Loop**:
   - Browser Loop: Functional validation
   - Visual Loop: Design accuracy
   - TDD Loop: New feature development

2. **Run Loops Sequentially**:
   ```bash
   npm run feedback:all
   ```

3. **Maintain Clean Baselines**:
   ```bash
   npm run feedback:visual -- --update-baseline
   git add .verification/baselines/
   ```

4. **Use Appropriate Iterations**:
   - Browser: 5 iterations (quick feedback)
   - Visual: 5 iterations (manual fixes)
   - TDD: 10 iterations (more development time)

5. **Monitor Performance**:
   ```bash
   npm run feedback:log
   ```

---

## Troubleshooting

### Dev Server Issues
```bash
# Check port 8080
lsof -i :8080

# Kill process
kill -9 <PID>
```

### Missing Baselines
```bash
npm run feedback:visual -- --update-baseline
```

### Flaky Tests
- Increase timeout in `playwright.config.ts`
- Add more wait conditions in tests
- Check for dynamic content

### TDD Loop Not Finding Tests
```bash
# Ensure test file path is correct
ls -la path/to/test.spec.ts

# Create template if needed
npm run feedback:tdd -- --create-test feature-name
```

---

## Documentation

- **Full Guide**: [../docs/FEEDBACK_LOOPS.md](../docs/FEEDBACK_LOOPS.md)
- **Quick Reference**: [../docs/FEEDBACK_LOOPS_QUICK_REFERENCE.md](../docs/FEEDBACK_LOOPS_QUICK_REFERENCE.md)
- **Main Documentation**: [../../Claude.md](../../Claude.md)

---

## Philosophy

**Traditional Development**:
```
Code → Manual Test → Debug → Hope
```

**With Feedback Loops**:
```
Code → Automated Verification → Clear Issues → Fix → Re-verify → Confidence ✅
```

**Result**: 2-3x better quality, faster iteration, fewer regressions.

---

*"Give Claude a way to verify its work = 2-3x better quality" - Boris*
