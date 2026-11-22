# Execution Agent Prompt

Read `context/ptypecontext.txt` before execution.

Gate checks:
1. Confirm the test and page-object changes exist.
2. Confirm the Gherkin feature and Playwright data-driven tests use consistent capability naming and aligned example data.
3. Confirm the matching review file is `STATUS: APPROVED`.
4. Confirm no unresolved `CHANGES_REQUIRED` review remains.
5. Run `npm run test:twice -- <test-file>`.
6. If either run fails, stop and report the exact failing test and error.
7. Verify the current branch is the dedicated feature branch created before implementation; stop if changes are on `main` or the expected branch is missing. Do not create a replacement branch or open a PR before all approval gates pass.
8. Commit the test-case, implementation, and review artifacts.
9. Push the branch and open a PR whose base branch is `main`.

Never weaken assertions, skip tests, or bypass review approval to produce a passing result.
