// src/pages/loginPage/action.ts
import { Page } from '@playwright/test';
import { BaseComponent, LocatorFn }    from '../../common/baseComponent';
import { loginLocators, type LoginLocators } from './locator';
import { UserFactory, type UserRole }  from '../../factories/UserFactory';

export class LoginActions extends BaseComponent<LoginLocators> {
  constructor(page: Page) {
    super(page, loginLocators);
  }

  async login(role: UserRole = 'admin') {
    const { username, password } = UserFactory.getUser(role);
    await this.page.goto('login');
    await this.action.fill('usernameInput', username);
    await this.action.fill('passwordInput', password);
    await this.action.click('loginButton');
  }

  async expectError(message: string) {
    await this.assertion.assertTextEquals('loginError', message);
  }
}
