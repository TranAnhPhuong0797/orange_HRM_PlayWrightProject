import { defineConfig, devices, PlaywrightTestProject  } from '@playwright/test';
import dotenv from 'dotenv';
import { BrowserFactory, BrowserName } from './src/factories/BrowserFactory';
import { EnvFactory, EnvName } from './src/factories/EnvFactory';
import { globalResultsRoot } from './src/support/constants/global';
import 'allure-playwright';

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
  globalSetup: require.resolve('./src/support/global-setup'),
  globalTeardown: require.resolve('./src/support/global-teardown'),

  testDir: './e2e',
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI. */
  workers: process.env.CI ? 1 : undefined,
  timeout: 30_000,

  // === REPORTER ===
  reporter: [
    // HTML reporter, Allure, JSON, and JUnit
    ['html', {
      outputFolder: `${globalResultsRoot}/html-report`,
      open: 'on-failure'
    }],
    // Allure reporter
    // ['allure-playwright', { outputFolder: `${globalResultsRoot}/allure-results` }],
    
    // JSON and JUnit reporters
    // ['json', {
    //   outputFile: `${globalResultsRoot}/report.json`
    // }],
    // ['junit', {
    //   outputFile: `${globalResultsRoot}/junit-results.xml`
    // }]
  ],

  use: {
    // Default configuration for all tests (can be overridden per test)
    headless: true,
    baseURL,
    navigationTimeout: 60_000,
    actionTimeout: 60_000,
    video: 'retain-on-failure', // Record video only when the test fails
    screenshot: 'only-on-failure', // ScreenShot only when the test fails
    trace: 'retain-on-failure',
  },

  /* Configure projects for major browsers */
  projects: [
    BrowserFactory.createProject('chromium'),
    BrowserFactory.createProject('firefox'),
    BrowserFactory.createProject('edge'),

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
});
