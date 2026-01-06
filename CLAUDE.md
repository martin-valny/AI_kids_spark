# My Universal Coding Principles

**Version:** 1.0.0
**Last Updated:** 2026-01-06

These rules apply to ALL my projects unless explicitly overridden.

---

## Transparency Rule

**When any feature request, explanation, or refactoring is caused by or relates to these coding principles, always mention it explicitly.**

Examples:
- "I'm splitting this function because it exceeds the 50-line limit from your coding principles."
- "Per your coding principles, I'm adding input validation here."
- "This refactor addresses the 'no deeply nested conditionals' rule from your standards."

This helps you understand WHY changes are being made and learn which rules are being applied.

---

## Core Philosophy

### Always Think Before Coding
1. Understand the problem fully
2. Research existing solutions
3. Plan the approach
4. Only then implement

### Write Code for Humans First
- Code is read 10x more than written
- Clarity > Cleverness
- Self-documenting code with good names
- Comments explain WHY, not WHAT

### Quality Over Speed
- Broken fast code is useless
- Take time to do it right
- Test as you go
- Refactor when needed

---

## Universal Code Standards

### Naming Conventions
**Variables & Functions:**
- camelCase for JavaScript/TypeScript
- snake_case for Python
- Descriptive names (no single letters except i, j, k in loops)
- Boolean variables start with `is`, `has`, `should`

**Constants:**
- SCREAMING_SNAKE_CASE
- Group related constants

**Files:**
- kebab-case for files
- Match component/class name
- One main export per file

### Function Guidelines
- **Maximum 50 lines** - if longer, split it up
- **Single responsibility** - do one thing well
- **Maximum 3-4 parameters** - use objects for more
- **Return early** - avoid deep nesting
- **Pure functions** when possible

### File Organization
- **Maximum 300 lines** per file
- Group related functions
- Logical import order:
  1. External dependencies
  2. Internal utilities
  3. Components
  4. Types/Interfaces
  5. Styles

### Comments & Documentation
**Always document:**
- Complex algorithms
- Non-obvious decisions
- Workarounds and why they exist
- Public APIs
- Regular expressions

**Don't document:**
- Obvious code
- What the code does (name should tell that)

**Format:**
- JSDoc for JavaScript/TypeScript
- Docstrings for Python
- Inline comments for complex logic

---

## Testing Philosophy

### Test Coverage Targets
- Minimum 80% overall coverage
- Minimum 90% for critical paths
- 100% for security-related code

### What to Test
**Always test:**
- Happy paths
- Error conditions
- Edge cases
- Boundary conditions
- User inputs

**Test types:**
- **Unit tests:** Individual functions
- **Integration tests:** Component interactions
- **E2E tests:** Critical user flows

### Test Quality
- One assertion per test (generally)
- Descriptive test names: `should [expected behavior] when [condition]`
- Arrange-Act-Assert pattern
- No logic in tests
- Mock external dependencies
- Fast tests (<100ms for unit tests)

---

## Security Best Practices

### Never Commit
- API keys or secrets
- Passwords
- Private keys
- Database credentials
- Access tokens

**Use:** Environment variables, secret managers, or config files (.gitignored)

### Always Validate
- User input (client AND server)
- File uploads (type, size, content)
- URLs before redirecting
- API responses

### Always Sanitize
- SQL queries (use parameterized queries)
- HTML output (prevent XSS)
- User-generated content
- File paths

### Authentication & Authorization
- Never trust client-side validation
- Always verify on server
- Use established libraries (don't roll your own)
- Implement rate limiting
- Log security events

---

## Accessibility Requirements

### Always Include
- Semantic HTML elements
- Alt text for images
- ARIA labels for custom controls
- Keyboard navigation support
- Focus indicators
- Skip to content links

### Test For
- Screen reader compatibility
- Keyboard-only navigation
- Color contrast (WCAG AA minimum)
- Text scaling to 200%
- No motion for users who request it

---

## Performance Standards

### Loading Performance
- First Contentful Paint < 1.8s
- Time to Interactive < 3.8s
- Largest Contentful Paint < 2.5s

### Code Performance
- Debounce user inputs
- Lazy load below-the-fold content
- Optimize images (WebP, proper sizing)
- Bundle splitting for large apps
- Minimize re-renders (React)

### Database Performance
- Index frequently queried fields
- Use pagination for large datasets
- Avoid N+1 queries
- Cache when appropriate

---

## Error Handling

### Always Handle Errors
- Try-catch for all async operations
- Validate function inputs
- Graceful degradation
- User-friendly error messages
- Log errors with context

### Error Messages
**For Users:**
- Clear, non-technical language
- What went wrong
- What they can do about it

**For Developers:**
- Full error details
- Stack trace
- Context (user, time, data)
- How to reproduce

---

## Git Workflow

### Commit Messages
Format: `<type>(<scope>): <subject>`

**Types:**
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation only
- `style:` Formatting, no code change
- `refactor:` Code change that neither fixes bug nor adds feature
- `test:` Adding tests
- `chore:` Maintenance tasks

**Rules:**
- Present tense ("add" not "added")
- Lowercase subject
- No period at end
- Max 50 characters for subject
- Wrap body at 72 characters

### Branch Naming
- `feature/description` - New features
- `fix/description` - Bug fixes
- `refactor/description` - Code refactoring
- `docs/description` - Documentation
- `test/description` - Test additions

### Before Committing
1. Run linter
2. Run tests
3. Review changes (`git diff`)
4. Update documentation if needed
5. Write clear commit message

---

## Working with AI (Claude Code)

### Always Use Plan Mode First
- For any feature > 100 lines
- For unfamiliar code areas
- For architectural decisions
- When multiple approaches exist

### Break Down Large Changes
- Maximum 300 lines per implementation
- One component/module at a time
- Test incrementally
- Commit frequently

### When to Use Subagents
- **Code review:** After any implementation
- **Security audit:** Before production
- **Performance check:** For critical paths
- **Documentation:** For public APIs

### Provide Context
- Explain the "why" not just the "what"
- Share relevant background
- Point to similar existing code
- Mention constraints or requirements

---

## Responsive Design

### Mobile-First Approach
1. Design for mobile
2. Enhance for tablet
3. Optimize for desktop

### Breakpoints (Tailwind style)
- `sm:` 640px - Small tablets
- `md:` 768px - Tablets
- `lg:` 1024px - Laptops
- `xl:` 1280px - Desktops
- `2xl:` 1536px - Large screens

### Test On
- iPhone SE (small mobile)
- iPhone 14 (standard mobile)
- iPad (tablet)
- 1920x1080 (desktop)

---

## Code Review Checklist

Before submitting code:
- [ ] Follows naming conventions
- [ ] Functions < 50 lines
- [ ] Files < 300 lines
- [ ] Has tests with good coverage
- [ ] No console.logs or debugger statements
- [ ] No commented-out code
- [ ] No TODOs (or create issues for them)
- [ ] Documentation updated
- [ ] No linting errors
- [ ] All tests pass
- [ ] No security vulnerabilities
- [ ] Accessible (keyboard, screen reader)
- [ ] Mobile responsive
- [ ] Handles errors gracefully

---

## Code Smells to Avoid

### Complexity
- Deeply nested conditionals (>3 levels)
- Long functions (>50 lines)
- God objects (classes doing too much)
- Tight coupling

### Duplication
- Copy-pasted code
- Similar functions with slight variations
- Repeated logic

### Naming
- Generic names (data, temp, value)
- Abbreviations (unless standard)
- Inconsistent naming

### Others
- Magic numbers (use named constants)
- Side effects in functions
- Mutable shared state
- Premature optimization

---

## When to Refactor

Refactor when you see:
- Same code in 3+ places
- Function > 50 lines
- File > 300 lines
- Complex nested conditionals
- Hard to understand code
- Adding feature becomes difficult

**Red-Green-Refactor:**
1. Make tests pass (Red -> Green)
2. Make code clean (Refactor)
3. Repeat

---

## Code Style Preferences

### JavaScript/TypeScript
- Use `const` by default, `let` when needed, never `var`
- Arrow functions for callbacks
- Template literals over string concatenation
- Destructuring when appropriate
- Optional chaining (`?.`) for nullable values
- Nullish coalescing (`??`) over `||`

### Python
- Type hints for function signatures
- List comprehensions for simple transformations
- Context managers for resources
- f-strings for formatting

### General
- Early returns over nested ifs
- Guard clauses at function start
- Positive conditionals when possible
- Explicit over implicit

---

## Documentation Standards

### README.md (Every Project)
- What it does
- Why it exists
- How to install
- How to use
- How to contribute
- License

### Code Documentation
- Function purpose
- Parameters and types
- Return value
- Side effects
- Exceptions thrown
- Example usage

### API Documentation
- Endpoint purpose
- Request format
- Response format
- Error codes
- Authentication
- Rate limits
- Examples

---

## Development Workflow

### Starting New Feature
1. Create branch from main
2. Use plan mode to create plan
3. Implement in phases
4. Test after each phase
5. Code review before merge
6. Squash commits if messy

### Fixing Bugs
1. Reproduce the bug
2. Write failing test
3. Fix the bug
4. Verify test passes
5. Check for similar bugs
6. Document fix in commit

### Reviewing Code
1. Understand the context
2. Check tests exist and pass
3. Look for security issues
4. Verify error handling
5. Check performance implications
6. Provide constructive feedback

---

## Personal Productivity

### Time Management
- Work in focused blocks (Pomodoro)
- Take breaks every 90 minutes
- Don't code when tired (bugs multiply)

### Learning
- Read code more than you write it
- Review your own code next day
- Learn from code reviews
- Refactor old code occasionally

### Problem Solving
1. Understand the problem fully
2. Break it down
3. Start with simplest solution
4. Iterate and improve
5. Ask for help when stuck

---

## When to Break These Rules

These are guidelines, not laws. Break them when:
- Project-specific requirements dictate
- Team conventions differ
- Legacy codebase has different style
- Specific framework/library requires it
- Performance critically requires it

**But:** Document WHY you're breaking the rule.

---

**This is MY coding philosophy. Project-specific sections below can override any of this.**

---

## Project-Specific Overrides

*Add project-specific rules here that override the universal principles above.*

<!-- Example:
### This Project Allows:
- Files up to 500 lines (due to complex components)
- console.log in development mode
-->
