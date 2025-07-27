import { defineConfig, devices, PlaywrightTestProject  } from '@playwright/test';
import dotenv from 'dotenv';
import { BrowserFactory, BrowserName } from './src/factories/BrowserFactory';
import { EnvFactory, EnvName } from './src/factories/EnvFactory';

// 1) Load .env
dotenv.config();

// 2) Get ENV from the TEST_ENV variable (default to 'dev' if not set)
const ENV = (process.env.TEST_ENV as EnvName) || 'dev';
const baseURL = EnvFactory.getBaseURL(ENV);

// 3) Generate an array of projects using BrowserFactory
const projects: PlaywrightTestProject[] = (['chromium', 'firefox', 'webkit'] as BrowserName[])
  .map(browserName => BrowserFactory.createProject(browserName as any))
  .map(project => ({
    ...project,
    use: {
      ...project.use,
      baseURL,               // Inject baseURL from the selected environment
      // You can add other shared `use` options here, such as viewport, headless, etc.
      // apiURL can also be exposed via fixtures if needed
    }
  }));

export default defineConfig({
  testDir: './e2e',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['html', { open: 'on-failure' }]],
  timeout: 30_000,
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    // Default configuration for all tests (can be overridden per test)
    headless: true,
    video: 'retain-on-failure', // Record video only when the test fails
    baseURL,
  },

  /* Configure projects for major browsers */
  projects: [
    BrowserFactory.createProject('chromium'),
    BrowserFactory.createProject('firefox'),
    BrowserFactory.createProject('webkit'),

    /* Test against mobile viewports. */
    // {
    //   name: 'Mobile Chrome',
    //   use: { ...devices['Pixel 5'] },
    // },
    // {
    //   name: 'Mobile Safari',
    //   use: { ...devices['iPhone 12'] },
    // },

    /* Test against branded browsers. */
    // {
    //   name: 'Microsoft Edge',
    //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
    // },
    // {
    //   name: 'Google Chrome',
    //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
    // },
  ],

  /* Run your local dev server before starting the tests */
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://localhost:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});
