import { FullConfig } from '@playwright/test';

/**
 * Global teardown file for Playwright.
 * This runs once after the entire test suite completes.
 */
export default async function globalTeardown(config: FullConfig) {
  // Example: disconnect from database, send report, clean up resources, etc.
  console.log('🧹 Global teardown – cleaning up');
}
