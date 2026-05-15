import { test as base, expect, Page } from '@playwright/test';
import { LoginPage } from '../pages/login-page';
import { HomePage } from '../pages/home-page';

type TestFixtures = {
  loginPage: LoginPage;
  homePage: HomePage;
};

export const test = base.extend<TestFixtures>({
  page: async ({ page }, use) => {
    // Navigate to base URL before each test
    await page.goto('https://opensource-demo.orangehrmlive.com/');
    // TODO: migrate - removed implicit_wait (Duration.ofSeconds(10)) as Playwright has built-in auto-waiting
    await use(page);
  },

  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await use(loginPage);
  },

  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await use(homePage);
  },
});

export { expect } from '@playwright/test';

// Timeout constant for custom waits (use sparingly)
export const TIMEOUT = 10000; // 10 seconds in milliseconds
