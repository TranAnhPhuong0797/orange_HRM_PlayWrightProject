import { FullConfig } from '@playwright/test';
import { envFactory, envName } from '../factories/envFactory';

/**
 * Global setup file for Playwright.
 * This runs once before the entire test suite begins.
 */
export default async function globalSetup(config: FullConfig) {
  // Example: load environment variables, connect to a database, etc.
  const env = (process.env.TEST_ENV as envName) || 'dev';
  const baseURL = envFactory.getBaseURL(env);
  console.log('🌍 Global setup – baseURL is', baseURL);

  // … add any other “hard” initialization logic you need
}
