// e2e/firstTestWithLogin.ts
import { test } from '../src/support/fixtures';
import { expect } from '@playwright/test';
import { LoginActions } from '../src/pages/loginPage/action';
import { CommonAssertion } from '../src/common/assertion';
import { commonLocators } from '../src/common/locator';

test.describe('Login Test Suite', () => {
  test('Admin user can log in successfully', async ({ page, user }) => {
    // now user = { username, password }
    const login = new LoginActions(page);
    const assert = new CommonAssertion(page, commonLocators);

    // 1) Perform login with user credentials
    await login.login('admin');

    // 2) Expect redirected to /dashboard
    await expect(page).toHaveURL('/dashboard');

    // 3) Assert header text
    await assert.assertTextEquals('headerTitle', 'Welcome to My App');
  });
});
