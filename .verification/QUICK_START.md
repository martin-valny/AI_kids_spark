# Quick Start Guide - Automation Workflows

Welcome! This guide will get you started with the verification workflows in under 2 minutes.

## TL;DR - Commands You Need

```bash
# Fast feedback during development (30 seconds)
npm run verify:quick

# Full validation before committing (10-15 minutes)
npm run verify:full

# Generate HTML report from results
npm run verify:report

# View the report
open .verification/reports/latest/index.html
```

## Your Workflow

### 1. During Development - Use Quick Check

After making code changes:

```bash
npm run verify:quick
```

This runs:
- TypeScript type checking
- ESLint
- Smoke tests (if configured)

**If it passes**: Continue coding
**If it fails**: Fix the issues and re-run

### 2. Before Committing - Use Full Verification

Before running `git commit`:

```bash
npm run verify:full
```

This runs all 3 agents:
1. UI Tester (accessibility, component tests)
2. Code Reviewer (code quality, security)
3. Performance Checker (Lighthouse, bundle size)

**Then review the report**:
```bash
open .verification/reports/latest/index.html
```

**Only commit if all critical checks pass!**

## What Each File Does

### Workflows
- `full-verification.js` - Runs all 3 agents, generates report
- `quick-check.js` - Fast TypeScript + ESLint + tests check
- `claude-feedback-loop.md` - Documentation for Claude/AI workflows

### Scripts
- `generate-report.js` - Creates beautiful HTML report

### Test Utils
- `render-with-providers.tsx` - Test wrapper with React Query, Router
- `mock-supabase.ts` - Mock Supabase client for tests
- `test-data.ts` - Test fixtures (activities, lessons, users)
- `index.ts` - Central export point

## Testing in Your Code

```typescript
// Import test utilities
import { render, screen, mockSupabase, mockActivities } from '@/test-utils';

// Write a test
test('displays activity', () => {
  const activity = mockActivities[0];
  render(<ActivityCard activity={activity} />);
  expect(screen.getByText(activity.title)).toBeInTheDocument();
});
```

## Integration Points

```
Your Code Changes
      ↓
Quick Check (30s) ← Run frequently
      ↓
[Pass?] Yes → Continue coding
        No → Fix & retry
      ↓
Ready to commit?
      ↓
Full Verification (10-15min) ← Run before commit
      ↓
[All Critical Pass?] Yes → Commit & push
                    No → Review report & fix
```

## Exit Codes

- `0` = All checks passed
- `1` = Critical failure (must fix)

## File Locations

```
.verification/
├── workflows/
│   ├── full-verification.js      ← Run this before commits
│   ├── quick-check.js             ← Run this after changes
│   └── claude-feedback-loop.md    ← Read this for workflow details
├── scripts/
│   └── generate-report.js         ← Generates HTML report
└── reports/
    └── latest/
        └── index.html             ← Open this to see results

src/test-utils/
├── index.ts                       ← Import from '@/test-utils'
├── render-with-providers.tsx      ← Test render wrapper
├── mock-supabase.ts               ← Mock database
├── test-data.ts                   ← Test fixtures
└── README.md                      ← Detailed documentation
```

## Next Steps

1. Try running quick check now:
   ```bash
   npm run verify:quick
   ```

2. Read the detailed documentation:
   - Workflow details: `.verification/workflows/claude-feedback-loop.md`
   - Complete summary: `.verification/WORKFLOWS_SUMMARY.md`
   - Test utilities: `src/test-utils/README.md`

3. Integrate into your git workflow (optional):
   ```bash
   # Add to .git/hooks/pre-commit
   #!/bin/bash
   npm run verify:quick || exit 1
   ```

## Help & Troubleshooting

### Quick Check Fails
- Read the error messages
- Fix TypeScript errors first
- Run `npm run lint -- --fix` for auto-fixable issues
- Re-run `npm run verify:quick`

### Full Verification Fails
- Check which agent failed
- Run `npm run verify:report` to see detailed HTML report
- Fix critical issues first
- Re-run `npm run verify:full`

### Need More Details?
- Full documentation: `.verification/WORKFLOWS_SUMMARY.md`
- Test utilities guide: `src/test-utils/README.md`
- Claude workflow: `.verification/workflows/claude-feedback-loop.md`

## That's It!

You now have a complete automation system for:
- Fast feedback during development
- Comprehensive validation before commits
- Beautiful HTML reports
- Complete test infrastructure

Start with `npm run verify:quick` and go from there!
