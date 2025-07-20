import usersData from '../dataTest/users.json';

export type UserRole = keyof typeof usersData;
export interface UserCreds {
  username: string;
  password: string;
}

export class userFactory {
  static getUser(role: UserRole): UserCreds {
    const creds = usersData[role];
    if (!creds) throw new Error(`No user data for role "${role}"`);
    return creds;
  }
}
