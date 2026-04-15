import { defineConfig } from '@playwright/test';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  reporter: [
  //['html'],
  //['./excel-reporter.ts'],
  ['json', { outputFile: 'results.json' }],
  ],
  use: {
    baseURL: 'https://practice.expandtesting.com',
    browserName: 'chromium',
  },
});
