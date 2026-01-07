import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright Configuration for AI Kids Spark UI Testing
 *
 * This configuration sets up automated UI testing for the kids' learning platform,
 * ensuring child-friendly interactions, responsive design, and interactive elements
 * work correctly across different devices and viewports.
 */
export default defineConfig({
  // Test directory location
  testDir: '../agents/ui-tester/test-suites',

  // Folder for test artifacts
  outputDir: '../test-results',

  // Maximum time one test can run
  timeout: 30 * 1000,

  // Test execution settings
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  // Reporter configuration - multiple formats for comprehensive reporting
  reporter: [
    ['html', { outputFolder: '../playwright-report', open: 'never' }],
    ['json', { outputFile: '../test-results/results.json' }],
    ['list'],
  ],

  // Shared settings for all projects
  use: {
    // Base URL for the application
    baseURL: 'http://localhost:8080',

    // Collect trace on first retry for debugging
    trace: 'on-first-retry',

    // Screenshot on failure
    screenshot: 'only-on-failure',

    // Video on first retry
    video: 'retain-on-failure',

    // Action timeout
    actionTimeout: 10 * 1000,

    // Navigation timeout
    navigationTimeout: 30 * 1000,
  },

  // Configure projects for different browsers and viewports
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 720 },
        // Enable console logging to catch JavaScript errors
        contextOptions: {
          recordVideo: {
            dir: '../test-results/videos',
            size: { width: 1280, height: 720 }
          }
        }
      },
    },

    {
      name: 'mobile-chrome',
      use: {
        ...devices['Pixel 5'],
        viewport: { width: 393, height: 851 },
        // Mobile-specific settings for touch interactions
        isMobile: true,
        hasTouch: true,
      },
    },

    {
      name: 'tablet',
      use: {
        ...devices['iPad Pro'],
        viewport: { width: 1024, height: 1366 },
        isMobile: true,
        hasTouch: true,
      },
    },
  ],

  // Web server configuration - auto-start the dev server
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:8080',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
    stdout: 'ignore',
    stderr: 'pipe',
  },
});
