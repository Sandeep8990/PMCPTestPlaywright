# Playwright Test Suite - Amazon Search Test

## Test Summary

✅ **Test Status**: PASSED

### Test Scenario
- Open https://www.amazon.com/
- Search for "T-shirts"
- Verify that search results are displayed
- Capture screenshot of the search results
- Run the test in headed mode once the test is stabilized

## Generated Files

### 1. Configuration File (`config.ts`)
- Centralized configuration for base URL, timeouts, and test data
- Easy to update test parameters without modifying test code
- Location: `/home/sandeep/MCPTestPlaywright/config.ts`

### 2. Page Objects
Following the Page Object Model (POM) design pattern for maintainability:

#### AmazonHomePage (`pages/AmazonHomePage.ts`)
- Encapsulates Amazon home page interactions
- Methods: `navigate()`, `searchForProduct()`, `isSearchBoxVisible()`
- Provides clean interface for test code

#### SearchResultsPage (`pages/SearchResultsPage.ts`)
- Encapsulates Amazon search results page interactions
- Methods: `areSearchResultsDisplayed()`, `getSearchResultsCount()`, `takeSearchResultsScreenshot()`, `getProductTitles()`, `isSearchResultsPageLoaded()`
- Handles screenshot capture and result verification

### 3. Test File (`tests/amazon-search.spec.ts`)
- Clean, readable test using page objects
- Comprehensive logging for debugging
- Validates all steps of the test scenario
- Takes screenshots of search results

## Test Execution Results

### Headless Mode (Initial Run)
```
✓ Test completed successfully!
✓ 1 [chromium] › tests/amazon-search.spec.ts › Amazon Search Functionality › Should search for T-shirts and verify search results are displayed (11.7s)
1 passed (13.3s)
```

### Headed Mode (Visual Run)
```
✓ Test completed successfully!
✓ 1 [chromium] › tests/amazon-search.spec.ts › Amazon Search Functionality › Should search for T-shirts and verify search results are displayed (9.9s)
1 passed (11.5s)
```

## Test Verification Steps

1. ✅ Amazon home page loaded successfully
2. ✅ Search for "T-shirts" executed
3. ✅ Search results page loaded (URL contains /s?k=)
4. ✅ Search results are displayed on page
5. ✅ Found 60 search results on current page
6. ✅ Product titles retrieved (74 titles found)
7. ✅ Screenshots captured successfully

## Screenshots Generated

- `amazon-search-results-1779819919423.png` (4.8MB) - Full page screenshot of search results
- `amazon-search-headshot-1779819919423.png` (322KB) - Additional screenshot capture

## How to Run Tests

### Run in headless mode
```bash
npm test -- tests/amazon-search.spec.ts
```

### Run in headed mode (with browser visible)
```bash
npm run test:headed -- tests/amazon-search.spec.ts
```

### Run all tests
```bash
npm test
```

## Best Practices Implemented

✅ **Page Object Model (POM)**: Separation of concerns with dedicated page objects
✅ **Configuration Management**: Centralized test data and settings
✅ **Reusable Components**: Page objects provide reusable methods
✅ **Comprehensive Logging**: Step-by-step console logs for debugging
✅ **Screenshot Capture**: Automatic screenshot of test execution
✅ **Proper Setup/Teardown**: beforeEach hooks for proper test initialization
✅ **Assertions**: Proper validation of expected outcomes
✅ **Maintainability**: Well-structured, documented code

## Next Steps

- Add more test scenarios (e.g., filtering, sorting, adding to cart)
- Implement error handling for network issues
- Add visual regression testing
- Create utility file for common helper functions
- Implement CI/CD integration

