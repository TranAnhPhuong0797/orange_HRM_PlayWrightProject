// src/common/locators.ts
import { Page, Locator } from '@playwright/test';

/**
 * Function-based locators for common elements.
 */
export const commonLocators = {
  // ID locator → CSS #id
  loginButton: (page: Page): Locator =>
    page.locator('#login-btn'),

  // Name locator → [name="…"]
  usernameField: (page: Page): Locator =>
    page.locator('[name="username"]'),
  passwordField: (page: Page): Locator =>
    page.locator('[name="password"]'),

  // Default CSS locator
  headerTitle: (page: Page): Locator =>
    page.locator('header *[class*="header-title"]'),

  // XPath locator (no need to prefix with “xpath=”)
  welcomeHeader: (page: Page): Locator =>
    page.locator('//h1[contains(text(),"Welcome")]'),
  logoutLink: (page: Page): Locator =>
    page.locator('//a[@href="/logout"]'),

  // Text-based locator
  helpLink: (page: Page): Locator =>
    page.locator('text=Help & Support'),
} as const;

/** Union type of all keys in commonLocators */
export type CommonLocatorKey = keyof typeof commonLocators;

/** Object type for passing into BaseComponent or action/assertion layers */
export type CommonLocators = typeof commonLocators;
