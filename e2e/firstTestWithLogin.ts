import { test, expect } from '../src/support/fixtures';
import { LoginActions } from '../src/pages/loginPage/action';
import { BaseComponent }      from '../src/common/baseComponent';
import { CommonAssertion } from '../src/common/assertion';


test.describe('Login Test Suite', () => {

    test('Admin user can log in successfully', async ({ page, user, envConfig }) => {
        const login = new LoginActions(page);

        // 1) Navigate to login page using envConfig.baseURL
        await page.goto('/login');

        // 2) Perform login with credentials from user fixture
        await login.login('admin');

        // 3) Assert that URL has redirected to dashboard
        await expect(page).toHaveURL(`${envConfig.baseURL}/dashboard`)

        // 4) Optionally, assert that a welcome message is visible
        await assertion.assertTextEquals('headerTitle', 'Welcome to My App');
    });
})