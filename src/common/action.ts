import { Page, Locator } from '@playwright/test';
import { LocatorFn } from './baseComponent';

/**
 * Common interaction behaviors with a Playwright page,
 * using function-based locators.
 */
export class CommonAction<T extends Record<string, LocatorFn>> {
  constructor(
    private readonly page: Page,
    private readonly locators: T,
    /** default timeout for waiting for elements */
    private readonly defaultTimeout = 15_000
  ) {}

  /** Return the Locator by calling the locator function */
  public getLocator(key: keyof T): Locator {
    return this.locators[key](this.page);
  }

  /** Wait for the element to become visible before interacting */
  private async waitVisible(key: keyof T, timeout?: number) {
    await this.getLocator(key).waitFor({
      state: 'visible',
      timeout: timeout ?? this.defaultTimeout
    });
  }

  /** Click element after waiting for it to be visible */
  public async click(
    key: keyof T,
  ): Promise<void> {
    await this.waitVisible(key);
    await this.getLocator(key).click();
  }

  /** Fill input field after waiting for it to be visible */
  public async fill(
    key: keyof T,
    value: string,
  ): Promise<void> {
    await this.waitVisible(key);
    await this.getLocator(key).fill(value);
  }

  /** Get element's innerText after ensuring it is visible */
  public async getInnerText(key: keyof T): Promise<string> {
    await this.waitVisible(key);
    return this.getLocator(key).innerText();
  }
}
