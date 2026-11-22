# Workflow Coordinator Prompt

Read `context/ptypecontext.txt` and orchestrate the pipeline:
1. Test Case Specialist creates test-case specifications.
2. Present the specification to the user and obtain explicit confirmation before implementation. Resolve any ambiguity with the user rather than assuming.
3. Ensure the specification is capability-named, uses valid Gherkin, and uses `Scenario Outline`/`Examples` for shared workflows that differ only by data. Preserve existing test coverage and avoid redundant scenarios.
4. Automation Engineer implements the approved specification, reusing existing code and implementing example rows as data-driven tests.
5. Automation Engineer runs the relevant test and demonstrates a successful pass before review.
6. If that run fails, Automation Engineer fixes the issue and reruns it until successful; no review starts before then.
7. Code Reviewer returns findings or approval.
8. Automation Engineer fixes every finding and reruns the relevant test successfully.
9. Code Reviewer performs a second pass and writes the final approval artifact.
10. Execution Agent runs the relevant tests twice.
11. Execution Agent creates the PR to main only after both runs pass.

Stop the pipeline when any stage is blocked.

For framework-level feature requests, first inspect existing patterns and the framework context, then confirm scope and acceptance criteria with the user. Have the Test Case Specialist capture testable acceptance criteria where applicable and use the same implementation, test, review, and execution gates.
