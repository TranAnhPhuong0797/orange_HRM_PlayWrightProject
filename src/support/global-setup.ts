import { FullConfig } from '@playwright/test';
import { EnvFactory, EnvName } from '../factories/EnvFactory';

/**
 * Global setup file for Playwright.
 * This runs once before the entire test suite begins.
 */
export default async function globalSetup(config: FullConfig) {
  // Example: load environment variables, connect to a database, etc.
  const env = (process.env.TEST_ENV as EnvName) || 'dev';
  const baseURL = EnvFactory.getBaseURL(env);
  console.log('🌍 Global setup – baseURL is', baseURL);

  // … add any other “hard” initialization logic you need
}
