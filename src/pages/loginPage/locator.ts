/**
 * Function-based locators for the Login page.
 * Each property returns a Locator instance when provided with a Playwright Page.
 */
import { Page, Locator } from '@playwright/test';

/**
 * Mapping of login page elements to their corresponding locator functions.
 */
export const loginLocators = {
  /**
   * Uses the CSS `name=username` selector.
   */
  usernameInput: (page: Page): Locator =>
    page.locator('input[name="username"]'),

  /**
   * Uses the CSS `name=password` selector.
   */
  passwordInput: (page: Page): Locator =>
    page.locator('input[name="password"]'),

  /**
   * Uses the CSS selector `button.orangehrm-login-button`.
   */
  loginButton: (page: Page): Locator =>
    page.locator('button.orangehrm-login-button'),

  /**
   * Uses the CSS selector `.oxd-alert-content--error`.
   */
  loginError: (page: Page): Locator =>
    page.locator('.oxd-alert-content--error'),
} as const;

/**
 * Type alias representing the loginLocators object structure.
 */
export type LoginLocators = typeof loginLocators;

/**
 * Union type of all available locator keys in the loginLocators object.
 */
export type LoginLocatorKey = keyof LoginLocators;
