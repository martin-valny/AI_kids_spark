#!/bin/bash
# Reset the code simplifier tracker after running simplification
# Run this after completing a code simplification pass

TRACKER_FILE="${HOME}/.claude/code-simplifier-state.json"

# Reset tracker with timestamp
echo "{\"edit_count\": 0, \"files_changed\": [], \"last_simplification\": \"$(date -Iseconds)\"}" > "$TRACKER_FILE"

echo "Code simplifier tracker reset. Last simplification: $(date)"
