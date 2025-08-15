import { envName } from './EnvFactory';
export class apiFactory {
  static getApiURL(env: envName = 'dev'): string {
    const prefix = env.toUpperCase();
    const apiURL = process.env[`${prefix}_API_URL`];
    if (!apiURL) throw new Error(`Missing ${prefix}_API_URL`);
    return apiURL;
  }
}