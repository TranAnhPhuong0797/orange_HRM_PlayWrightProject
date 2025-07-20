export type LocatorType = 'id' | 'name' | 'css' | 'xpath';

export interface LocatorDef {
  type: LocatorType;
  selector: string;
}

export const loginLocators: Record<string, LocatorDef> = {
  // Login page
  usernameInput: { type: 'name', selector: 'username' },
  passwordInput: { type: 'name', selector: 'password' },
  loginButton:   { type: 'css',  selector: 'button.orangehrm-login-button' },

  
} as const;

/** 
 * Key of loginLocators. 
 * Help TypeScript phát know wrong key. 
 */
export type LoginLocatorKey = keyof typeof loginLocators;
export type LoginLocatorsMap = Record<LoginLocatorKey, LocatorDef>;
