import { test, expect } from '../fixtures';
import { TestUtils } from '../utils/testUtils';
import { config } from '../config';

test.describe('Amazon product search', () => {
  for (const { query, expectedProductKeyword } of config.productSearchScenarios) {
    test(`searches for "${query}" and displays matching products`, async ({
      homePage,
      searchResultsPage,
    }) => {
      TestUtils.logStep(1, 'Navigating to Amazon home page');
      await homePage.navigate();
      await expect.poll(() => homePage.isSearchBoxVisible()).toBeTruthy();

      TestUtils.logStep(2, `Searching for "${query}"`);
      await homePage.searchForProduct(query);

      TestUtils.logStep(3, 'Verifying search results');
      await expect.poll(() => searchResultsPage.isSearchResultsPageLoaded()).toBeTruthy();
      await expect.poll(() => searchResultsPage.verifyPageTitleContains(query)).toBeTruthy();
      await expect.poll(() => searchResultsPage.areSearchResultsDisplayed()).toBeTruthy();

      const productTitles = await searchResultsPage.getVisibleProductTitles();
      expect(productTitles.length).toBeGreaterThan(0);
      expect(
        productTitles.some((title) =>
          title.toLocaleLowerCase().includes(expectedProductKeyword.toLocaleLowerCase()),
        ),
        `Expected a visible product title containing "${expectedProductKeyword}" for "${query}"`,
      ).toBeTruthy();

      TestUtils.logCompletion(`Found a matching product for "${query}"`);
      await searchResultsPage.takeTimestampedScreenshot();
    });
  }
});
