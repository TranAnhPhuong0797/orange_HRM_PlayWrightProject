import { test as base, expect } from '@playwright/test';
import { userFactory, UserRole, UserCreds } from '../factories/UserFactory';
import { envFactory, EnvConfig, EnvName} from '../factories/EnvFactory';

type MyFixtures = {
  user: UserCreds;
  envConfig: EnvConfig;
};

export const test = base.extend<MyFixtures>({
  // fixture user, pick role từ env var hoặc default 'regular'
  user: async ({}, use) => {
    const role = (process.env.USER_ROLE as UserRole) || 'admin';
    const creds = userFactory.getUser(role);
    await use(creds);
  },
  // fixture envConfig, pick env từ env var hoặc default 'dev'
  envConfig: async ({}, use) => {
    const env = (process.env.TEST_ENV as EnvName) || 'dev';
    const cfg = envFactory.getConfig(env);
    await use(cfg);
  },
});

export { expect };
