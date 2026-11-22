# Requirement ID: REQ-AMZ-MOBILE-001
# Source: User requirement: "An amazon user searches for mobile phones and check if iphones are displayed"
# Scope: Guest product search on Amazon.com desktop.
# Assumptions: Chromium desktop viewport (1280x720 or larger), English/US locale,
# internet access, and an available Amazon catalog. CAPTCHA, consent challenge,
# or site outage is an environment blocker.
# Preconditions: Browser dependencies are installed and Amazon.com is reachable
# without requiring sign-in.
# Test data: Search queries and expected product-title keywords are defined in
# the Examples table below.
# Priority: P1 for mobile phones/iPhone; regression coverage for T-shirts.
# Automation notes: Playwright Test runs the corresponding data rows; this
# project does not currently have a Cucumber runner.

@amazon @search @regression
Feature: Amazon product search
  As an Amazon shopper
  I want to search for products
  So that I can see matching products in the results

  Background:
    Given I am a guest shopper on the Amazon.com home page
    And the Amazon search box is visible

  @positive
  Scenario Outline: Searching for "<search_query>" displays matching products
    When I search for "<search_query>"
    Then the Amazon search results page is displayed
    And the search results reflect "<search_query>"
    And at least one product card is visible
    And at least one visible product title contains "<expected_product_keyword>"

    Examples:
      | search_query  | expected_product_keyword |
      | mobile phones | iPhone                   |
      | T-shirts      | T-shirt                  |
