import { Page } from '@playwright/test';
import { BaseComponent, LocatorFn } from '../../common/baseComponent';
import { loginLocators, type LoginLocators } from './locator';
import { UserFactory, type UserRole } from '../../factories/UserFactory';

/**
 * Encapsulates all login-related actions and assertions.
 * Inherits common behaviors from BaseComponent.
 */
export class LoginActions extends BaseComponent<LoginLocators> {
  constructor(page: Page) {
    super(page, loginLocators);
  }

  /**
   * Log in to the application using the provided user role.
   * Defaults to 'admin' if no role is specified.
   */
  async login(role: UserRole = 'admin') {
    const { username, password } = UserFactory.getUser(role);
    await this.page.goto('/login');
    await this.action.fill('usernameInput', username);
    await this.action.fill('passwordInput', password);
    await this.action.click('loginButton');
  }

  /**
   * Assert that the expected error message is displayed.
   */
  async expectError(message: string): Promise<void> {
    // Directly call the assertion helper
    await this.assertion.assertTextEquals('loginError', message);
  }
}
