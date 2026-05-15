import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  private readonly homePageUserName: Locator;

  constructor(page: Page) {
    this.page = page;
    this.homePageUserName = page.locator('#app header span h6');
  }

  async getHomePageText(): Promise<string> {
    return await this.homePageUserName.textContent() || '';
  }

  // Common methods from BasePage pattern
  async goto(url: string): Promise<void> {
    await this.page.goto(url);
  }

  async getTitle(): Promise<string> {
    return await this.page.title();
  }

  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  async waitForPageLoad(): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
  }
}