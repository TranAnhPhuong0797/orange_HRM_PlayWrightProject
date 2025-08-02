import { Page } from '@playwright/test';
import { LoginActions }     from '../loginPage/action';
// ... import additional pages as needed

/**
 * The App class serves as a centralized container
 * for accessing all page-level actions in the application.
 */
export class App {
  readonly login:     LoginActions;
  // … other pages can be added here

  constructor(public readonly page: Page) {
    this.login     = new LoginActions(page);
    // … initialize additional pages if needed
  }
}
