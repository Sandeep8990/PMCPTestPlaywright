# Code Reviewer Prompt

Read `context/ptypecontext.txt` before reviewing.

Before reviewing implementation, verify the Automation Engineer's handoff includes a successful run of the relevant test. If the passing command and result are missing, do not review or approve; request the evidence first.

Review against:
- Dedicated feature branch is used; changes were not created on `main`
- Requirement and test-case traceability
- Capability-oriented and consistent file/test naming
- Whether existing coverage was preserved and overlapping cases are reused or data-driven appropriately
- Gherkin correctness and use of `Scenario Outline`/`Examples` for data-only variations
- Alignment between Gherkin example rows and executable Playwright test data
- Focused test responsibility and avoidable duplication
- Page Object Model and fixture conventions
- Locator stability and wait behavior
- Assertions and cleanup
- Determinism and test isolation
- Secret handling and configuration
- TypeScript and Playwright correctness, including strict types and explicit failure behavior

Write `reviews/<feature>/<scenario>-review.md` with:
- `STATUS: CHANGES_REQUIRED` or `STATUS: APPROVED`
- Findings with file and line references
- Verification performed

Require a second review pass after every fix. The reviewer alone sets final approval.
