import { Page } from '@playwright/test';

/**
 * Base page class providing common page functionality.
 * Note: Playwright prefers composition over inheritance for page objects.
 * Consider using this as a utility class or extending test fixtures instead.
 */
export class BasePage {
  constructor(protected readonly page: Page) {}

  /**
   * Navigate to a URL
   */
  async goto(url: string): Promise<void> {
    await this.page.goto(url);
  }

  /**
   * Get the current page title
   */
  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  /**
   * Get the current URL
   */
  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  /**
   * Wait for page to be fully loaded
   */
  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
  }
}