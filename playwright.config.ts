import { defineConfig, devices } from '@playwright/test';

const requestedTags = process.env.PLAYWRIGHT_TAGS
  ?.split(',')
  .map((tag) => tag.trim())
  .filter(Boolean);

if (requestedTags?.some((tag) => !/^@[A-Za-z0-9][A-Za-z0-9_-]*$/.test(tag))) {
  throw new Error('PLAYWRIGHT_TAGS must be a comma-separated list of tags such as @smoke,@regression');
}

export default defineConfig({
  testDir: 'tests',
  timeout: 30_000,
  expect: { timeout: 5000 },
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: 'list',
  grep: requestedTags?.length
    ? new RegExp(requestedTags.map((tag) => tag.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|'))
    : undefined,
  use: {
    headless: process.env.CI === 'true',
    viewport: { width: 1280, height: 720 },
    actionTimeout: 0,
    ignoreHTTPSErrors: true,
    screenshot: 'only-on-failure'
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        ...(process.env.CI === 'true' ? {} : { channel: 'chrome' }),
      }
    }
  ]
});
