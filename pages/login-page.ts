import { Page } from '@playwright/test';
import { BasePage } from './base-page';

export class LoginPage extends BasePage {
  private usernameInput = this.page.locator('input[name="username"]');
  private passwordInput = this.page.locator('input[name="password"]');
  private loginButton = this.page.locator('.orangehrm-login-button');

  constructor(page: Page) {
    super(page);
  }

  async navigate() {
    await this.page.goto('/');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }
}