#!/bin/bash
# Code Simplifier Tracker Hook
# Tracks file edits and triggers code simplification reminder after major coding phases
#
# This hook tracks Write/Edit operations and reminds to run code simplification
# after a configurable threshold of file changes.

set -e

# Configuration
TRACKER_FILE="${HOME}/.claude/code-simplifier-state.json"
THRESHOLD=${CODE_SIMPLIFIER_THRESHOLD:-5}  # Number of file changes before suggesting simplification

# Read input from stdin (Claude Code sends JSON context)
INPUT=$(cat)

# Extract relevant fields
TOOL_NAME=$(echo "$INPUT" | jq -r '.tool_name // empty' 2>/dev/null || echo "")
FILE_PATH=$(echo "$INPUT" | jq -r '.tool_input.file_path // empty' 2>/dev/null || echo "")
CWD=$(echo "$INPUT" | jq -r '.cwd // empty' 2>/dev/null || echo "")

# Only track Write and Edit operations
if [[ "$TOOL_NAME" != "Write" && "$TOOL_NAME" != "Edit" ]]; then
    exit 0
fi

# Initialize tracker file if it doesn't exist
if [[ ! -f "$TRACKER_FILE" ]]; then
    echo '{"edit_count": 0, "files_changed": [], "last_simplification": null}' > "$TRACKER_FILE"
fi

# Read current state
EDIT_COUNT=$(jq -r '.edit_count // 0' "$TRACKER_FILE")
FILES_CHANGED=$(jq -r '.files_changed // []' "$TRACKER_FILE")

# Increment count and add file if not already tracked
EDIT_COUNT=$((EDIT_COUNT + 1))

# Update tracker file
jq --arg file "$FILE_PATH" --argjson count "$EDIT_COUNT" \
    '.edit_count = $count | .files_changed = (.files_changed + [$file] | unique)' \
    "$TRACKER_FILE" > "${TRACKER_FILE}.tmp" && mv "${TRACKER_FILE}.tmp" "$TRACKER_FILE"

# Check if we've hit the threshold
if [[ $EDIT_COUNT -ge $THRESHOLD ]]; then
    FILES_LIST=$(jq -r '.files_changed | join(", ")' "$TRACKER_FILE")

    # Output reminder (this will be shown to Claude and the user)
    echo "---"
    echo "CODE SIMPLIFIER REMINDER: You've made $EDIT_COUNT file changes in this session."
    echo "Files modified: $FILES_LIST"
    echo ""
    echo "Consider running code simplification to:"
    echo "  - Remove unnecessary complexity"
    echo "  - Clean up temporary/debug code"
    echo "  - Improve readability"
    echo "  - Remove dead code"
    echo ""
    echo "To run: Ask Claude to 'simplify recent code changes' or use the code-simplifier workflow."
    echo "---"
fi

exit 0
