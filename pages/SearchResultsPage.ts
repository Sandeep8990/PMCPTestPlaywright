/**
 * Amazon Search Results Page Object
 * Encapsulates interactions with the Amazon search results page
 */

import { Page } from '@playwright/test';
import { TestUtils } from '../utils/testUtils';
import { BasePage } from './BasePage';

export class SearchResultsPage extends BasePage {
  // Locators
  private readonly searchResultsContainer = '[data-component-type="s-search-result"]';
  private readonly resultsHeading = 'span[data-feature-name="unified-result-count"]';
  private readonly productTitle = 'h2 span';

  constructor(page: Page) {
    super(page);
  }

  /**
   * Check if search results are displayed
   */
  async areSearchResultsDisplayed(): Promise<boolean> {
    try {
      // Wait for search results to be visible
      await this.page.locator(this.searchResultsContainer).first().waitFor({
        state: 'visible',
        timeout: 10000
      });
      TestUtils.logCompletion('Search results displayed');
      return true;
    } catch (error) {
      TestUtils.logError('Search results not displayed');
      return false;
    }
  }

  /**
   * Get the number of search results visible on the current page
   */
  async getSearchResultsCount(): Promise<number> {
    const count = await this.page.locator(this.searchResultsContainer).count();
    TestUtils.logCompletion(`Found ${count} search results on current page`);
    return count;
  }

  /**
   * Take a screenshot of search results
   */
  async takeSearchResultsScreenshot(screenshotPath: string): Promise<void> {
    await this.page.screenshot({
      path: screenshotPath,
      fullPage: true
    });
    TestUtils.logCompletion(`Screenshot saved: ${screenshotPath}`);
  }

  /**
   * Take timestamped screenshot
   */
  async takeTimestampedScreenshot(baseDir: string = 'test-results'): Promise<string> {
    return TestUtils.takeTimestampedScreenshot(this.page, baseDir, 'amazon-search-results');
  }

  /**
   * Get titles from visible product cards
   */
  async getVisibleProductTitles(): Promise<string[]> {
    const cards = this.page.locator(this.searchResultsContainer);
    const titles: string[] = [];

    for (let index = 0; index < await cards.count(); index++) {
      const card = cards.nth(index);
      if (!(await card.isVisible())) {
        continue;
      }

      const title = (await card.locator(this.productTitle).first().textContent())?.trim() ?? '';
      if (title) {
        titles.push(title);
      }
    }

    TestUtils.logCompletion(`Retrieved ${titles.length} visible product titles`);
    return titles;
  }

  /**
   * Verify search results page URL contains search query
   */
  async isSearchResultsPageLoaded(): Promise<boolean> {
    const isLoaded = this.page.url().includes('/s?k=');
    if (isLoaded) {
      TestUtils.logCompletion('Search results page loaded');
    }
    return isLoaded;
  }

  /**
   * Get current page URL
   */
  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  /**
   * Verify page title contains expected text
   */
  async verifyPageTitleContains(expectedText: string): Promise<boolean> {
    const title = await this.page.title();
    const isValid = title.includes(expectedText);
    if (isValid) {
      TestUtils.logCompletion(`Page title contains "${expectedText}"`);
    }
    return isValid;
  }
}
