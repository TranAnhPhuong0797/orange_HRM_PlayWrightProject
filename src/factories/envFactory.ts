// src/factories/envFactory.ts
import envs from '../dataTest/environments.json';

export type EnvName = Extract<keyof typeof envs, string>;

export interface EnvConfig {
  baseURL: string;
  apiURL:  string;
}

export class envFactory {
  static getConfig(env: EnvName = 'dev'): EnvConfig {
    const cfg = envs[env];
    if (!cfg) {
      throw new Error(`No environment config for "${env}"`);
    }
    return cfg;
  }
}

export default envFactory;
