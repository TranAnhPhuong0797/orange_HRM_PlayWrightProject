import { test as base } from '@playwright/test';
import { EnvFactory, EnvName } from '../factories/EnvFactory';
import { ApiFactory } from '../factories/ApiFactory';
import { UserFactory, UserRole } from '../factories/UserFactory';

// Import all Page Objects and corresponding locator maps
import { LoginActions }       from '../pages/loginPage/action';
import { loginLocators }      from '../pages/loginPage/locator';

/**
 * Extend Playwright's base test with environment-specific fixtures:
 * - `apiURL`: optional API URL, only injected if the test is annotated with type 'api'
 * - `user`: a user fixture that provides user credentials based on the role specified in test annotations
 */
export const test = base.extend<{
  baseURL: string;
  apiURL?: string;
  user: Awaited<ReturnType<typeof UserFactory.getUser>>;
}>({
  user: async ({}, use, testInfo) => {
    // default role = 'admin', hoặc override via annotation
    const role = (testInfo.annotations.find(a => a.type === 'role')?.description
                  || 'admin') as UserRole;
    await use(UserFactory.getUser(role));
  },
  // Only inject apiURL if the test is marked with the 'api' annotation
  apiURL: async ({}, use, testInfo) => {
    if (testInfo.annotations.find(a => a.type === 'api')) {
      const env = (process.env.TEST_ENV as EnvName) || 'dev';
      await use(ApiFactory.getApiURL(env));
    } else {
      await use(undefined); // Otherwise, provide undefined to skip it
    }
  }
});
