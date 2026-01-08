#!/usr/bin/env node

/**
 * Setup script for verification agents
 * This script initializes the verification system for AI Kids Spark
 */

import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const rootDir = join(__dirname, '../..');

console.log('🚀 Setting up verification agents...\n');

// Ensure all directories exist
const directories = [
  '.verification/config',
  '.verification/agents/ui-tester/test-suites',
  '.verification/agents/ui-tester/helpers',
  '.verification/agents/ui-tester/reports',
  '.verification/agents/code-reviewer/rules',
  '.verification/agents/code-reviewer/reports',
  '.verification/agents/performance-checker/benchmarks',
  '.verification/agents/performance-checker/scripts',
  '.verification/agents/performance-checker/reports',
  '.verification/workflows',
  '.verification/scripts',
  '.verification/reports/latest',
  'src/test-utils'
];

directories.forEach(dir => {
  const fullPath = join(rootDir, dir);
  if (!existsSync(fullPath)) {
    mkdirSync(fullPath, { recursive: true });
    console.log(`✅ Created directory: ${dir}`);
  } else {
    console.log(`📁 Directory exists: ${dir}`);
  }
});

// Create UI Tester configuration
const uiTesterConfig = {
  name: 'UI Tester Agent',
  description: 'Automated UI testing with Playwright',
  browser: {
    headless: true,
    viewport: { width: 1280, height: 720 }
  },
  testPatterns: ['**/*.spec.ts', '**/*.test.ts'],
  coverage: {
    enabled: true,
    threshold: 80
  },
  accessibility: {
    enabled: true,
    standard: 'WCAG2AA'
  }
};

writeFileSync(
  join(rootDir, '.verification/agents/ui-tester/config.json'),
  JSON.stringify(uiTesterConfig, null, 2)
);
console.log('\n✅ Created UI Tester configuration');

// Create Code Reviewer configuration
const codeReviewerConfig = {
  name: 'Code Reviewer Agent',
  description: 'Automated code quality and security checks',
  rules: {
    typescript: {
      strict: true,
      noUnusedVars: true,
      noImplicitAny: true
    },
    react: {
      hooksRules: 'error',
      propTypes: 'warn',
      a11y: 'error'
    },
    security: {
      noEval: 'error',
      noInnerHTML: 'error',
      sensitiveDataCheck: true
    }
  },
  excludePatterns: ['node_modules/**', 'dist/**', 'build/**']
};

writeFileSync(
  join(rootDir, '.verification/agents/code-reviewer/config.json'),
  JSON.stringify(codeReviewerConfig, null, 2)
);
console.log('✅ Created Code Reviewer configuration');

// Create Performance Checker configuration
const performanceConfig = {
  name: 'Performance Checker Agent',
  description: 'Performance monitoring and optimization',
  metrics: {
    lighthouse: {
      performance: 90,
      accessibility: 90,
      bestPractices: 90,
      seo: 90
    },
    bundleSize: {
      maxSizeKB: 500,
      warnThresholdKB: 400
    },
    loadTime: {
      maxMs: 3000,
      warnMs: 2000
    }
  },
  checkAssets: {
    images: true,
    fonts: true,
    scripts: true
  }
};

writeFileSync(
  join(rootDir, '.verification/agents/performance-checker/config.json'),
  JSON.stringify(performanceConfig, null, 2)
);
console.log('✅ Created Performance Checker configuration');

// Create main verification config
const verificationConfig = {
  version: '1.0.0',
  agents: {
    'ui-tester': {
      enabled: true,
      priority: 1,
      runOn: ['pre-commit', 'pre-push', 'ci']
    },
    'code-reviewer': {
      enabled: true,
      priority: 2,
      runOn: ['pre-commit', 'ci']
    },
    'performance-checker': {
      enabled: true,
      priority: 3,
      runOn: ['pre-push', 'ci']
    }
  },
  workflows: {
    'quick-verify': ['code-reviewer'],
    'full-verify': ['ui-tester', 'code-reviewer', 'performance-checker']
  },
  reporting: {
    format: ['json', 'html'],
    outputDir: '.verification/reports/latest',
    keepHistory: 10
  }
};

writeFileSync(
  join(rootDir, '.verification/config/verification.json'),
  JSON.stringify(verificationConfig, null, 2)
);
console.log('✅ Created main verification configuration');

// Create Playwright config
const playwrightConfig = `import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './.verification/agents/ui-tester/test-suites',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [
    ['html', { outputFolder: '.verification/agents/ui-tester/reports/html' }],
    ['json', { outputFile: '.verification/agents/ui-tester/reports/results.json' }]
  ],
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
  },
});
`;

writeFileSync(
  join(rootDir, 'playwright.config.ts'),
  playwrightConfig
);
console.log('✅ Created Playwright configuration');

// Create Vitest config
const vitestConfig = `import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react-swc';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test-utils/setup.ts',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      reportsDirectory: './.verification/agents/ui-tester/reports/coverage',
      exclude: [
        'node_modules/',
        'src/test-utils/',
        '**/*.d.ts',
        '**/*.config.*',
        '**/mockData',
        'dist/'
      ],
      all: true,
      lines: 80,
      functions: 80,
      branches: 80,
      statements: 80
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  }
});
`;

writeFileSync(
  join(rootDir, 'vitest.config.ts'),
  vitestConfig
);
console.log('✅ Created Vitest configuration');

// Create test utils setup file
const testSetup = `import '@testing-library/jest-dom';
import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

expect.extend(matchers);

afterEach(() => {
  cleanup();
});

// Mock window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => {},
  }),
});
`;

writeFileSync(
  join(rootDir, 'src/test-utils/setup.ts'),
  testSetup
);
console.log('✅ Created test utilities setup');

// Create example UI test
const exampleTest = `import { test, expect } from '@playwright/test';

test.describe('Homepage Tests', () => {
  test('should load homepage successfully', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveTitle(/AI Kids Spark/i);
  });

  test('should have accessible navigation', async ({ page }) => {
    await page.goto('/');
    const nav = page.getByRole('navigation');
    await expect(nav).toBeVisible();
  });
});
`;

writeFileSync(
  join(rootDir, '.verification/agents/ui-tester/test-suites/homepage.spec.ts'),
  exampleTest
);
console.log('✅ Created example UI test');

// Create ESLint accessibility rules
const a11yRules = {
  extends: ['plugin:jsx-a11y/recommended'],
  rules: {
    'jsx-a11y/alt-text': 'error',
    'jsx-a11y/anchor-has-content': 'error',
    'jsx-a11y/aria-props': 'error',
    'jsx-a11y/aria-role': 'error',
    'jsx-a11y/click-events-have-key-events': 'warn',
    'jsx-a11y/heading-has-content': 'error',
    'jsx-a11y/html-has-lang': 'error',
    'jsx-a11y/img-redundant-alt': 'warn',
    'jsx-a11y/interactive-supports-focus': 'warn',
    'jsx-a11y/label-has-associated-control': 'error',
    'jsx-a11y/mouse-events-have-key-events': 'warn',
    'jsx-a11y/no-autofocus': 'warn',
    'jsx-a11y/no-noninteractive-element-interactions': 'warn',
    'jsx-a11y/no-static-element-interactions': 'warn',
    'jsx-a11y/role-has-required-aria-props': 'error',
    'jsx-a11y/role-supports-aria-props': 'error'
  }
};

writeFileSync(
  join(rootDir, '.verification/agents/code-reviewer/rules/accessibility.json'),
  JSON.stringify(a11yRules, null, 2)
);
console.log('✅ Created accessibility rules');

// Create .gitignore for verification
const gitignore = `# Test reports
**/reports/**/*.html
**/reports/**/*.json
**/reports/**/*.xml
!**/reports/.gitkeep

# Coverage
**/coverage/**
.nyc_output/

# Playwright
/test-results/
/playwright-report/
/playwright/.cache/

# Lighthouse
.lighthouseci/

# Performance artifacts
**/benchmarks/**/*.log
**/benchmarks/**/*.tmp

# Node
node_modules/
*.log
npm-debug.log*

# Keep config files
!**/config/**
!**/*.config.js
!**/*.config.ts
`;

writeFileSync(
  join(rootDir, '.verification/.gitignore'),
  gitignore
);
console.log('✅ Created .verification/.gitignore');

console.log('\n🎉 Verification system setup complete!\n');
console.log('Next steps:');
console.log('1. Run: npm install');
console.log('2. Run: npm run verify:quick');
console.log('3. Check the documentation in .verification/README.md\n');
