# MCPTestPlaywright

Playwright + TypeScript minimal setup.

## Start here: add your first test

1. Describe the behavior you want to test using the prompt below. Replace the bracketed details, then send it to the **Workflow Coordinator** agent.
2. Review the Test Case Specialist's specification under `test-cases/`. Confirm that its steps and expected results match the requirement before implementation starts.
3. The Automation Engineer implements the approved case and runs it successfully before handing it to the Code Reviewer.
4. Review feedback is fixed and reviewed again. Only after approval does the Execution Agent run the test twice and open a PR.

```text
@workflow-coordinator

I want to add a Playwright test for this behavior:

- Feature: [short feature name]
- Requirement: [what the application should do]
- Starting page or URL: [where the test begins]
- User actions: [what the user does, in order]
- Expected results: [what should be visible or changed after each action]
- Test data: [safe, non-secret data to use]
- Important cases: [negative, boundary, or accessibility cases; or "identify these"]

Follow the complete gated workflow in context/ptypecontext.txt.
Start by asking me about any important ambiguity, then have the Test Case Specialist
write the specification. Wait for my confirmation of the specification before
implementation. Do not skip the Automation Engineer's passing test run, review
feedback/fix/re-review, or the Execution Agent's two-run and PR gates.
```

For example, replace the placeholders with: “Feature: product search; Requirement: a shopper can search for T-shirts; Starting page: Amazon home page; User actions: enter T-shirts and submit; Expected results: search results are shown and the page title reflects the query.”

## Add a framework feature

For framework-level changes (for example, adding API test support, a new fixture, or shared reporting), use this prompt with the Workflow Coordinator:

```text
@workflow-coordinator

I want to add this framework capability: [describe the capability and why it is needed].
Expected behavior: [what users or tests should be able to do].
Constraints: [compatibility, security, dependencies, and conventions].
Acceptance criteria: [observable outcomes that demonstrate the feature works].

Inspect the existing framework and context/ptypecontext.txt first. Propose the
smallest compatible change, identify affected documentation and tests, and ask me
to confirm the scope before implementation. Then implement, test, review, fix
findings, and re-review. Do not claim approval or open a PR unless all applicable
gates pass.
```

Quick start:

1. Install dev dependencies:

```
cd /home/sandeep/MCPTestPlaywright
npm install -D @playwright/test typescript
```

2. Install Chromium for Playwright:

```
npx playwright install chromium
```

3. Run tests:

```
npm test
```

Files added:
- `playwright.config.ts` — Playwright configuration
- `tsconfig.json` — TypeScript config
- `tests/example.spec.ts` — sample test

## Agentic workflow

Agent folders are organized under `agents/<agent-name>/`.
Reusable instruction text is centralized in `prompts/`.
Discoverable GitHub custom-agent definitions remain in `.github/agents/` and reference those reusable prompts:

- Test Case Specialist: creates traceable specifications under `test-cases/`
- Automation Engineer: implements Playwright tests and page objects
- Code Reviewer: fixes and approves review findings
- Execution Agent: runs approved tests twice and creates the PR
- Workflow Coordinator: enforces the stage gates

Framework conventions are defined in `context/ptypecontext.txt`.

### Gherkin and data-driven tests

BDD specifications live in capability-named `.feature` files under `test-cases/`. Use `Scenario Outline` and an `Examples` table when the same user flow is exercised with different data, and keep those rows aligned with the data-driven Playwright tests. This repository currently runs Playwright Test directly; `.feature` files are specifications, not executable Cucumber tests.

```bash
# Run one approved test twice
npm run test:twice -- tests/amazon-search.spec.ts

# Run twice, verify approval, and open a PR to main
npm run workflow:pr -- tests/amazon-search.spec.ts reviews/amazon-search-review.md
```

The PR workflow requires an initialized Git remote, a feature branch, and GitHub CLI authentication.
