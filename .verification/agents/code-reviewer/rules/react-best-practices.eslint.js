/**
 * React & TypeScript Best Practices ESLint Rules
 * Enforces modern React patterns, TypeScript strict typing, and component architecture
 *
 * Key areas:
 * - React component patterns
 * - TypeScript strict mode compliance
 * - Hooks best practices
 * - Component composition
 * - Code organization
 */

export default {
  plugins: ['react', 'react-hooks', '@typescript-eslint', 'react-refresh'],

  rules: {
    // ========================================
    // React Component Best Practices
    // ========================================

    // Prefer function components
    'react/prefer-stateless-function': 'warn',

    // Prevent missing React in scope (not needed in React 17+)
    'react/react-in-jsx-scope': 'off',

    // Prevent missing displayName
    'react/display-name': ['warn', {
      ignoreTranspilerName: false
    }],

    // Prevent duplicate props
    'react/jsx-no-duplicate-props': ['error', {
      ignoreCase: true
    }],

    // Prevent usage of unknown DOM properties
    'react/no-unknown-property': 'error',

    // Prevent unescaped entities
    'react/no-unescaped-entities': 'error',

    // Prevent invalid HTML attributes
    'react/no-invalid-html-attribute': 'error',

    // ========================================
    // React Hooks Best Practices
    // ========================================

    // Enforce rules of hooks
    'react-hooks/rules-of-hooks': 'error',

    // Warn about exhaustive dependencies
    'react-hooks/exhaustive-deps': 'warn',

    // ========================================
    // Component Refresh (Vite HMR)
    // ========================================

    // Only export components from files
    'react-refresh/only-export-components': ['warn', {
      allowConstantExport: true
    }],

    // ========================================
    // TypeScript Strict Mode
    // ========================================

    // Enforce consistent type definitions
    '@typescript-eslint/consistent-type-definitions': ['warn', 'interface'],

    // Enforce consistent type imports
    '@typescript-eslint/consistent-type-imports': ['warn', {
      prefer: 'type-imports',
      fixStyle: 'separate-type-imports'
    }],

    // Prevent unnecessary type arguments
    '@typescript-eslint/no-unnecessary-type-arguments': 'warn',

    // Prevent unnecessary type constraints
    '@typescript-eslint/no-unnecessary-type-constraint': 'error',

    // Require consistent naming conventions
    '@typescript-eslint/naming-convention': [
      'warn',
      {
        selector: 'interface',
        format: ['PascalCase'],
        custom: {
          regex: '^I[A-Z]',
          match: false
        }
      },
      {
        selector: 'typeAlias',
        format: ['PascalCase']
      },
      {
        selector: 'enum',
        format: ['PascalCase']
      },
      {
        selector: 'variable',
        format: ['camelCase', 'UPPER_CASE', 'PascalCase'],
        leadingUnderscore: 'allow'
      },
      {
        selector: 'function',
        format: ['camelCase', 'PascalCase']
      }
    ],

    // Prefer readonly arrays
    '@typescript-eslint/prefer-readonly': 'warn',

    // Prefer readonly parameters
    '@typescript-eslint/prefer-readonly-parameter-types': 'off', // Too strict for most cases

    // Prefer as const assertions
    '@typescript-eslint/prefer-as-const': 'error',

    // ========================================
    // Code Quality & Organization
    // ========================================

    // Prevent unused expressions
    '@typescript-eslint/no-unused-expressions': ['error', {
      allowShortCircuit: true,
      allowTernary: true,
      allowTaggedTemplates: true
    }],

    // Prevent empty functions
    '@typescript-eslint/no-empty-function': ['warn', {
      allow: ['arrowFunctions']
    }],

    // Require array callback return
    'array-callback-return': ['error', {
      checkForEach: false
    }],

    // Prevent unnecessary boolean casts
    'no-extra-boolean-cast': 'warn',

    // Prevent unnecessary semicolons
    '@typescript-eslint/no-extra-semi': 'error',

    // ========================================
    // JSX Best Practices
    // ========================================

    // Prevent missing key prop
    'react/jsx-key': ['error', {
      checkFragmentShorthand: true,
      checkKeyMustBeforeSpread: true,
      warnOnDuplicates: true
    }],

    // Enforce boolean attribute notation
    'react/jsx-boolean-value': ['warn', 'never'],

    // Enforce closing bracket location
    'react/jsx-closing-bracket-location': ['warn', 'line-aligned'],

    // Enforce closing tag location
    'react/jsx-closing-tag-location': 'warn',

    // Enforce curly braces in JSX
    'react/jsx-curly-brace-presence': ['warn', {
      props: 'never',
      children: 'never',
      propElementValues: 'always'
    }],

    // Enforce spaces in curly braces
    'react/jsx-curly-spacing': ['warn', {
      when: 'never',
      children: true
    }],

    // Enforce equals spacing in JSX
    'react/jsx-equals-spacing': ['warn', 'never'],

    // Enforce first prop placement
    'react/jsx-first-prop-new-line': ['warn', 'multiline-multiprop'],

    // Enforce props indentation
    'react/jsx-indent-props': ['warn', 2],

    // Enforce JSX indentation
    'react/jsx-indent': ['warn', 2],

    // Limit maximum props per line
    'react/jsx-max-props-per-line': ['warn', {
      maximum: 1,
      when: 'multiline'
    }],

    // Prevent comments as text nodes
    'react/jsx-no-comment-textnodes': 'error',

    // Prevent constructed context values (performance)
    'react/jsx-no-constructed-context-values': 'warn',

    // Prevent useless fragments
    'react/jsx-no-useless-fragment': ['warn', {
      allowExpressions: true
    }],

    // Enforce PascalCase for components
    'react/jsx-pascal-case': ['error', {
      allowAllCaps: true,
      ignore: []
    }],

    // Enforce props spacing
    'react/jsx-props-no-multi-spaces': 'warn',

    // Enforce tag spacing
    'react/jsx-tag-spacing': ['warn', {
      closingSlash: 'never',
      beforeSelfClosing: 'always',
      afterOpening: 'never',
      beforeClosing: 'never'
    }],

    // Prevent React to be marked as unused
    'react/jsx-uses-react': 'off', // Not needed in React 17+

    // Prevent variables used in JSX to be marked as unused
    'react/jsx-uses-vars': 'error',

    // Prevent missing parentheses around multiline JSX
    'react/jsx-wrap-multilines': ['warn', {
      declaration: 'parens-new-line',
      assignment: 'parens-new-line',
      return: 'parens-new-line',
      arrow: 'parens-new-line',
      condition: 'parens-new-line',
      logical: 'parens-new-line',
      prop: 'parens-new-line'
    }],

    // ========================================
    // State & Props Management
    // ========================================

    // Prevent direct mutation of state
    'react/no-direct-mutation-state': 'error',

    // Prevent this.state assignments
    'react/no-set-state': 'off',

    // Prevent string refs
    'react/no-string-refs': 'error',

    // Prevent children as props
    'react/no-children-prop': 'error',

    // Prevent adjacent inline elements without separation
    'react/no-adjacent-inline-elements': 'warn',

    // ========================================
    // Component Lifecycle & Performance
    // ========================================

    // Prevent usage of findDOMNode
    'react/no-find-dom-node': 'error',

    // Prevent usage of isMounted
    'react/no-is-mounted': 'error',

    // Prevent usage of deprecated methods
    'react/no-deprecated': 'error',

    // Prevent usage of unstable nested components
    'react/no-unstable-nested-components': ['error', {
      allowAsProps: true
    }],

    // Prevent namespace imports
    'react/no-namespace': 'error',

    // ========================================
    // TypeScript-React Integration
    // ========================================

    // Prevent TypeScript-specific issues
    '@typescript-eslint/no-non-null-assertion': 'warn',

    // Prevent non-null assertions
    '@typescript-eslint/no-non-null-asserted-optional-chain': 'error',

    // Prefer function types
    '@typescript-eslint/prefer-function-type': 'warn',

    // Prefer includes over indexOf
    '@typescript-eslint/prefer-includes': 'warn',

    // Prefer string starts/ends with
    '@typescript-eslint/prefer-string-starts-ends-with': 'warn',

    // Prefer reduce type parameter
    '@typescript-eslint/prefer-reduce-type-parameter': 'warn',

    // ========================================
    // Import Organization
    // ========================================

    // Sort imports (disable if using prettier-plugin-sort-imports)
    'sort-imports': ['off', {
      ignoreCase: false,
      ignoreDeclarationSort: true,
      ignoreMemberSort: false
    }],

    // Prevent duplicate exports
    'import/no-duplicates': 'off', // Handled by @typescript-eslint/no-duplicate-imports

    // ========================================
    // Code Style Consistency
    // ========================================

    // Require consistent quotes
    '@typescript-eslint/quotes': ['warn', 'single', {
      avoidEscape: true,
      allowTemplateLiterals: true
    }],

    // Require semicolons
    '@typescript-eslint/semi': ['warn', 'always'],

    // Require consistent comma spacing
    '@typescript-eslint/comma-spacing': 'warn',

    // Require consistent brace style
    '@typescript-eslint/brace-style': ['warn', '1tbs', {
      allowSingleLine: true
    }],

    // Require consistent indentation
    '@typescript-eslint/indent': ['warn', 2, {
      SwitchCase: 1
    }],

    // Require spacing in object literals
    '@typescript-eslint/object-curly-spacing': ['warn', 'always'],

    // Require spacing around keywords
    '@typescript-eslint/keyword-spacing': 'warn'
  },

  settings: {
    react: {
      version: 'detect'
    },
    'import/resolver': {
      typescript: true,
      node: true
    }
  },

  overrides: [
    {
      // Relaxed rules for config files
      files: ['*.config.{js,ts}', 'vite.config.ts'],
      rules: {
        '@typescript-eslint/naming-convention': 'off',
        'import/no-default-export': 'off'
      }
    },
    {
      // Page components can export default
      files: ['src/pages/**/*.{ts,tsx}'],
      rules: {
        'react-refresh/only-export-components': 'off'
      }
    }
  ]
};
