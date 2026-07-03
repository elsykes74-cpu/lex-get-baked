#!/bin/bash
# PreToolUse hook (Bash matcher): block `git push` when TypeScript doesn't compile.
# Exit 2 blocks the tool call and feeds stderr back to Claude.
input=$(cat)
command=$(echo "$input" | python3 -c "import json,sys; print(json.load(sys.stdin).get('tool_input',{}).get('command',''))" 2>/dev/null)

case "$command" in
  *"git push"*) ;;
  *) exit 0 ;;
esac

cd "$(dirname "$0")/../.." || exit 0

if ! errors=$(npx tsc --noEmit 2>&1); then
  echo "Blocked git push: TypeScript errors (this repo has shipped 3 broken Vercel builds this way). Fix these, then run /preflight before pushing:" >&2
  echo "$errors" | head -30 >&2
  exit 2
fi
exit 0
