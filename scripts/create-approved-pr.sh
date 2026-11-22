#!/usr/bin/env bash
set -euo pipefail

TEST_FILE="${1:-}"
APPROVAL_FILE="${2:-}"

if [[ -z "$TEST_FILE" || -z "$APPROVAL_FILE" ]]; then
  echo "Usage: npm run workflow:pr -- <test-file> <approval-file>" >&2
  exit 1
fi

if [[ ! -f "$TEST_FILE" || ! -f "$APPROVAL_FILE" ]]; then
  echo "Test file or approval file not found." >&2
  exit 1
fi

if ! grep -q '^STATUS: APPROVED$' "$APPROVAL_FILE"; then
  echo "Review is not approved: $APPROVAL_FILE" >&2
  exit 1
fi

if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "This directory is not a Git repository." >&2
  exit 1
fi

npm run test:twice -- "$TEST_FILE"

BRANCH="$(git branch --show-current)"
if [[ "$BRANCH" == "main" || "$BRANCH" == "master" ]]; then
  echo "Create a feature branch before opening the PR." >&2
  exit 1
fi

git add -A
if ! git diff --cached --quiet; then
  git diff --cached --quiet || git commit -m "test: add reviewed Playwright coverage"
fi

git push -u origin "$BRANCH"
gh pr create --base main --head "$BRANCH" --fill
