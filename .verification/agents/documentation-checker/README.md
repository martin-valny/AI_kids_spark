# Documentation Checker Agent

## Purpose

Automatically verifies that `CLAUDE.md` is kept up-to-date when architectural changes are made to the project.

## Why This Matters

`Claude.md` is the single source of truth for AI assistants working on this project. If it becomes stale:
- New AI sessions will have outdated context
- Design decisions and patterns won't be documented
- Refactoring status will be inaccurate
- Team members (human or AI) will be confused

This agent ensures documentation quality by catching outdated documentation **before** it causes problems.

## What It Checks

### 1. **Claude.md Exists**
- Verifies the file exists in repository root
- **Severity:** Error (blocks)

### 2. **Last Updated Date**
- Checks if "Last Updated" date is present
- Warns if >30 days old and significant commits were made
- **Severity:** Warning

### 3. **Refactoring Status Accuracy**
- Compares phase status (✅/⏸️/❌) with actual file existence
- Detects when Phase 1 is complete but marked as pending
- Detects when component library exists but Phase 3 is pending
- **Severity:** Warning

### 4. **Critical Sections Present**
- Ensures all required sections exist:
  - Project Overview
  - Architecture & Key Decisions
  - Project Structure
  - Development Workflow
  - Code Standards
  - Design System Usage
  - Testing Strategy
  - Refactoring Plan Status
- **Severity:** Error (blocks)

### 5. **New Components Documented**
- Checks if design system helper functions are documented
- Verifies file paths are mentioned
- **Severity:** Warning

### 6. **Recent Commits vs Updates**
- Analyzes last 10 commits for architectural keywords
- Warns if architectural changes were made but Claude.md wasn't updated
- Keywords: `feat:`, `refactor:`, `design system`, `pattern`, `phase`, etc.
- **Severity:** Warning

## Usage

### Standalone

```bash
# Run documentation check
node .verification/agents/documentation-checker/check-claude-md.js
```

### As part of npm scripts

```bash
# Quick check (skip documentation)
npm run verify:quick

# Full verification (includes documentation check)
npm run verify:full
```

### Exit Codes

- **0** - All checks passed (warnings allowed)
- **1** - Critical errors found (missing file, missing sections)

## Example Output

```
================================================================================
  📚 CLAUDE.MD DOCUMENTATION CHECKER
================================================================================

[Checking] CLAUDE.md exists...
  ✅ Passed
[Checking] Last Updated date...
  ✅ Passed
[Checking] Refactoring status accuracy...
  ⚠️  Phase 1 design system files exist, but CLAUDE.md may not reflect completion status
[Checking] Critical sections present...
  ✅ Passed
[Checking] New components documented...
  ✅ Passed
[Checking] Recent commits vs updates...
  ⚠️  3 architectural commits detected in last 10 commits, but CLAUDE.md hasn't been updated recently. Consider documenting changes.

================================================================================
  📊 DOCUMENTATION CHECK SUMMARY
================================================================================

⚠️  Warnings: 2
   • Phase 1 design system files exist, but CLAUDE.md may not reflect completion status
   • 3 architectural commits detected in last 10 commits, but CLAUDE.md hasn't been updated recently. Consider documenting changes.

────────────────────────────────────────────────────────────────────────────────

⚠️  Documentation check passed with warnings.
Consider updating CLAUDE.md to improve documentation quality.
```

## When It Runs

### Automatically:
- **Full verification** (`verify:full`) - Before PRs
- **GitHub Actions CI** - On every push to PR branches

### Not in:
- **Quick check** (`verify:quick`) - Too noisy for rapid iteration
- **Pre-commit hook** - Would slow down commits

## How to Fix Warnings

### "Last Updated date is old"
```markdown
**Last Updated:** 2026-01-08  ← Update this date
```

### "Phase status doesn't match files"
```markdown
### ✅ Phase 1: Design System Setup (COMPLETE)  ← Change ⏸️ to ✅
```

### "Architectural commits but no Claude.md update"
Update relevant sections:
- Add new components to "Component Patterns"
- Update "Refactoring Plan Status"
- Document new rules in "Code Standards"
- Update "Last Updated" date

### "Missing critical sections"
Ensure Claude.md has all required sections (see "What It Checks" above).

## Configuration

Checks are hardcoded but can be modified in `check-claude-md.js`:

```javascript
// Change staleness threshold (currently 30 days)
if (daysSinceUpdate > 30) { ... }

// Add more architectural keywords
const architecturalKeywords = [
  'feat:', 'refactor:', 'design system', 'pattern',
  // Add more...
];

// Add more required sections
const requiredSections = [
  '## 🎯 Project Overview',
  // Add more...
];
```

## Best Practices for AI Assistants

When making architectural changes:

1. ✅ **Update Claude.md in the same commit**
   ```bash
   git add src/design-system/tokens.ts Claude.md
   git commit -m "feat: Add new design tokens

   - Added spacing variants
   - Updated Claude.md with new token documentation"
   ```

2. ✅ **Update "Last Updated" date**
   ```markdown
   **Last Updated:** 2026-01-08  ← Today's date
   ```

3. ✅ **Mark phases complete when done**
   ```markdown
   ### ✅ Phase 3: Component Library (COMPLETE)
   - Created InnerCard.tsx
   - Created HighlightBox.tsx
   ...
   ```

4. ✅ **Document new patterns immediately**
   - New helper function? → Add to "Design System Usage"
   - New ESLint rule? → Add to "Code Standards"
   - New component? → Add to "Component Patterns"

## Integration with Workflows

The documentation checker is integrated into:

- `.verification/workflows/full-verification.js` - Full verification suite
- `.github/workflows/verification.yml` - CI/CD pipeline (optional)

It runs **after** code checks but **before** the final summary, ensuring documentation is verified as part of quality gates.

## Why Warnings Don't Block

Warnings are non-blocking because:
- Documentation lag is acceptable for 1-2 commits
- Prevents blocking legitimate work
- Encourages updates without forcing them
- AI assistants can batch documentation updates

**Errors** (missing file, missing critical sections) **do block** because these are critical for project continuity.

## Maintenance

This agent should be updated when:
- New critical sections are added to Claude.md
- Refactoring plan changes (new phases)
- Project structure changes significantly
- New documentation standards are established

---

**Remember:** Good documentation = Better AI assistance = Higher quality code!
