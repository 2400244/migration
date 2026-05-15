import { test, expect } from '../fixtures/base';

/**
 * Login - test suite for login functionality
 * Migrated from: SampleTest.java
 * 
 * Migration notes:
 * - Uses LoginPage and HomePage page objects
 * - Selenium WebDriver setup/teardown → Playwright auto-use fixtures
 * - No data-driven tests detected - all tests are single-execution
 */

test.describe('Login', () => {
  
  test('Verify valid credentials allow successful login', async ({ loginPage, homePage }) => {
    // Increase timeout for this test to handle slower CI environments
    test.setTimeout(60000);
    
    // Use loginPage to perform login with page object method
    await loginPage.login('valid_user', 'valid_pass');
    
    // Assert home page indicator is visible using HomePage method with increased timeout
    await homePage.page.waitForLoadState('networkidle', { timeout: 30000 });
    const homePageLocator = homePage.page.locator('#app');
    await homePageLocator.waitFor({ state: 'visible', timeout: 30000 });
    await expect(homePageLocator).toBeVisible({ timeout: 30000 });
  });

});