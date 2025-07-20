import { Page } from '@playwright/test';
import { CommonAction } from '../../common/action';
import { loginLocators, LoginLocatorKey } from '../loginPage/locator';
import { userFactory, UserRole } from '../../factories/UserFactory';

export class LoginActions {
  private action: CommonAction;

  constructor(private page: Page) {
    this.action = new CommonAction(page, loginLocators as any);
  }

  /**
   * @param role role of user want to login, example 'admin', 'regular'
   * Default is 'admin'
   * Login to the application with provided username and password.
   */
  async login(role: UserRole = 'admin') {
    const { username, password } = userFactory.getUser(role);

    await this.page.goto('/');

    await this.action.fill('usernameInput' as LoginLocatorKey, username);
    await this.action.fill('passwordInput' as LoginLocatorKey, password);
    await this.action.click('loginButton'   as LoginLocatorKey);
  }

  async expectError(message: string) {
    const errorLocatorKey = 'loginError'; 
    await this.action.getLocator(errorLocatorKey).waitFor();
    const text = await this.action.getLocator(errorLocatorKey).textContent();
    if (text !== message) {
      throw new Error(`Expected error "${message}", got "${text}"`);
    }
  }
}
