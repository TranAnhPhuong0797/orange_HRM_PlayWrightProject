import { Page, Locator } from '@playwright/test';
import { LocatorFn } from './baseComponent';

/**
 * Common interaction behaviors with a Playwright page,
 * using function-based locators.
 */
export class CommonAction<T extends Record<string, LocatorFn>> {
  constructor(
    private readonly page: Page,
    private readonly locators: T
  ) {}

  /** Return the Locator by calling the locator function */
  public getLocator(key: keyof T): Locator {
    return this.locators[key](this.page);
  }

  /** Click the element associated with the key */
  public click(key: keyof T) {
    return this.getLocator(key).click();
  }

  /** Fill an input element with the provided value */
  public fill(key: keyof T, value: string) {
    return this.getLocator(key).fill(value);
  }

  /** Get the innerText of an element after ensuring it's visible */
  public async getInnerText(key: keyof T): Promise<string> {
    const loc = this.getLocator(key);
    await loc.waitFor({ state: 'visible' });
    return loc.innerText();
  }
}
