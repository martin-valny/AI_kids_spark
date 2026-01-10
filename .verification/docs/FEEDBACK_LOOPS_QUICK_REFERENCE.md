# Feedback Loops - Quick Reference

> **"Give Claude a way to verify its work = 2-3x better quality"** - Boris

## 🚀 Quick Commands

```bash
# List available loops
npm run feedback:list

# Browser Testing Loop
npm run feedback:browser

# Visual Comparison Loop
npm run feedback:visual -- --update-baseline  # Create baselines first
npm run feedback:visual                        # Then compare

# Test-Driven Development Loop
npm run feedback:tdd -- --create-test feature-name form
npm run feedback:tdd -- --test-file path/to/test.spec.ts

# Run All Loops
npm run feedback:all
npm run feedback:all -- --stop-on-failure

# View History
npm run feedback:log
```

---

## 🌐 Browser Testing Loop

**Purpose**: Validate UI functionality in browser

```bash
# Basic usage
npm run feedback:browser

# With options
npm run feedback:browser -- --test-suite interactive --max-iterations 10
```

**Test Suites**: `smoke`, `homepage`, `interactive`, `responsive`

**When to use**: After UI changes, before commits

---

## 📸 Visual Comparison Loop

**Purpose**: Ensure pixel-perfect design

```bash
# Create baselines (first time)
npm run feedback:visual -- --update-baseline

# Compare implementation
npm run feedback:visual

# Test specific pages
npm run feedback:visual -- --urls /,/lessons,/projects --threshold 0.5
```

**When to use**: Design implementation, visual regressions

---

## 🔴 Test-Driven Development Loop

**Purpose**: Drive implementation with tests

```bash
# Create test template
npm run feedback:tdd -- --create-test my-feature form

# Run TDD loop
npm run feedback:tdd -- --test-file path/to/test.spec.ts

# With watch mode
npm run feedback:tdd -- --test-file path/to/test.spec.ts --watch
```

**Templates**: `form`, `navigation`, `responsive`, `interaction`

**When to use**: New features, complex logic

---

## 📊 Decision Matrix

| Task | Loop | Command |
|------|------|---------|
| New feature | TDD | `npm run feedback:tdd` |
| UI bug fix | Browser | `npm run feedback:browser` |
| Design update | Visual | `npm run feedback:visual` |
| Refactoring | All | `npm run feedback:all` |
| Pre-commit | Browser (smoke) | `npm run feedback:browser -- --test-suite smoke` |

---

## 🔄 Typical Workflow

```bash
# 1. Create tests (TDD)
npm run feedback:tdd -- --create-test my-feature form
# Edit test file
npm run feedback:tdd -- --test-file .verification/templates/test-driven/my-feature.spec.ts

# 2. Implement feature
# ... write code ...

# 3. Verify functionality
npm run feedback:browser -- --test-suite interactive

# 4. Verify visuals
npm run feedback:visual

# 5. All pass? Commit!
git add .
git commit -m "Add my-feature"
```

---

## 🛠️ Common Options

### Browser Loop
- `--test-suite <name>`: smoke, homepage, interactive, responsive
- `--max-iterations <n>`: Default 5

### Visual Loop
- `--urls <list>`: Comma-separated URLs
- `--threshold <n>`: 0.1 = strict, 1.0 = lenient
- `--update-baseline`: Create/update baselines
- `--max-iterations <n>`: Default 5

### TDD Loop
- `--test-file <path>`: Required for running tests
- `--test-type <type>`: e2e, unit, integration
- `--max-iterations <n>`: Default 10
- `--watch`: Auto re-run on changes
- `--create-test <name> <type>`: Create template

### All Loops
- `--stop-on-failure`: Stop on first failure
- `--skip-tdd`: Skip TDD loop
- `--skip-browser`: Skip browser loop
- `--skip-visual`: Skip visual loop

---

## 📁 Output Locations

```
.verification/
├── reports/
│   ├── browser-testing-loop/
│   │   ├── iteration-*.json
│   │   ├── success-report.json
│   │   └── failure-report.json
│   ├── visual-comparison-loop/
│   │   ├── screenshots/
│   │   ├── iteration-*.json
│   │   └── success-report.json
│   ├── test-driven-loop/
│   │   ├── iteration-*.json
│   │   └── success-report.json
│   └── feedback-loops/
│       └── session-log.json
├── baselines/
│   └── *.png (visual baselines)
└── templates/
    └── test-driven/
        └── *.spec.ts (TDD templates)
```

---

## 🎯 Success Criteria

### Browser Loop
✅ All UI tests pass
✅ No console errors
✅ Interactions work across viewports

### Visual Loop
✅ Pixel difference < threshold
✅ All viewports match baselines
✅ No layout shifts

### TDD Loop
✅ All tests pass (GREEN)
✅ Code meets test specifications
✅ Ready for refactoring

---

## 🚨 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| Dev server won't start | Kill process on port 8080: `lsof -i :8080` |
| Missing baselines | Run with `--update-baseline` first |
| Visual false positives | Increase `--threshold` |
| TDD tests never pass | Check test expectations, increase iterations |
| Flaky browser tests | Add more wait time in tests |

---

## 📚 More Help

- Full Documentation: [FEEDBACK_LOOPS.md](./FEEDBACK_LOOPS.md)
- Main Guide: [Claude.md](../../Claude.md)
- Run `npm run feedback:list` for overview
- Run `npm run feedback:log` for history

---

**Remember**: "Give Claude a way to verify its work = 2-3x better quality" - Boris

Run feedback loops. Ship with confidence. 🚀
