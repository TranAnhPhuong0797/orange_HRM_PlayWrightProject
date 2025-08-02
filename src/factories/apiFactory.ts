import { EnvName } from './EnvFactory';
export class ApiFactory {
  static getApiURL(env: EnvName = 'dev'): string {
    const prefix = env.toUpperCase();
    const apiURL = process.env[`${prefix}_API_URL`];
    if (!apiURL) throw new Error(`Missing ${prefix}_API_URL`);
    return apiURL;
  }
}