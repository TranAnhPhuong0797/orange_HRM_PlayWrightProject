// src/pages/loginPage/action.ts
import { Page } from '@playwright/test';
import { BaseComponent, LocatorFn }    from '../../common/baseComponent';
import { loginLocators, type LoginLocators } from './locator';
import { userFactory, type userRole }  from '../../factories/userFactory';

export class LoginActions extends BaseComponent<LoginLocators> {
  constructor(page: Page) {
    super(page, loginLocators);
  }

  async login(role: userRole = 'admin') {
    const { username, password } = userFactory.getUser(role);
    await this.page.goto('/');
    await this.action.fill('usernameInput', username);
    await this.action.fill('passwordInput', password);
    await this.action.click('loginButton');
  }

  async expectError(message: string) {
    await this.assertion.assertTextEquals('loginError', message);
  }
}
