// src/common/locator.ts
export type LocatorType = 'id' | 'name' | 'css' | 'xpath';

export interface LocatorDef {
  type: LocatorType;
  selector: string;
}

/**
 * Danh sách locator cho toàn bộ project.
 * Key là tên bạn dùng để gọi trong CommonAction.getLocator(key).
 */
export const commonLocators: Record<string, LocatorDef> = {
  // =========== ID Locator ===========
  // Ví dụ: <button id="login-btn">Login</button>
  loginButton:    { type: 'id',    selector: 'login-btn' },

  // ========== Name Locator ==========
  // Ví dụ: <input name="username" />
  usernameField:  { type: 'name',  selector: 'username' },
  passwordField:  { type: 'name',  selector: 'password' },

  // ========== CSS Locator ===========
  // Ví dụ: <div class="notification success">…</div>
  successBanner:  { type: 'css',   selector: '.notification.success' },
  menuItems:      { type: 'css',   selector: 'ul.nav > li' },

  // ========= XPATH Locator ==========
  // Ví dụ: <h1>Welcome, User!</h1>
  welcomeHeader:  { type: 'xpath', selector: '//h1[contains(text(),"Welcome")]' },
  logoutLink:     { type: 'xpath', selector: '//a[@href="/logout"]' },

  // ========= Thêm ví dụ khác ==========
  signUpLink:     { type: 'css',   selector: 'a.signup' },
  footerText:     { type: 'xpath', selector: '//footer//p[@class="copyright"]' },
};
