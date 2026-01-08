# Claude Self-Verification Feedback Loop

This document describes the self-verification workflow for Claude when making changes to the AI Kids Spark codebase. Following this workflow ensures code quality, catches issues early, and enables rapid iteration with confidence.

## Overview

The verification system has two workflows designed for different stages of development:

1. **Quick Check** - Fast feedback during active development (~30 seconds)
2. **Full Verification** - Comprehensive validation before commits (~10-15 minutes)

## The Self-Healing Development Pattern

```
┌─────────────────────────────────────────────────────────────┐
│                    DEVELOPMENT CYCLE                         │
└─────────────────────────────────────────────────────────────┘
            │
            ▼
    ┌───────────────┐
    │ Make Changes  │
    └───────┬───────┘
            │
            ▼
    ┌───────────────┐
    │  Quick Check  │ ◄──────────┐
    └───────┬───────┘            │
            │                    │
            ▼                    │
       ┌─────────┐               │
       │ Passed? │──────No───────┘
       └────┬────┘          (Fix & Retry)
            │
           Yes
            │
            ▼
    ┌───────────────┐
    │   Continue    │
    │  Development  │
    │      OR       │
    │ Full Verify   │
    └───────┬───────┘
            │
            ▼
    ┌───────────────┐
    │     Full      │
    │ Verification  │
    └───────┬───────┘
            │
            ▼
       ┌─────────┐
       │ Passed? │──────No────┐
       └────┬────┘            │
            │                 │
           Yes                ▼
            │          ┌──────────────┐
            │          │ Review Issues│
            │          │  Fix & Retry │
            │          └──────────────┘
            ▼
    ┌───────────────┐
    │  Commit &     │
    │     Done      │
    └───────────────┘
```

## Step-by-Step Workflow

### Phase 1: Active Development (Quick Iterations)

When making changes to code, use the **Quick Check** for rapid feedback.

#### Commands for Quick Check

```bash
# Run quick check
node .verification/workflows/quick-check.js

# Or add as npm script and use:
npm run verify:quick
```

#### What Quick Check Does

1. **TypeScript Type Checking** (`tsc --noEmit`)
   - Validates TypeScript types
   - Catches type errors early
   - No build artifacts generated

2. **ESLint** (`npm run lint`)
   - Enforces code quality standards
   - Checks accessibility patterns
   - Validates React best practices
   - Ensures kids-safety rules

3. **Smoke Tests** (if configured)
   - Runs critical path tests only
   - Fast validation of core functionality
   - Skipped if no test:smoke script exists

#### When to Use Quick Check

- After making code changes
- Before switching tasks
- During active development sessions
- When you want fast feedback (~30 seconds)

#### If Quick Check Fails

1. **Read the error messages carefully**
   - TypeScript errors show type mismatches
   - ESLint errors show rule violations
   - Test failures show broken functionality

2. **Fix the issues**
   - Address TypeScript type errors
   - Fix ESLint violations
   - Update failing tests

3. **Re-run Quick Check**
   ```bash
   node .verification/workflows/quick-check.js
   ```

4. **Iterate until it passes**

### Phase 2: Pre-Commit Validation (Full Verification)

Before committing code, run **Full Verification** to ensure all quality gates pass.

#### Commands for Full Verification

```bash
# Run full verification
node .verification/workflows/full-verification.js

# Or add as npm script and use:
npm run verify:full
```

#### What Full Verification Does

Runs three specialized agents sequentially:

1. **UI Tester Agent** (Critical)
   - Component rendering tests
   - Accessibility validation (WCAG 2.1 AA)
   - User interaction flows
   - Visual regression checks
   - Kids-friendly UI patterns

2. **Code Reviewer Agent** (Critical)
   - In-depth code quality analysis
   - Security vulnerability scanning
   - Performance optimization checks
   - Architecture pattern validation
   - Documentation completeness

3. **Performance Checker Agent** (Non-Critical Warning)
   - Lighthouse performance audit
   - Web Vitals monitoring (LCP, FID, CLS)
   - Bundle size validation
   - Resource optimization checks
   - Mobile performance testing

#### Critical vs Non-Critical Failures

- **Critical Failures**: UI Tester or Code Reviewer failures stop the workflow
- **Non-Critical Warnings**: Performance issues are logged but don't block commits
- Exit codes: 0 = success, 1 = critical failure

#### When to Use Full Verification

- Before committing code
- Before creating pull requests
- After completing a feature
- Before merging to main branch
- When making significant changes

#### If Full Verification Fails

1. **Identify which agent failed**
   - Check the console output for failure details
   - Review the specific error messages

2. **Review the detailed reports**
   ```bash
   # Reports are saved to:
   .verification/reports/latest/

   # View the HTML report:
   open .verification/reports/latest/index.html
   ```

3. **Fix the issues**
   - UI Tester failures: Fix component tests, accessibility issues
   - Code Reviewer failures: Address code quality, security issues
   - Performance warnings: Optimize as needed (non-blocking)

4. **Run Quick Check to verify fixes**
   ```bash
   node .verification/workflows/quick-check.js
   ```

5. **Re-run Full Verification**
   ```bash
   node .verification/workflows/full-verification.js
   ```

### Phase 3: Review Reports and Iterate

After running Full Verification, review the generated reports:

#### Report Locations

```
.verification/reports/
├── latest/
│   ├── index.html              # Aggregated HTML report
│   ├── verification-summary.json
│   ├── ui-tester-results.json
│   ├── code-review-results.json
│   └── performance-results.json
├── ui-tester/
├── code-reviewer/
└── performance/
```

#### Report Analysis

1. **Open the aggregated report**
   ```bash
   open .verification/reports/latest/index.html
   ```

2. **Review each section**
   - Overall pass/fail status
   - Individual agent results
   - Metrics and trends
   - Actionable recommendations

3. **Prioritize fixes**
   - Critical issues first (blocking)
   - High-impact warnings second
   - Performance optimizations last

## Claude-Specific Instructions

When Claude makes changes to the codebase, follow this protocol:

### 1. After Making Changes

```bash
# Immediately run quick check
node .verification/workflows/quick-check.js
```

### 2. If Quick Check Fails

- Analyze the error output
- Make targeted fixes
- Re-run quick check
- Repeat until passing

### 3. Before Completing Task

```bash
# Run full verification
node .verification/workflows/full-verification.js
```

### 4. If Full Verification Fails

- Read the specific agent that failed
- Review error details in console output
- Check generated reports if available
- Make necessary fixes
- Run quick check to verify fixes
- Re-run full verification

### 5. Success Criteria

- Quick Check: All 3 checks pass (TypeScript, ESLint, Smoke Tests)
- Full Verification: All critical agents pass (UI Tester, Code Reviewer)
- Performance warnings are acceptable (non-blocking)

## Self-Healing Patterns

### Automatic Fix Attempts

Some issues can be auto-fixed:

```bash
# Auto-fix ESLint issues
npm run lint -- --fix

# Auto-format code
npm run format  # (if configured)
```

### Common Issues and Solutions

#### TypeScript Errors

```bash
# Issue: Type errors
# Solution: Add proper type annotations

// Before
const data = fetchData();  // implicit any

// After
const data: UserData = fetchData();
```

#### ESLint Violations

```bash
# Issue: Missing accessibility props
# Solution: Add required ARIA attributes

// Before
<button onClick={handleClick}>Click</button>

// After
<button onClick={handleClick} aria-label="Submit form">
  Click
</button>
```

#### Test Failures

```bash
# Issue: Component test fails
# Solution: Update test snapshots or fix component

npm run test:update-snapshots  # (if applicable)
```

## Integration with Git Workflow

### Pre-Commit Hook (Recommended)

Add to `.git/hooks/pre-commit`:

```bash
#!/bin/bash
echo "Running quick check before commit..."
node .verification/workflows/quick-check.js

if [ $? -ne 0 ]; then
  echo "❌ Quick check failed. Commit aborted."
  echo "Fix issues and try again."
  exit 1
fi
```

### Pre-Push Hook (Optional)

Add to `.git/hooks/pre-push`:

```bash
#!/bin/bash
echo "Running full verification before push..."
node .verification/workflows/full-verification.js

if [ $? -ne 0 ]; then
  echo "❌ Full verification failed. Push aborted."
  echo "Fix critical issues and try again."
  exit 1
fi
```

## Performance Tips

### Speed Up Quick Check

- Keep smoke tests minimal (< 5 tests)
- Use `--noEmit` for TypeScript (no build)
- Cache ESLint results when possible

### Parallel Execution (Advanced)

For faster feedback, run checks in parallel:

```bash
# Run all checks simultaneously
(npx tsc --noEmit &) && (npm run lint &) && (npm run test:smoke &)
wait
```

## Continuous Improvement

The verification system learns and adapts:

1. **Metrics Tracking**: All runs are logged with timestamps and durations
2. **Historical Analysis**: Compare current run with previous runs
3. **Threshold Adjustments**: Performance budgets can be tuned over time
4. **Rule Refinement**: ESLint rules evolve based on common issues

## Summary

**Quick Check** = Fast feedback during development (30s)
**Full Verification** = Comprehensive validation before commits (10-15min)

**Always**:
- Run Quick Check after making changes
- Fix issues immediately
- Run Full Verification before committing
- Review reports and iterate
- Only commit when all critical checks pass

This workflow ensures high code quality while maintaining rapid development velocity.
