/**
 * Unified ESLint Configuration for AI Kids Spark Code Review Agent
 *
 * This configuration combines all rule sets:
 * - Accessibility rules (jsx-a11y)
 * - Performance rules
 * - Kids safety rules
 * - React & TypeScript best practices
 *
 * Usage:
 *   eslint --config .verification/agents/code-reviewer/eslint.config.js src/
 *
 * Note: This extends the project's main eslint.config.js with additional
 * rules specific to code review automation.
 */

import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import react from 'eslint-plugin-react';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import tseslint from 'typescript-eslint';

// Import our custom rule configurations
import accessibilityRules from './rules/accessibility.eslint.js';
import performanceRules from './rules/performance.eslint.js';
import kidsSafetyRules from './rules/kids-safety.eslint.js';
import reactBestPractices from './rules/react-best-practices.eslint.js';

/**
 * Merge plugin configurations
 */
const mergedPlugins = {
  'react': react,
  'react-hooks': reactHooks,
  'react-refresh': reactRefresh,
  'jsx-a11y': jsxA11y,
  '@typescript-eslint': tseslint.plugin,
};

/**
 * Merge all rule sets
 * Priority order (later overrides earlier):
 * 1. Base recommended rules
 * 2. Performance rules
 * 3. React best practices
 * 4. Kids safety rules
 * 5. Accessibility rules (highest priority)
 */
const mergedRules = {
  // Start with base recommended rules
  ...js.configs.recommended.rules,

  // Add TypeScript recommended rules
  ...tseslint.configs.recommended.rules,

  // Add our custom rule sets
  ...performanceRules.rules,
  ...reactBestPractices.rules,
  ...kidsSafetyRules.rules,
  ...accessibilityRules.rules,

  // Project-specific overrides
  '@typescript-eslint/no-unused-vars': 'off', // Handled by performance rules
};

/**
 * Merge settings from all configurations
 */
const mergedSettings = {
  react: {
    version: 'detect',
  },
  'jsx-a11y': {
    polymorphicPropName: 'as',
    components: {
      Button: 'button',
      Link: 'a',
      Image: 'img',
      Input: 'input',
      Textarea: 'textarea',
      Select: 'select',
      Video: 'video',
      Audio: 'audio',
    },
  },
  'import/resolver': {
    typescript: true,
    node: true,
  },
};

/**
 * Main ESLint configuration
 */
export default tseslint.config(
  // Ignore patterns
  {
    ignores: [
      'dist/**',
      'build/**',
      'node_modules/**',
      '*.config.js',
      '*.config.ts',
      '.verification/**/*.js', // Don't lint the verification configs themselves
      'coverage/**',
      '.git/**',
    ],
  },

  // Main configuration for TypeScript/React files
  {
    files: ['**/*.{ts,tsx,js,jsx}'],

    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true,
        },
        project: './tsconfig.json',
      },
    },

    plugins: mergedPlugins,

    rules: mergedRules,

    settings: mergedSettings,
  },

  // Specific overrides for test files
  {
    files: ['**/*.test.{ts,tsx}', '**/*.spec.{ts,tsx}'],
    rules: {
      // Relax some rules for test files
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      'no-console': 'off',
      'react/display-name': 'off',
    },
  },

  // Specific overrides for config files
  {
    files: ['*.config.{js,ts}', 'vite.config.ts', 'tailwind.config.ts'],
    rules: {
      '@typescript-eslint/naming-convention': 'off',
      'import/no-default-export': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      'no-console': 'off',
    },
  },

  // Specific overrides for UI component library files
  {
    files: ['src/components/ui/**/*.{ts,tsx}'],
    rules: {
      // UI components may need more flexibility
      'react/jsx-no-bind': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      'react/jsx-props-no-spreading': 'off',
    },
  },

  // Specific overrides for data/activity files
  {
    files: ['src/data/**/*.{ts,tsx}', 'src/pages/**/*Activity*.{ts,tsx}'],
    rules: {
      // More strict rules for user-facing content
      'react/jsx-no-bind': 'error',
      '@typescript-eslint/explicit-function-return-type': 'error',
      'jsx-a11y/media-has-caption': 'error',
    },
  },

  // Specific overrides for page components
  {
    files: ['src/pages/**/*.{ts,tsx}', 'src/App.tsx'],
    rules: {
      // Pages can export default for routing
      'react-refresh/only-export-components': 'off',
    },
  },

  // TypeScript-specific rules only for TS files
  {
    files: ['**/*.{ts,tsx}'],
    rules: {
      // Enforce TypeScript-specific best practices
      '@typescript-eslint/explicit-module-boundary-types': 'warn',
      '@typescript-eslint/no-unsafe-assignment': 'warn',
      '@typescript-eslint/no-unsafe-member-access': 'warn',
      '@typescript-eslint/no-unsafe-call': 'warn',
      '@typescript-eslint/no-unsafe-return': 'warn',
    },
  }
);

/**
 * Rule Categories Summary:
 *
 * ACCESSIBILITY (Error Level):
 * - Alt text required on all images
 * - ARIA attributes validated
 * - Keyboard navigation support
 * - No autofocus
 * - Form labels required
 * - Media captions required
 *
 * PERFORMANCE (Warning Level):
 * - No console statements (except warn/error)
 * - Hooks dependencies checked
 * - No explicit 'any' type
 * - Optimized array/object operations
 * - Promise handling
 *
 * KIDS SAFETY (Error Level):
 * - External links protected (noopener/noreferrer)
 * - No window.open without safety
 * - No direct localStorage (use COPPA-compliant wrapper)
 * - No dangerouslySetInnerHTML
 * - Controlled form inputs
 * - No inline event handlers
 *
 * REACT BEST PRACTICES (Warning Level):
 * - Function components preferred
 * - Proper hooks usage
 * - JSX formatting standards
 * - TypeScript strict mode
 * - Component composition
 * - Code organization
 */
