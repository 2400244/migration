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
    // Use loginPage to perform login with page object method
    await loginPage.login('valid_user', 'valid_pass');
    
    // Assert home page indicator is visible using HomePage method
    const homePageText = await homePage.getHomePageText();
    await expect(homePage.page.locator('#app header span h6')).toBeVisible();
  });

});