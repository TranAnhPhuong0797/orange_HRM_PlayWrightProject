import { devices, PlaywrightTestProject } from '@playwright/test';

export type BrowserName = 'chromium' | 'firefox' | 'webkit' | 'edge';

export class BrowserFactory {
  static createProject(browser: BrowserName): PlaywrightTestProject {
    switch (browser) {
      case 'chromium':
        return { name: 'chromium', use: { ...devices['Desktop Chrome'] } };
      case 'firefox':
        return { name: 'firefox',  use: { ...devices['Desktop Firefox'] } };
      case 'webkit':
        return { name: 'webkit',   use: { ...devices['Desktop Safari'] } };
      case 'edge':
        return { name: 'edge',     use: { ...devices['Desktop Chrome'], browserName: 'chromium',  channel: 'msedge' } };
    }
  }
}
