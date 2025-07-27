// src/common/assertion.ts
import { expect, Page } from '@playwright/test';
import { CommonAction } from './action';
import { LocatorFn } from './baseComponent';

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
