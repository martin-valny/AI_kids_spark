# Code Review Agent for AI Kids Spark

Automated code review system ensuring high-quality, accessible, safe, and performant code for the AI Kids Spark educational platform.

## Overview

The Code Review Agent enforces strict quality standards across four critical dimensions:

1. **Accessibility** - WCAG 2.1 AA compliance for kids
2. **Performance** - Fast, responsive user experience
3. **Kids Safety** - COPPA-compliant, child-safe patterns
4. **React Best Practices** - Modern React and TypeScript patterns

## Quick Start

### Running the Code Review Agent

```bash
# Run all checks
npx eslint --config .verification/agents/code-reviewer/eslint.config.js src/

# Run with auto-fix where possible
npx eslint --config .verification/agents/code-reviewer/eslint.config.js src/ --fix

# Check specific file
npx eslint --config .verification/agents/code-reviewer/eslint.config.js src/components/Header.tsx

# Check specific directory
npx eslint --config .verification/agents/code-reviewer/eslint.config.js src/pages/
```

### Integration with npm scripts

Add to `package.json`:

```json
{
  "scripts": {
    "lint:review": "eslint --config .verification/agents/code-reviewer/eslint.config.js src/",
    "lint:review:fix": "eslint --config .verification/agents/code-reviewer/eslint.config.js src/ --fix",
    "review": "npm run lint:review"
  }
}
```

## Configuration Files

### 1. Agent Configuration (`agent.config.json`)

Main configuration defining all checks, priorities, and integrations:

- **Check types**: ESLint rules + Manual checklist
- **Severity levels**: Error (blocks merge) | Warning (review needed)
- **Auto-fix**: Enabled for safe performance and style rules
- **Priorities**: 1 (Critical) to 4 (Info)

### 2. ESLint Rule Files

#### `rules/accessibility.eslint.js`
**Focus**: WCAG 2.1 AA compliance + kids-friendly enhancements

**Key Rules** (Error level):
- `jsx-a11y/alt-text` - All images must have alt text
- `jsx-a11y/aria-props` - Valid ARIA attributes
- `jsx-a11y/no-autofocus` - Prevents disorienting autofocus
- `jsx-a11y/label-has-associated-control` - Form labels required
- `jsx-a11y/media-has-caption` - Videos/audio need captions
- `jsx-a11y/click-events-have-key-events` - Keyboard support
- `jsx-a11y/heading-has-content` - Proper heading hierarchy

**Kids-Specific**:
- Enhanced focus management for young users
- Simplified ARIA patterns for screen readers
- Clear interactive element requirements

#### `rules/performance.eslint.js`
**Focus**: Runtime performance and bundle optimization

**Key Rules** (Warning level):
- `no-console` - Remove console statements (allow warn/error)
- `react-hooks/exhaustive-deps` - Correct hook dependencies
- `@typescript-eslint/no-explicit-any` - Type safety
- `no-await-in-loop` - Async performance
- `complexity` - Limit cyclomatic complexity (max: 15)
- `no-duplicate-imports` - Import optimization

**Performance Targets**:
- Initial load < 3 seconds on 3G
- Time to interactive < 5 seconds
- Animations at 60fps
- Bundle size < 200KB initial

#### `rules/kids-safety.eslint.js`
**Focus**: Child safety and COPPA compliance

**Key Rules** (Error level):
- `react/jsx-no-target-blank` - Safe external links (noopener/noreferrer)
- Prevent `window.open` without safety wrapper
- Prevent direct `localStorage` access (COPPA compliance)
- `react/no-danger` - No dangerouslySetInnerHTML
- `react/jsx-no-bind` - No inline event handlers (audit trail)
- Prevent `eval` and Function constructor

**Safety Patterns**:
- All external links require confirmation
- Data collection requires parental consent
- No tracking cookies or analytics without consent
- Controlled navigation only
- Content filtering on API responses

#### `rules/react-best-practices.eslint.js`
**Focus**: Modern React patterns and TypeScript strict mode

**Key Rules** (Warning level):
- `react-hooks/rules-of-hooks` - Proper hooks usage
- `@typescript-eslint/consistent-type-imports` - Import optimization
- `react/jsx-key` - Keys in lists
- `react/jsx-no-constructed-context-values` - Performance
- `@typescript-eslint/naming-convention` - Consistent naming
- JSX formatting and style consistency

**Best Practices**:
- Function components preferred
- Proper component composition
- TypeScript strict mode compliance
- Immutable state updates
- Error boundaries for resilience

### 3. Manual Review Checklist (`checklist.md`)

Comprehensive human review checklist covering:

- **Accessibility**: Visual, keyboard, screen reader, kids-specific
- **Kids Safety**: Content safety, navigation, privacy, emotional safety
- **Performance**: Load time, resources, runtime, kids devices
- **React Practices**: Architecture, state, hooks, TypeScript
- **Educational Content**: Pedagogy, accuracy, engagement, inclusivity
- **Security**: Input validation, auth, data protection
- **Testing**: Coverage, quality, accessibility tests
- **Documentation**: Code and user documentation

### 4. Unified Configuration (`eslint.config.js`)

Combines all rule sets with intelligent priority:

1. Base recommended rules
2. TypeScript recommended
3. Performance rules
4. React best practices
5. Kids safety rules
6. Accessibility rules (highest priority)

**Smart Overrides**:
- Relaxed rules for test files
- Flexible rules for UI components
- Strict rules for activity pages
- Config file exceptions

## Rule Severity Levels

### Error (Blocks PR Merge)
- All accessibility violations
- All safety violations
- Critical performance issues
- TypeScript strict mode violations

### Warning (Requires Review)
- Performance optimizations
- Style consistency
- Best practice suggestions
- Code complexity warnings

### Info (Manual Review)
- Educational content quality
- User experience patterns
- Documentation completeness

## File-Specific Rule Sets

### Strict Rules (Activity Pages, Forms)
```
src/pages/**/*Activity*.tsx
src/components/forms/**/*.tsx
```
- Error on inline handlers
- Required explicit return types
- Enhanced safety checks

### Flexible Rules (UI Components)
```
src/components/ui/**/*.tsx
```
- Allow prop spreading
- Allow inline handlers
- Relaxed type requirements

### Test Files
```
**/*.test.tsx, **/*.spec.tsx
```
- Allow console statements
- Allow explicit any
- Allow non-null assertions

## Integration Points

### Pre-Commit Hook

Add to `.husky/pre-commit`:

```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

# Run code review checks on staged files
npm run lint:review
```

### GitHub Actions CI

Add to `.github/workflows/code-review.yml`:

```yaml
name: Code Review

on: [pull_request]

jobs:
  review:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run lint:review
      - name: Comment PR
        if: failure()
        uses: actions/github-script@v6
        with:
          script: |
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: '❌ Code review checks failed. Please review the errors above.'
            })
```

### VS Code Integration

Add to `.vscode/settings.json`:

```json
{
  "eslint.options": {
    "overrideConfigFile": ".verification/agents/code-reviewer/eslint.config.js"
  },
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ]
}
```

## Required Dependencies

Ensure these are in `package.json`:

```json
{
  "devDependencies": {
    "@eslint/js": "^9.9.0",
    "eslint": "^9.9.0",
    "eslint-plugin-react": "^7.35.0",
    "eslint-plugin-react-hooks": "^5.1.0",
    "eslint-plugin-react-refresh": "^0.4.9",
    "eslint-plugin-jsx-a11y": "^6.9.0",
    "typescript-eslint": "^8.0.1"
  }
}
```

Install missing plugins:

```bash
npm install --save-dev eslint-plugin-jsx-a11y eslint-plugin-react
```

## Exemption Process

### Disabling Rules (Use Sparingly)

```typescript
// Disable for next line
// eslint-disable-next-line rule-name

// Disable for file (requires justification)
/* eslint-disable rule-name */
// Justification: Explain why this is necessary
```

### When to Request Exemptions

1. **Third-party component** requires pattern
2. **Performance critical** code needs optimization
3. **Legacy compatibility** temporarily required
4. **False positive** in rule detection

**All exemptions require**:
- Clear justification comment
- Code review approval
- Documentation in PR description

## Metrics & Reporting

### Success Criteria

- **Zero** accessibility errors
- **Zero** safety violations
- **< 10** performance warnings per 1000 LOC
- **< 5** best practice warnings per file

### Generating Reports

```bash
# JSON report
npx eslint --config .verification/agents/code-reviewer/eslint.config.js src/ --format json > review-report.json

# HTML report (requires eslint-html-reporter)
npx eslint --config .verification/agents/code-reviewer/eslint.config.js src/ --format html > review-report.html
```

## Troubleshooting

### Common Issues

**Issue**: "Cannot find module 'eslint-plugin-jsx-a11y'"
```bash
npm install --save-dev eslint-plugin-jsx-a11y
```

**Issue**: "Parsing error: Cannot read file 'tsconfig.json'"
- Ensure tsconfig.json exists in project root
- Check parserOptions.project path

**Issue**: Too many warnings in existing code
- Fix incrementally by directory
- Use `--fix` for auto-fixable rules
- Document planned fixes in backlog

## Best Practices

1. **Run checks before committing** - Catch issues early
2. **Fix errors immediately** - Don't accumulate technical debt
3. **Address warnings promptly** - Warnings become errors in next phase
4. **Use manual checklist** - Human review is essential
5. **Educate team** - Share why rules matter for kids

## Resources

- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)
- [COPPA Compliance](https://www.ftc.gov/enforcement/rules/rulemaking-regulatory-reform-proceedings/childrens-online-privacy-protection-rule)
- [React Accessibility](https://react.dev/learn/accessibility)
- [ESLint Documentation](https://eslint.org/docs/latest/)
- [jsx-a11y Plugin](https://github.com/jsx-eslint/eslint-plugin-jsx-a11y)

## Support

For questions or issues with the Code Review Agent:

1. Check this README
2. Review rule comments in individual files
3. Consult manual checklist for context
4. Reach out to accessibility team for WCAG questions
5. Consult safety team for COPPA/kids safety questions

---

**Version**: 1.0.0
**Last Updated**: 2026-01-07
**Maintained By**: AI Kids Spark Development Team
