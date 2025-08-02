// src/support/fixtures.ts
import { test as base } from '@playwright/test';
import { UserFactory, UserRole } from '../factories/UserFactory';

/**
 * Extend Playwright's base test with custom fixtures:
 * - `userRole`: the role used for the current test (default: 'regular')
 * - `user`: the corresponding credentials (username + password) for that role
 */
export const test = base.extend<{
  user: { username: string; password: string };
  userRole: UserRole;
}>({
  // Fixture for user role, configurable via CLI or project config
  userRole: ['admin', { option: true }],

  // Fixture to retrieve user credentials based on the role
  user: async ({ userRole }, use) => {
    const creds = UserFactory.getUser(userRole);
    await use(creds);
  },
});

// Runs before each test: clear cookies and navigate to home page
test.beforeEach(async ({ page, userRole }) => {
  await page.context().clearCookies();
  await page.goto('/');
  console.log(`🟢 Starting test with role=${userRole}`);
});

// Runs after each test: take a screenshot on failure and clear localStorage
test.afterEach(async ({ page }, testInfo) => {
  if (testInfo.status !== testInfo.expectedStatus) {
    const name = testInfo.title.replace(/\s+/g, '_');
    await page.screenshot({ path: `screenshots/${name}.png` });
  }
  await page.evaluate(() => localStorage.clear());
});
