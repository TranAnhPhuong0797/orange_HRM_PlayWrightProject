import { test as base } from '@playwright/test';
import { EnvFactory, EnvName } from '../factories/EnvFactory';
import { ApiFactory } from '../factories/ApiFactory';

// Import all Page Objects and corresponding locator maps
import { LoginActions }       from '../pages/loginPage/action';
import { loginLocators }      from '../pages/loginPage/locator';

/**
 * Extend Playwright's base test with environment-specific fixtures:
 * - `baseURL`: the base URL for browser navigation
 * - `apiURL`: optional API URL, only injected if the test is annotated with type 'api'
 */
export const test = base.extend<{
  baseURL: string;
  apiURL?: string;
}>({
  baseURL: async ({}, use) => {
    // Get the environment from the TEST_ENV variable or default to 'dev'
    const env = (process.env.TEST_ENV as EnvName) || 'dev';
    await use(EnvFactory.getBaseURL(env));
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
