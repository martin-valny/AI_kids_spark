/**
 * Performance ESLint Rules for AI Kids Spark
 * Focuses on runtime performance, bundle size, and resource optimization
 *
 * Key areas:
 * - Console statements removal
 * - React hooks dependencies
 * - TypeScript performance patterns
 * - Unnecessary re-renders prevention
 * - Bundle optimization
 */

export default {
  plugins: ['react-hooks', '@typescript-eslint'],

  rules: {
    // ========================================
    // Console & Debug Statements
    // ========================================

    // Remove console statements in production (can impact performance)
    'no-console': ['warn', {
      allow: ['warn', 'error']
    }],

    // Remove debugger statements
    'no-debugger': 'error',

    // Remove alert statements (bad UX for kids)
    'no-alert': 'error',

    // ========================================
    // React Hooks Performance
    // ========================================

    // Ensure hooks have correct dependencies (prevents stale closures and extra renders)
    'react-hooks/exhaustive-deps': 'warn',

    // Ensure hooks rules are followed
    'react-hooks/rules-of-hooks': 'error',

    // ========================================
    // TypeScript Performance
    // ========================================

    // Avoid 'any' type (loses type safety and autocomplete benefits)
    '@typescript-eslint/no-explicit-any': ['warn', {
      fixToUnknown: true,
      ignoreRestArgs: false
    }],

    // Prefer nullish coalescing for better performance
    '@typescript-eslint/prefer-nullish-coalescing': 'warn',

    // Prefer optional chaining for cleaner code
    '@typescript-eslint/prefer-optional-chain': 'warn',

    // Avoid unnecessary type assertions
    '@typescript-eslint/no-unnecessary-type-assertion': 'warn',

    // Avoid unused variables (dead code)
    '@typescript-eslint/no-unused-vars': ['warn', {
      argsIgnorePattern: '^_',
      varsIgnorePattern: '^_',
      caughtErrorsIgnorePattern: '^_',
      ignoreRestSiblings: true
    }],

    // ========================================
    // Memory & Resource Management
    // ========================================

    // Avoid creating functions in loops
    'no-loop-func': 'error',

    // Avoid unnecessary concat
    'no-useless-concat': 'warn',

    // Prefer template literals over string concatenation
    'prefer-template': 'warn',

    // Avoid eval (security and performance)
    'no-eval': 'error',

    // Avoid implied eval
    'no-implied-eval': 'error',

    // ========================================
    // Array & Object Performance
    // ========================================

    // Avoid array constructor
    'no-array-constructor': 'warn',

    // Prefer spread over Object.assign for better performance
    'prefer-object-spread': 'warn',

    // Avoid unnecessary computed property names
    '@typescript-eslint/no-unnecessary-computed-property': 'warn',

    // ========================================
    // Async & Promise Performance
    // ========================================

    // Ensure promises are awaited or returned
    '@typescript-eslint/no-floating-promises': 'error',

    // Avoid misused promises
    '@typescript-eslint/no-misused-promises': ['error', {
      checksVoidReturn: false
    }],

    // Prefer async/await over promise chains
    'prefer-promise-reject-errors': 'warn',

    // Await in loops can be slow
    'no-await-in-loop': 'warn',

    // ========================================
    // Code Complexity (affects performance)
    // ========================================

    // Limit cyclomatic complexity
    'complexity': ['warn', { max: 15 }],

    // Limit nested callbacks
    'max-nested-callbacks': ['warn', { max: 4 }],

    // Limit function depth
    'max-depth': ['warn', { max: 4 }],

    // ========================================
    // Import Performance
    // ========================================

    // Avoid duplicate imports
    'no-duplicate-imports': ['error', {
      includeExports: true
    }],

    // ========================================
    // React-Specific Performance
    // ========================================

    // Prevent creating unstable components
    'no-inner-declarations': ['error', 'functions'],

    // Avoid inline object/array in JSX props (causes re-renders)
    // Note: This would need a custom rule or react-perf plugin

    // ========================================
    // DOM Performance
    // ========================================

    // Avoid inefficient selectors (if using querySelector)
    'no-restricted-syntax': [
      'warn',
      {
        selector: "CallExpression[callee.property.name='querySelector'][arguments.0.value=/^[#.]/]",
        message: 'Prefer getElementById or getElementsByClassName for better performance'
      }
    ],

    // ========================================
    // Bundle Size Optimization
    // ========================================

    // Avoid large dependencies when smaller alternatives exist
    // This is informational - would need manual review

    // Encourage tree-shaking friendly imports
    'no-restricted-imports': ['warn', {
      patterns: [
        {
          group: ['lodash'],
          message: 'Import specific lodash functions instead (e.g., lodash/map)'
        }
      ]
    }]
  },

  settings: {
    react: {
      version: 'detect'
    }
  }
};
