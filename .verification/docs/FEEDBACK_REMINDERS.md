# Automatic Feedback Loop Reminders

Smart reminder system that suggests when to run feedback loops based on your changes, without blocking your workflow.

## 🎯 How It Works

The reminder system analyzes your git changes and suggests relevant feedback loops:

```
Changed files → Analyze → Smart recommendations → You decide when to run
```

**No blocking, no slowdown** - just helpful suggestions at the right time.

---

## 🔔 When Reminders Appear

### 1. **After Commit** (post-commit hook)
Shows compact recommendations after successful commit:

```bash
git commit -m "Update UI"
# ✅ Commit successful!
#
# ╭─────────────────────────────────────────────────────────────────╮
# │  💡 Feedback Loop Recommendations                               │
# ╰─────────────────────────────────────────────────────────────────╯
#
# 🔴 High Priority:
#
# 🌐 Browser Testing
#    Reason: UI components or routes were modified
#    Command: npm run feedback:browser
#    Quick: npm run feedback:browser -- --test-suite smoke --max-iterations 2
```

### 2. **Before Push** (pre-push hook)
Stronger reminder before pushing to remote:

```bash
git push
# 🚀 Preparing to push...
#
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
# 💡 Reminder: Consider running feedback loops before pushing
# ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
#
# [recommendations shown]
#
# ⚠️  Push will continue in 5 seconds...
#    Press Ctrl+C to cancel and run feedback loops
```

### 3. **Manual Check** (anytime)
Run manually to see current recommendations:

```bash
npm run feedback:remind
```

---

## 🧠 Smart Detection

The system analyzes file changes to make intelligent recommendations:

| File Changes | Recommended Loop | Priority |
|-------------|------------------|----------|
| `.tsx`, `.jsx` components | Browser Testing | High |
| CSS, styles, Tailwind | Visual Comparison | Medium |
| Routes, pages, App.tsx | Browser Testing | High |
| Test files | TDD Loop | Low |
| Multiple types (3+) | All Loops | High |

---

## 📋 Recommendation Format

Each recommendation includes:

```
🌐 Browser Testing Loop
   Reason: UI components or routes were modified
   Command: npm run feedback:browser
   Quick: npm run feedback:browser -- --test-suite smoke --max-iterations 2
```

**Quick Command**: Fast version with limited iterations for immediate feedback

---

## ⚙️ Configuration

### Customize Post-Commit Behavior

Edit `.husky/post-commit`:

```bash
# Show full recommendations (not compact)
node .verification/workflows/feedback-reminder.js

# Show compact (default)
node .verification/workflows/feedback-reminder.js --compact

# Hide quick commands
node .verification/workflows/feedback-reminder.js --no-quick

# Silent mode (no output)
node .verification/workflows/feedback-reminder.js --silent
```

### Customize Pre-Push Behavior

Edit `.husky/pre-push`:

```bash
# Change wait time (default 5 seconds)
sleep 10  # Wait 10 seconds instead

# Remove wait time (immediate push)
# Comment out the sleep line

# Disable pre-push reminders
# Comment out the entire reminder section
```

### Disable Reminders

**Temporarily** (for one commit/push):
```bash
git commit --no-verify -m "message"
git push --no-verify
```

**Permanently** (remove hooks):
```bash
# Disable post-commit reminders
rm .husky/post-commit

# Disable pre-push reminders
rm .husky/pre-push
```

---

## 💡 Usage Examples

### Check Current Recommendations

```bash
npm run feedback:remind
```

### Run Recommended Loop

Based on reminder, run suggested command:

```bash
# If browser testing recommended
npm run feedback:browser

# Use quick version for faster feedback
npm run feedback:browser -- --test-suite smoke --max-iterations 2
```

### Check Before Committing

```bash
# Make changes
git add .

# Check what would be recommended
npm run feedback:remind

# Run recommended loops
npm run feedback:browser

# Then commit
git commit -m "message"
```

### Workflow Integration

```bash
# 1. Make changes
# 2. Commit (reminder appears)
git commit -m "Update UI"

# 3. Review recommendations, run if needed
npm run feedback:browser -- --test-suite smoke --max-iterations 2

# 4. Push (reminder with 5-second warning)
git push

# 5. Cancel if needed (Ctrl+C), or let it proceed
```

---

## 🎨 Customization Examples

### Verbose Mode

Show all details:

```bash
npm run feedback:remind -- --verbose
```

### Compact Mode (High Priority Only)

```bash
npm run feedback:remind -- --compact
```

### Silent Mode (Script Integration)

```bash
# Returns exit code 1 if has recommendations, 0 otherwise
npm run feedback:remind -- --silent
if [ $? -eq 1 ]; then
  echo "Feedback loops recommended!"
fi
```

### Custom Post-Commit Hook

`.husky/post-commit`:

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

echo "✅ Commit successful!"

# Only show if UI changes detected
if git diff HEAD~1 --name-only | grep -q "src/components"; then
  npm run feedback:remind -- --compact
fi
```

---

## 🚦 Priority Levels

### 🔴 High Priority
**When**: Critical changes that affect functionality
- UI components modified
- Routes changed
- Multiple types of changes

**Action**: Strongly recommended to run before push

### 🟡 Medium Priority
**When**: Visual or design changes
- Styles modified
- CSS/Tailwind changes

**Action**: Run when working on visuals

### 🟢 Low Priority
**When**: Test-related changes
- Test files modified
- Test configuration changed

**Action**: Informational, run if doing TDD

---

## 📊 Decision Flow

```
Commit/Push
    ↓
Analyze changes
    ↓
Has recommendations?
    ↓ Yes
Show relevant loops
    ↓
You decide:
- Run now (quick version)
- Run later (full version)
- Skip (proceed anyway)
    ↓
Continue workflow
```

---

## 🔧 Advanced: CI Integration

### Skip Reminders in CI

`.husky/pre-push`:

```bash
# Skip if running in CI
if [ -n "$CI" ]; then
  exit 0
fi

# Show reminders for local development only
node .verification/workflows/feedback-reminder.js --compact
```

### Auto-Run on Specific Branches

`.husky/pre-push`:

```bash
# Get current branch
BRANCH=$(git rev-parse --abbrev-ref HEAD)

# Auto-run on main/master
if [ "$BRANCH" = "main" ] || [ "$BRANCH" = "master" ]; then
  echo "🚨 Pushing to $BRANCH - running feedback loops..."
  npm run feedback:all -- --stop-on-failure
fi
```

---

## 📖 Related Documentation

- [Feedback Loops Guide](./FEEDBACK_LOOPS.md) - Complete usage guide
- [Quick Reference](./FEEDBACK_LOOPS_QUICK_REFERENCE.md) - Command cheatsheet
- [Workflows README](../workflows/README.md) - Workflow details

---

## 🎯 Best Practices

### ✅ Do

- **Review recommendations** after commits
- **Run quick versions** for immediate feedback
- **Run full versions** before push
- **Use compact mode** for cleaner output

### ❌ Don't

- **Don't ignore consistently** - reminders are there to help
- **Don't run on every change** - use judgment based on priority
- **Don't block yourself** - skip if you're in a hurry, run later

---

## 🆘 Troubleshooting

### Reminders Not Appearing

**Check hooks are executable**:
```bash
ls -la .husky/
chmod +x .husky/post-commit .husky/pre-push
```

**Check husky is installed**:
```bash
npm run prepare
```

**Verify reminder script works**:
```bash
npm run feedback:remind
```

### Wrong Recommendations

**System is file-based**, analyzing:
- File extensions (`.tsx`, `.css`, etc.)
- File paths (`src/components/`, `src/pages/`)
- File names (test files, config files)

If getting irrelevant suggestions, the file patterns may need adjustment in `.verification/workflows/feedback-reminder.js`.

### Too Many Reminders

**Use compact mode**:
```bash
# In .husky/post-commit
node .verification/workflows/feedback-reminder.js --compact
```

**Increase threshold** (edit `feedback-reminder.js`):
```javascript
// Only recommend "all loops" if 4+ types changed (instead of 3)
const significantChanges = Object.values(this.changes).filter(Boolean).length >= 4;
```

### Pre-Push Delay Too Long

**Adjust wait time** (`.husky/pre-push`):
```bash
# Change from 5 to 3 seconds
sleep 3
```

**Or remove entirely**:
```bash
# Comment out sleep line
# sleep 5
```

---

## 💬 Feedback

The reminder system is designed to be **helpful, not annoying**. If you find it:

- **Too verbose**: Use `--compact` mode
- **Too quiet**: Use default or `--verbose` mode
- **Too intrusive**: Disable specific hooks
- **Just right**: Great! Share your workflow

---

## Summary

**Automatic reminders** = Smart suggestions, not blockers

- ✅ Appears after commits and before pushes
- ✅ Analyzes changes intelligently
- ✅ Suggests relevant loops only
- ✅ Provides quick commands
- ✅ Doesn't block workflow
- ✅ Fully customizable

**Result**: You get helpful nudges at the right time without slowing down development.

---

*"Give Claude a way to verify its work = 2-3x better quality"* - Boris
*And now, automatic reminders to do it!* 🎯
