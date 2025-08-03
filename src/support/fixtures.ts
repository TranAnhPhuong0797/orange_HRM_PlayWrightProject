// src/support/fixtures.ts
import { test as base } from '@playwright/test';
import { UserFactory, UserRole } from '../factories/UserFactory';
import { Helper} from '../support/helpers';
import { globalResultsRoot } from '../support/constants/global';

const timestamp = Helper.getTimestamp();
/**
 * Extend Playwright's base test with custom fixtures:
 * - `userRole`: the role used for the current test (default: 'regular')
 * - `user`: the corresponding credentials (username + password) for that role
 */
export const test = base.extend<{
  user: { username: string; password: string };
  userRole: UserRole;
  resultsRoot: string;
}>({
  // Fixture for user role, configurable via CLI or project config
  userRole: ['admin', { option: true }],

  // Fixture to retrieve user credentials based on the role
  user: async ({ userRole }, use) => {
    const creds = UserFactory.getUser(userRole);
    await use(creds);
  },

  // Fixture for resultsRoot
  resultsRoot: async ({}, use) => {
    await use(globalResultsRoot);
  },
});

// Runs before each test: clear cookies and navigate to home page
test.beforeEach(async ({ page, userRole }) => {
  await page.context().clearCookies();
  await page.goto('/');
  console.log(`🟢 Starting test with role=${userRole}`);
});

// Runs after each test: take a screenshot on failure and clear localStorage
test.afterEach(async ({ page, resultsRoot }, testInfo) => { 
  if (testInfo.status !== testInfo.expectedStatus) {
    // Format the screenshot name with test title and timestamp
    const name = testInfo.title.replace(/\s+/g, '_');

    // Capture screenshot on failure
    await page.screenshot({
      path: `${resultsRoot}/screenshots/${name}_${timestamp}.png`
    });

    // Save video on failure
    const video = page.video();
    if (video) {
      await video.saveAs(`${resultsRoot}/videos/${name}_${timestamp}.webm`);
      await video.delete(); // Prevent duplicate saving
    }
  }
  await page.evaluate(() => localStorage.clear());
});
