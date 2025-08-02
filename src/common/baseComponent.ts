import { Page, Locator } from '@playwright/test';
import { CommonAction } from './action';
import { CommonAssertion } from './assertion';

/**
 * Each locator is now a function: (page: Page) => Locator
 */
export type LocatorFn = (page: Page) => Locator;

/**
 * BaseComponent serves as an abstract class for all page components.
 * It provides access to common actions and assertions using function-based locators.
 */
export abstract class BaseComponent<
  T extends Record<string, LocatorFn>
> {
  protected readonly action: CommonAction<T>;
  protected readonly assertion: CommonAssertion<T>;

  constructor(
    protected readonly page: Page,
    protected readonly locators: T
  ) {
    // Explicitly enforce generic <T> so TypeScript properly infers the type
    this.action    = new CommonAction<T>(page, locators);
    this.assertion = new CommonAssertion<T>(page, locators);

  }
}
