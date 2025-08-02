import { expect, Page } from '@playwright/test';
import { CommonAction } from './action';
import { LocatorFn } from './baseComponent';

const longTimeout = 5000;

/**
 * Common assertion utility for validating UI elements
 * using function-based locators.
 */
export class CommonAssertion<T extends Record<string, LocatorFn>> {
  private action: CommonAction<T>;

  constructor(
    private readonly page: Page,
    private readonly locators: T
  ) {
    // Initialize the action helper with page and locator functions
    this.action = new CommonAction<T>(page, locators);
  }

  /**
   * Assert that an element is enabled.
   */
  public async verifyElementEnabled(key: keyof T) {
    const locator = this.locators[key](this.page);
    await expect(locator).toBeEnabled({ timeout: longTimeout });
  }

  /**
   * Assert that an element is disabled.
   */
  public async verifyElementDisabled(key: keyof T) {
    const locator = this.locators[key](this.page);
    await expect(locator).toBeDisabled({ timeout: longTimeout });
  }

  /**
   * Assert that an element is visible.
   */
  public async verifyElementVisible(key: keyof T) {
    const locator = this.locators[key](this.page);
    await expect(locator).toBeVisible({ timeout: longTimeout });
  }

  /**
   * Assert that an element is hidden.
   */
  public async verifyElementHidden(key: keyof T) {
    const locator = this.locators[key](this.page);
    await expect(locator).toBeHidden({ timeout: longTimeout });
  }

  /**
   * Assert that an element does not exist in DOM.
   */
  public async verifyElementNotPresent(key: keyof T) {
    const locator = this.locators[key](this.page);
    await expect(locator).toHaveCount(0, {
      timeout: longTimeout,
    });
  }

  /**
   * Assert that the innerText of a specified element matches the expected value.
   */
  public async assertTextEquals(key: keyof T, expected: string) {
    const actual = (await this.action.getInnerText(key)).trim();
    expect(
      actual,
      `Expected "${String(key)}" to be "${expected}", but got "${actual}"`
    ).toBe(expected);
  }
}
