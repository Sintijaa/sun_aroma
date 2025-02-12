// playwright.config.mjs
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: 'tests', // Directory for your tests
  timeout: 100000, // Timeout for each test
  use: {
    headless: false, // Run tests in headful mode
    browserName: 'chromium', // You can also use 'firefox' or 'webkit'
  },
});
