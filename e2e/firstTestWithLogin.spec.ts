import { expect } from '@playwright/test';
import { test } from '../src/support/fixtures';
import { LoginActions } from '../src/pages/loginPage/action';
import { CommonAssertion } from '../src/common/assertion';
import { commonLocators } from '../src/common/locator';

test.describe('Login Test Suite', () => {
  test('Admin user can log in successfully', async ({ page, user }) => {
    const login = new LoginActions(page);
    const assert = new CommonAssertion(page, commonLocators);

    // 1) Navigate to login page (baseURL đã có sẵn)
    await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');

    // 2) Perform login
    await login.login('admin');

    // 3) URL phải là /dashboard
    await expect(page).toHaveURL('/dashboard');

    // 4) Assert header chung xuất hiện
    await assert.assertTextEquals('headerTitle', 'Welcome to My App');
  });
});
