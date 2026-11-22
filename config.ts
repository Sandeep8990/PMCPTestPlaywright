/**
 * Test Configuration File
 * Centralized configuration for test settings, URLs, and test data
 */

export const config = {
  // Base URL for Amazon
  baseURL: 'https://www.amazon.com',

  // Timeouts
  defaultTimeout: 30000,
  shortTimeout: 5000,

  // Data rows for the shared product-search scenario
  productSearchScenarios: [
    { query: 'mobile phones', expectedProductKeyword: 'iPhone' },
    { query: 'T-shirts', expectedProductKeyword: 'T-shirt' },
  ],

  // Screenshot settings
  screenshotOnFailure: true,
  screenshotOnSuccess: false
};
