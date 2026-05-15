import { Page, Locator } from '@playwright/test';

/**
 * LoginPage - handles login form interactions and validation
 * Migrated from: com.example.pages.LoginPage
 * 
 * Original: Selenium WebDriver with PageFactory @FindBy annotations
 * New: Playwright locator fields initialized in constructor
 */
export class LoginPage {
  // Locator fields (migrated from @FindBy annotations)
  private readonly userName: Locator;
  private readonly password: Locator;
  private readonly missingUsernameErrorMessage: Locator;
  private readonly missingPasswordErrorMessage: Locator;
  private readonly loginButton: Locator;
  private readonly errorMessage: Locator;

  constructor(private readonly page: Page) {
    // Initialize locators using pre-parsed selector inventory
    this.userName = this.page.locator('[name="username"]');
    this.password = this.page.locator('[name="password"]');
    this.missingUsernameErrorMessage = this.page.locator('.oxd-form > div:nth-child(1) > div > span');
    this.missingPasswordErrorMessage = this.page.locator('.oxd-form > div:nth-child(2) > div > span');
    this.loginButton = this.page.locator('.oxd-form > div:nth-child(3) > button');
    this.errorMessage = this.page.locator('#app p');
  }

  /**
   * Perform login with provided credentials
   * Original: userName.sendKeys() + password.sendKeys() + login.click()
   */
  async login(strUserName: string, strPassword: string): Promise<void> {
    await this.userName.fill(strUserName);
    await this.password.fill(strPassword);
    await this.loginButton.click();
  }

  /**
   * Get missing username validation message
   * Original: missingUsernameErrorMessage.getText()
   */
  async getMissingUsernameText(): Promise<string> {
    const text = await this.missingUsernameErrorMessage.textContent();
    return text ?? '';
  }

  /**
   * Get missing password validation message
   * Original: missingPasswordErrorMessage.getText()
   */
  async getMissingPasswordText(): Promise<string> {
    const text = await this.missingPasswordErrorMessage.textContent();
    return text ?? '';
  }

  /**
   * Get general error message
   * Original: errorMessage.getText()
   */
  async getErrorMessage(): Promise<string> {
    const text = await this.errorMessage.textContent();
    return text ?? '';
  }

  /**
   * Navigate to login page
   * Added for completeness - not in original but typically needed
   */
  async goto(url: string = '/login'): Promise<void> {
    await this.page.goto(url);
  }

  /**
   * Original method: saveTestResults(row, column)
   * Purpose: Set static ExcelUtils row/column for test result tracking
   * 
   * Migration decision: REMOVED
   * Reason: Playwright tests should not modify test data files during execution.
   * Test results are captured via built-in reporters (html, json, junit).
   * Configure reporters in playwright.config.ts instead.
   * 
   * If row/column tracking is needed for debugging, use test.info() metadata:
   * test('my test', async ({ page }, testInfo) => {
   *   testInfo.annotations.push({ type: 'data-row', description: '5' });
   * });
   */
}