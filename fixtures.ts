/**
 * Playwright Custom Fixtures
 * Extends Playwright test fixtures to inject page objects into test context
 */

import { test as base, Page } from '@playwright/test';
import { AmazonHomePage } from './pages/AmazonHomePage';
import { SearchResultsPage } from './pages/SearchResultsPage';

/**
 * Define custom fixtures for page objects
 */
type TestFixtures = {
  homePage: AmazonHomePage;
  searchResultsPage: SearchResultsPage;
};

/**
 * Extend base test with custom fixtures
 */
export const test = base.extend<TestFixtures>({
  /**
   * Fixture for AmazonHomePage
   * Automatically creates a new instance for each test
   */
  homePage: async ({ page }, use) => {
    const homePage = new AmazonHomePage(page);
    // Pass the homePage instance to the test
    await use(homePage);
  },

  /**
   * Fixture for SearchResultsPage
   * Automatically creates a new instance for each test
   */
  searchResultsPage: async ({ page }, use) => {
    const searchResultsPage = new SearchResultsPage(page);
    // Pass the searchResultsPage instance to the test
    await use(searchResultsPage);
  },
});

// Export expect from @playwright/test for use in tests
export { expect } from '@playwright/test';

