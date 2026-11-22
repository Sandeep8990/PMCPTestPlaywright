import { Page } from '@playwright/test';
import { TestUtils } from '../utils/testUtils';

export abstract class BasePage {
  protected readonly page: Page;

  protected constructor(page: Page) {
    this.page = page;
  }

  protected async navigate(url: string): Promise<void> {
    await this.page.goto(url, { waitUntil: 'domcontentloaded' });
  }

  protected async waitForVisible(selector: string, timeout: number): Promise<void> {
    await TestUtils.waitForElementVisible(this.page, selector, timeout);
  }

  protected async fill(selector: string, text: string, timeout: number): Promise<void> {
    await TestUtils.fillInput(this.page, selector, text, timeout);
  }

  protected async click(selector: string): Promise<void> {
    await this.page.locator(selector).click();
  }

  protected async waitForDomContentLoaded(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
  }
}
