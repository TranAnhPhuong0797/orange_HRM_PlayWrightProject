import { devices, PlaywrightTestProject } from '@playwright/test';
import { globalResultsRoot } from '../support/constants/global';

export type BrowserName = 'chromium' | 'firefox' | 'webkit' | 'edge';

export class BrowserFactory {
  static createProject(browser: BrowserName): PlaywrightTestProject {
    switch (browser) {
      case 'chromium':
        return { name: 'chromium', use: { ...devices['Desktop Chrome'] }, outputDir: globalResultsRoot };
      case 'firefox':
        return { name: 'firefox',  use: { ...devices['Desktop Firefox'] }, outputDir: globalResultsRoot };
      case 'webkit':
        return { name: 'webkit',   use: { ...devices['Desktop Safari'] }, outputDir: globalResultsRoot };
      case 'edge':
        return { name: 'edge',     use: { ...devices['Desktop Chrome'], browserName: 'chromium',  channel: 'msedge' }, outputDir: globalResultsRoot };
    }
  }
}
