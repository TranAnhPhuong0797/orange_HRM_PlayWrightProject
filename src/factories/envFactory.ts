export type EnvName = 'dev' | 'staging' | 'prod';
import dotenv from 'dotenv';
dotenv.config();
/**
 * Factory class to retrieve environment-specific configuration
 * based on the environment name (dev, staging, prod).
 */
export class EnvFactory {
  static getBaseURL(env: EnvName = 'dev'): string {
    const prefix = env.toUpperCase(); // DEV, STAGING, PROD
    const baseURL = process.env[`${prefix}_BASE_URL`];
    if (!baseURL) {
      throw new Error(`Missing environment variable ${prefix}_BASE_URL`);
    }
    return baseURL;
  }
}
