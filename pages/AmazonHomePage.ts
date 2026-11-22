/**
 * Amazon Home Page Object
 * Encapsulates interactions with the Amazon home page
 */

import { Page } from '@playwright/test';
import { TestUtils } from '../utils/testUtils';
import { config } from '../config';
import { BasePage } from './BasePage';

export class AmazonHomePage extends BasePage {
  // Locators
  private readonly searchBox = 'input[id="twotabsearchtextbox"], input[aria-label="Search Amazon"]';
  private readonly searchButton = 'input[id="nav-search-submit-button"], #nav-search-submit-button';

  constructor(page: Page) {
    super(page);
  }

  /**
   * Navigate to Amazon home page
   */
  async navigate(): Promise<void> {
    await super.navigate(config.baseURL);
    await this.waitForVisible(this.searchBox, config.defaultTimeout);
    TestUtils.logCompletion('Amazon home page loaded');
  }

  /**
   * Search for a product
   */
  async searchForProduct(searchTerm: string): Promise<void> {
    await this.fill(this.searchBox, searchTerm, config.shortTimeout);
    await this.click(this.searchButton);
    await this.waitForDomContentLoaded();
    TestUtils.logCompletion(`Searched for "${searchTerm}"`);
  }

  /**
   * Verify search box is visible
   */
  async isSearchBoxVisible(): Promise<boolean> {
    return this.page.locator(this.searchBox).isVisible();
  }
}
