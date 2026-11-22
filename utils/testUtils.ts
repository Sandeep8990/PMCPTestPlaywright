/**
 * Test Utilities
 * Reusable utility functions for common test actions
 */

import { Page, expect } from '@playwright/test';

export class TestUtils {
  /**
   * Wait for element to be visible with extended timeout
   */
  static async waitForElementVisible(
    page: Page,
    selector: string,
    timeout: number = 10000
  ): Promise<void> {
    await page.locator(selector).waitFor({ state: 'visible', timeout });
  }

  /**
   * Wait for element to disappear
   */
  static async waitForElementHidden(
    page: Page,
    selector: string,
    timeout: number = 10000
  ): Promise<void> {
    await page.locator(selector).waitFor({ state: 'hidden', timeout });
  }

  /**
   * Fill input field with retry logic
   */
  static async fillInput(
    page: Page,
    selector: string,
    text: string,
    timeout: number = 5000
  ): Promise<void> {
    const locator = page.locator(selector);
    await locator.fill(text, { timeout });
  }

  /**
   * Click element and wait for navigation
   */
  static async clickAndWaitForNavigation(
    page: Page,
    selector: string,
    waitUntil: 'domcontentloaded' | 'load' | 'networkidle' = 'domcontentloaded'
  ): Promise<void> {
    await Promise.all([
      page.waitForLoadState(waitUntil),
      page.locator(selector).click(),
    ]);
  }

  /**
   * Get text content from element
   */
  static async getElementText(page: Page, selector: string): Promise<string> {
    return await page.locator(selector).textContent() || '';
  }

  /**
   * Take screenshot with timestamp
   */
  static async takeTimestampedScreenshot(
    page: Page,
    baseDir: string,
    name: string
  ): Promise<string> {
    const timestamp = new Date().getTime();
    const screenshotPath = `${baseDir}/${name}-${timestamp}.png`;
    await page.screenshot({ path: screenshotPath, fullPage: true });
    return screenshotPath;
  }

  /**
   * Verify element contains specific text
   */
  static async verifyElementContainsText(
    page: Page,
    selector: string,
    expectedText: string
  ): Promise<void> {
    const element = page.locator(selector);
    await expect(element).toContainText(expectedText);
  }

  /**
   * Get current page URL
   */
  static async getCurrentUrl(page: Page): Promise<string> {
    return page.url();
  }

  /**
   * Verify page URL contains expected text
   */
  static async verifyUrlContains(page: Page, expectedText: string): Promise<void> {
    await expect(page).toHaveURL(new RegExp(expectedText));
  }

  /**
   * Wait and retry function for flaky operations
   */
  static async retryOperation<T>(
    operation: () => Promise<T>,
    maxRetries: number = 3,
    delay: number = 1000
  ): Promise<T> {
    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await operation();
      } catch (error) {
        lastError = error as Error;
        if (attempt < maxRetries) {
          console.log(`Attempt ${attempt} failed, retrying in ${delay}ms...`);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      }
    }

    throw lastError || new Error('Operation failed after retries');
  }

  /**
   * Log test step for debugging
   */
  static logStep(stepNumber: number, description: string): void {
    console.log(`\nStep ${stepNumber}: ${description}`);
  }

  /**
   * Log test completion
   */
  static logCompletion(message: string): void {
    console.log(`✓ ${message}`);
  }

  /**
   * Log test error
   */
  static logError(message: string): void {
    console.error(`✗ ${message}`);
  }
}

