// Define user roles as a union type
export type UserRole = 'admin' | 'regular' | 'guest';

/**
 * Interface representing user credentials.
 */
export interface UserCreds {
  username: string;
  password: string;
}

/**
 * Factory class to retrieve user credentials
 * based on the specified role (admin, regular, guest).
 */
export class UserFactory {
  static getUser(role: UserRole): UserCreds {
    let username: string | undefined;
    let password: string | undefined;

    // Assign credentials based on the user role
    switch (role) {
      case 'admin':
        username = process.env.ADMIN_USER;
        password = process.env.ADMIN_PASS;
        break;
      case 'regular':
        username = process.env.REGULAR_USER;
        password = process.env.REGULAR_PASS;
        break;
      case 'guest':
        username = process.env.GUEST_USER;
        password = process.env.GUEST_PASS;
        break;
    }

    // Throw an error if either username or password is missing
    if (!username || password === undefined) {
      throw new Error(`Missing credentials for role "${role}" in environment variables`);
    }

    // Return the credentials
    return { username, password };
  }
}
