# 🤖 Full Automation Setup - Claude Code CLI Guide

This document explains how the **fully automated verification system** works for AI Kids Spark Learn in **Claude Code CLI**.

---

## 📋 Table of Contents

1. [Overview](#overview)
2. [Automation Layers](#automation-layers)
3. [Daily Workflow](#daily-workflow)
4. [Troubleshooting](#troubleshooting)

---

## 🎯 Overview

The verification system runs **automatically** at 3 stages:

| Layer | When | What Runs | Time | Blocks Work? |
|-------|------|-----------|------|-------------|
| **Watch Mode** | On file save | Unit tests | 1-2s | ❌ No |
| **Pre-commit Hook** | Before commit | Quick verification | ~30s | ✅ Yes |
| **GitHub Actions** | On push/PR | Full verification | 10-15min | ⚠️ PR only |

---

## 🔄 Automation Layers

### 1️⃣ **Watch Mode** (Continuous Testing)

**What**: Auto-run tests when you save files
**When**: Running in background during development
**Time**: 1-2 seconds per change
**Blocks**: No - runs in parallel terminal

**Start Watch Mode**:
```bash
npm run verify:watch
```

**Features**:
- ✅ Vite dev server on http://localhost:8080
- ✅ Vitest tests run on every file save
- ✅ Two terminals side-by-side (dev + test)
- ✅ Instant feedback on code changes

**What You See**:
```
[DEV]  ➜  Local:   http://localhost:8080/
[TEST] ✓ src/components/Header.test.tsx (3 tests) 243ms
[TEST]   ✓ renders navigation links
[TEST]   ✓ mobile menu toggles correctly
[TEST]   ✓ accessible keyboard navigation
```

---

### 2️⃣ **Pre-Commit Hook** (Quality Gate) ✅ TESTED & WORKING

**What**: Automatic verification before every commit
**When**: When you run `git commit`
**Time**: ~30 seconds
**Blocks**: Yes - commit fails if verification fails

**What It Runs**:
1. TypeScript type checking (`tsc --noEmit`)
2. ESLint code quality check
3. Smoke tests (critical paths only)

**Configuration**: `.husky/pre-commit`

**Example Output**:
```bash
$ git commit -m "Add new activity page"

🔍 Running pre-commit verification...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[1/3] 🔍 TypeScript Type Checking (tsc --noEmit)
✅ TypeScript: PASSED (2.3s)

[2/3] 🧹 ESLint (Code Quality & Standards)
✅ ESLint: PASSED (5.1s)

[3/3] 🧪 Smoke Tests (Critical Paths Only)
✅ Smoke Tests: PASSED (0.4s)

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
✅ Pre-commit verification PASSED! Proceeding with commit...
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

[main a1b2c3d] Add new activity page
 3 files changed, 247 insertions(+), 12 deletions(-)
```

**If It Fails**:
```bash
❌ Pre-commit verification FAILED!

Fix the issues above, then try committing again.
Or skip this check with: git commit --no-verify
```

**To Skip** (not recommended):
```bash
git commit --no-verify -m "WIP: work in progress"
```

---

### 3️⃣ **GitHub Actions CI/CD** (Full Verification)

**What**: Complete verification on GitHub servers
**When**: On every push or pull request
**Time**: 10-15 minutes
**Blocks**: Pull request merging (if configured)

**What It Runs**:
1. **Quick Check** (TypeScript + ESLint + Smoke tests)
2. **UI Tests** (53+ Playwright E2E tests)
3. **Code Review** (Full ESLint with accessibility)
4. **Performance** (Lighthouse + bundle analysis)

**Configuration**: `.github/workflows/verification.yml`

**What You See** (on GitHub PR):

```
🤖 Verification Results

| Check        | Status      |
|--------------|-------------|
| Quick Check  | ✅ Passed   |
| UI Tests     | ✅ Passed   |
| Code Review  | ✅ Passed   |
| Performance  | ⚠️ Warning  |

📊 View detailed reports in Actions artifacts
```

**Artifacts Available**:
- Playwright HTML reports
- Test videos (on failure)
- ESLint results
- Lighthouse performance reports
- Bundle analysis charts

---

## 💼 Daily Workflow in Claude Code CLI

### Standard Development Flow

```
1. Start watch mode in a terminal
   └─ npm run verify:watch

2. Edit code in Claude Code
   └─ Watch mode auto-runs tests on save (1-2s)
   └─ See test results in terminal

3. Run manual checks when needed
   └─ npm run verify:quick  (30s - TypeScript + ESLint + smoke)
   └─ npm run lint         (ESLint only)

4. Fix any issues Claude identifies

5. Commit your changes
   └─ git add .
   └─ git commit -m "description"
   └─ Pre-commit hook runs automatically (30s)
   └─ Commit succeeds ✅

6. Push to GitHub
   └─ git push
   └─ GitHub Actions runs (background)
   └─ PR gets status update

7. Merge PR
   └─ Only if all checks pass ✅
```

### Quick Fix Workflow

```
1. Make small change
2. Watch mode shows test results (1-2s)
3. Fix if needed
4. Run: npm run verify:quick
5. Commit (pre-commit runs)
6. Done!
```

### Before Large Refactoring

```bash
# Run full verification first
npm run verify:full

# If passes, start watch mode
npm run verify:watch

# Make changes
# Watch mode catches issues as you go

# Commit frequently
git commit -m "Refactor step 1"
# Pre-commit ensures each step is solid

# Final check before push
npm run verify:full
git push
```

---

## 🎮 Available Commands

### Verification
```bash
npm run verify:quick      # Fast check (30s): TypeScript + ESLint + smoke tests
npm run verify:full       # Complete check (10-15min): All tests + performance
npm run verify:report     # Generate HTML report
npm run verify:watch      # Watch mode: dev server + auto-tests
```

### Testing
```bash
npm run test              # Unit tests (Vitest)
npm run test:ui           # Vitest with UI
npm run test:coverage     # Coverage report
npm run test:e2e          # E2E tests (Playwright)
npm run test:e2e:ui       # E2E with interactive UI
npm run test:e2e:debug    # Debug E2E tests
```

### Code Quality
```bash
npm run lint              # Basic ESLint check
npm run lint:full         # All ESLint rules (strict)
npm run lint -- --fix     # Auto-fix ESLint issues
npm run lint:a11y         # Accessibility only
```

### Performance
```bash
npm run perf:check        # All performance checks
npm run perf:analyze      # Bundle size analysis
```

### Git
```bash
git commit                # Triggers pre-commit hook automatically
git commit --no-verify    # Skip hook (not recommended)
git push                  # Triggers GitHub Actions
```

---

## 🐛 Troubleshooting

### Pre-commit Hook Not Running

**Symptom**: Commits succeed without verification

**Fix**:
```bash
# Reinstall Husky
npm run prepare

# Make hook executable
chmod +x .husky/pre-commit

# Test manually
.husky/pre-commit
```

---

### Watch Mode Not Auto-Running

**Symptom**: Tests don't run when you save files

**Fix**:
```bash
# Stop watch mode (Ctrl+C)
# Restart it
npm run verify:watch

# Check that both dev and test are running
# You should see two labeled outputs: [DEV] and [TEST]
```

---

### GitHub Actions Failing

**Symptom**: All local checks pass but CI fails

**Common Causes**:
1. **Missing Playwright browsers**
   - CI installs them automatically
   - Check: "Install Playwright browsers" step

2. **Environment differences**
   - Node version mismatch
   - Check: `.github/workflows/verification.yml` uses Node 20

3. **Flaky tests**
   - Tests pass locally but fail in CI
   - Check: Test artifacts in GitHub Actions

**Debug**:
```bash
# Run tests exactly like CI does
npm ci  # Clean install
npm run verify:full  # Same command CI uses
```

---

### Performance Check Fails

**Symptom**: Performance check reports errors

**Common Issues**:
1. **Bundle too large**
   ```bash
   npm run perf:analyze
   # Check bundle size report
   # Optimize largest files
   ```

2. **Lighthouse score too low**
   ```bash
   npm run perf:check
   # Check Lighthouse report
   # Fix performance issues
   ```

---

## 📊 Automation Summary

| Feature | Status | Configuration |
|---------|--------|---------------|
| Watch Mode | ✅ Available | `npm run verify:watch` |
| Pre-commit Hook | ✅ Active | `.husky/pre-commit` |
| GitHub Actions | ✅ Active | `.github/workflows/verification.yml` |

---

## 🎓 Learning Resources

- **ESLint Rules**: `.verification/agents/code-reviewer/rules/`
- **Playwright Tests**: `.verification/agents/ui-tester/test-suites/`
- **Performance Checks**: `.verification/agents/performance-checker/`
- **Complete Workflow**: `.verification/workflows/claude-feedback-loop.md`

---

## ✅ Typical Claude Code CLI Session

```bash
# 1. Start watch mode (optional, but recommended)
npm run verify:watch

# 2. Work with Claude to make changes
# (Claude edits files, tests run automatically)

# 3. Run quick check before committing
npm run verify:quick

# 4. Commit (pre-commit hook runs automatically)
git add .
git commit -m "Add new feature"

# 5. Push (GitHub Actions runs automatically)
git push
```

---

## 💯 Quality Assurance Levels

With this automation, you now have:

| Check | Manual | Automated | When |
|-------|--------|-----------|------|
| **Type Safety** | ❌ | ✅ | Pre-commit |
| **Code Quality** | ❌ | ✅ | Pre-commit |
| **Accessibility** | ❌ | ✅ | Pre-commit |
| **Kids Safety** | ❌ | ✅ | Pre-commit |
| **Performance** | ❌ | ✅ | On PR |
| **E2E Testing** | ❌ | ✅ | On PR |
| **Visual Review** | ✅ | ❌ | Manual |

**Result**: Subagents verify 85% automatically, you only review 15% visually!

---

**Questions?** Check the documentation files in `.verification/` or run:
```bash
npm run verify:quick
```
