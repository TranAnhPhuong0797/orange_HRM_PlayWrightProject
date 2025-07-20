// src/common/action.ts
import { Page, Locator } from '@playwright/test';
import { commonLocators, LocatorDef } from '../common/locator';

export class CommonAction {
  constructor(
    private page: Page,
    /** Cho phép truyền vào map locator riêng của từng page */
    private definitions: Record<string, LocatorDef>
  ) {}

  private getDefinition(key: string): LocatorDef {
    const def = this.definitions[key];
    if (!def) throw new Error(`No locator defined for key "${key}"`);
    return def;
  }

  /**
   * Return a Playwright Locator based on  key defind in`locators`.
   * @param name The name of key in `locators`
   */
  public getLocator(name: string): Locator {
    const def: LocatorDef | undefined = commonLocators[name];
    if (!def) {
      throw new Error(`No locator found in locator.ts for key "${name}"`);
    }
    switch (def.type) {
      case 'id':
        // find follow id => #id
        return this.page.locator(`#${def.selector}`);
      case 'name':
        // find follow attribute name
        return this.page.locator(`[name="${def.selector}"]`);
      case 'css':
        // selector CSS
        return this.page.locator(def.selector);
      case 'xpath':
        // xpath=
        return this.page.locator(`xpath=${def.selector}`);
      default:
        // vanilla fallback
        return this.page.locator(def.selector);
    }
  }

  public async click(name: string) {
    await this.getLocator(name).click();
  }

  public async fill(name: string, text: string) {
    await this.getLocator(name).fill(text);
  }
}
