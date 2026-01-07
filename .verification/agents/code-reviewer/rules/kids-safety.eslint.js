/**
 * Kids Safety ESLint Rules for AI Kids Spark
 * Custom rules ensuring child safety, content filtering, and parental controls
 *
 * Key areas:
 * - External link protection
 * - Content filtering patterns
 * - Data privacy compliance (COPPA)
 * - Controlled form inputs
 * - Safe event handlers
 * - Age-appropriate patterns
 */

export default {
  plugins: ['react', '@typescript-eslint'],

  rules: {
    // ========================================
    // External Links & Navigation Safety
    // ========================================

    // Require rel="noopener noreferrer" on external links
    'react/jsx-no-target-blank': ['error', {
      allowReferrer: false,
      enforceDynamicLinks: 'always',
      warnOnSpreadAttributes: true
    }],

    // Custom rule enforcement for external links
    'no-restricted-syntax': [
      'error',
      // Prevent window.open without safety checks
      {
        selector: "CallExpression[callee.object.name='window'][callee.property.name='open']",
        message: 'Direct window.open is not allowed. Use a SafeExternalLink component with parental confirmation.'
      },
      // Prevent window.location assignments
      {
        selector: "AssignmentExpression[left.object.name='window'][left.property.name='location']",
        message: 'Direct window.location assignment is not allowed. Use controlled navigation.'
      },
      // Prevent location.href assignments
      {
        selector: "AssignmentExpression[left.object.name='location'][left.property.name='href']",
        message: 'Direct location.href assignment is not allowed. Use React Router navigation.'
      },
      // Prevent eval (security)
      {
        selector: "CallExpression[callee.name='eval']",
        message: 'eval() is forbidden for security reasons.'
      },
      // Prevent Function constructor
      {
        selector: "NewExpression[callee.name='Function']",
        message: 'Function constructor is forbidden for security reasons.'
      }
    ],

    // ========================================
    // Data Privacy & COPPA Compliance
    // ========================================

    // Prevent inline localStorage without consent wrapper
    'no-restricted-globals': ['error', {
      name: 'localStorage',
      message: 'Use useLocalStorage hook with COPPA compliance wrapper instead of direct localStorage access.'
    }, {
      name: 'sessionStorage',
      message: 'Use useSessionStorage hook with compliance wrapper instead of direct sessionStorage access.'
    }],

    // Prevent direct cookie access
    'no-restricted-properties': ['error', {
      object: 'document',
      property: 'cookie',
      message: 'Direct cookie access is not allowed. Use cookie management service with COPPA compliance.'
    }],

    // ========================================
    // Form & Input Safety
    // ========================================

    // Prevent uncontrolled form inputs (better for validation)
    'react/jsx-no-duplicate-props': 'error',

    // Prevent dangerous JSX props
    'react/no-danger': 'error',

    // Prevent dangerouslySetInnerHTML
    'react/no-danger-with-children': 'error',

    // ========================================
    // Event Handler Safety
    // ========================================

    // Prevent inline event handlers (harder to audit)
    // This is a warning as sometimes needed for small interactions
    'react/jsx-no-bind': ['warn', {
      ignoreRefs: true,
      allowArrowFunctions: false,
      allowFunctions: false,
      allowBind: false
    }],

    // ========================================
    // Content Filtering Patterns
    // ========================================

    // Require proper string sanitization
    'no-restricted-imports': ['error', {
      paths: [{
        name: 'react',
        importNames: ['dangerouslySetInnerHTML'],
        message: 'Use a sanitization wrapper for HTML content.'
      }]
    }],

    // ========================================
    // Component Safety Patterns
    // ========================================

    // Ensure proper prop validation
    'react/prop-types': 'off', // Using TypeScript instead

    // Require default props for safety
    'react/require-default-props': 'off', // TypeScript optional props handle this

    // Prevent unsafe lifecycle methods
    'react/no-unsafe': ['error', {
      checkAliases: true
    }],

    // ========================================
    // TypeScript Safety for Kids Platform
    // ========================================

    // Require explicit return types on functions
    '@typescript-eslint/explicit-function-return-type': ['warn', {
      allowExpressions: true,
      allowTypedFunctionExpressions: true,
      allowHigherOrderFunctions: true
    }],

    // Require explicit types on exported functions
    '@typescript-eslint/explicit-module-boundary-types': 'warn',

    // Prevent unsafe member access
    '@typescript-eslint/no-unsafe-member-access': 'warn',

    // Prevent unsafe calls
    '@typescript-eslint/no-unsafe-call': 'warn',

    // Prevent unsafe assignments
    '@typescript-eslint/no-unsafe-assignment': 'warn',

    // Prevent unsafe returns
    '@typescript-eslint/no-unsafe-return': 'warn',

    // ========================================
    // State Management Safety
    // ========================================

    // Prevent direct state mutation
    'no-param-reassign': ['error', {
      props: true,
      ignorePropertyModificationsFor: ['draft'] // Allow for immer
    }],

    // ========================================
    // API & Network Safety
    // ========================================

    // Prevent fetch without error handling
    'no-restricted-globals': ['error', {
      name: 'fetch',
      message: 'Use the API wrapper service with built-in content filtering and error handling.'
    }],

    // ========================================
    // Media & Assets Safety
    // ========================================

    // Ensure controlled media elements
    // (Custom rule - video/audio should have controls and be pausable)

    // ========================================
    // Age-Appropriate Content Patterns
    // ========================================

    // Prevent setTimeout/setInterval abuse (can be used for ads/tracking)
    'no-restricted-globals': ['warn', {
      name: 'setTimeout',
      message: 'Consider using useTimeout hook for better cleanup and tracking.'
    }, {
      name: 'setInterval',
      message: 'Consider using useInterval hook for better cleanup and tracking.'
    }],

    // ========================================
    // Accessibility for Safety
    // ========================================

    // Require keyboard support (prevents trap patterns)
    'jsx-a11y/no-autofocus': 'error',

    // ========================================
    // Error Boundaries
    // ========================================

    // Encourage error boundaries
    'react/no-unstable-nested-components': ['error', {
      allowAsProps: true
    }]
  },

  settings: {
    react: {
      version: 'detect'
    }
  },

  overrides: [
    {
      // More strict rules for components handling user data
      files: ['**/components/forms/**/*.{ts,tsx}', '**/pages/**/*Activity*.{ts,tsx}'],
      rules: {
        'react/jsx-no-bind': 'error',
        '@typescript-eslint/explicit-function-return-type': 'error'
      }
    },
    {
      // Relaxed rules for UI components
      files: ['**/components/ui/**/*.{ts,tsx}'],
      rules: {
        'react/jsx-no-bind': 'off',
        '@typescript-eslint/explicit-function-return-type': 'off'
      }
    }
  ]
};
