/**
 * Accessibility ESLint Rules for AI Kids Spark
 * Focuses on WCAG 2.1 AA compliance with kid-friendly enhancements
 *
 * Key areas:
 * - Image accessibility (alt text required)
 * - ARIA attributes validation
 * - Color contrast requirements
 * - Keyboard navigation support
 * - Focus management for kids
 * - Screen reader compatibility
 */

export default {
  plugins: ['jsx-a11y'],

  rules: {
    // ========================================
    // Image & Media Accessibility
    // ========================================

    // Require alt text on images - CRITICAL for screen readers and educational context
    'jsx-a11y/alt-text': ['error', {
      elements: ['img', 'object', 'area', 'input[type="image"]'],
      img: ['Image'],
      object: ['Object'],
      area: ['Area'],
      'input[type="image"]': ['InputImage']
    }],

    // Ensure images don't have redundant alt text
    'jsx-a11y/img-redundant-alt': ['warn', {
      components: ['Image'],
      words: ['image', 'photo', 'picture']
    }],

    // Media elements must have captions for kids who need them
    'jsx-a11y/media-has-caption': ['error', {
      audio: ['Audio'],
      video: ['Video'],
      track: ['Track']
    }],

    // ========================================
    // ARIA Attributes & Roles
    // ========================================

    // Ensure ARIA props are valid
    'jsx-a11y/aria-props': 'error',

    // Ensure ARIA prop values are valid
    'jsx-a11y/aria-proptypes': 'error',

    // Ensure ARIA state and property values are valid
    'jsx-a11y/aria-unsupported-elements': 'error',

    // Ensure ARIA roles are valid and appropriate
    'jsx-a11y/role-has-required-aria-props': 'error',

    // Ensure elements with ARIA roles have required props
    'jsx-a11y/role-supports-aria-props': 'error',

    // Prevent invalid ARIA roles
    'jsx-a11y/aria-role': ['error', {
      allowedInvalidRoles: [],
      ignoreNonDOM: true
    }],

    // ========================================
    // Interactive Elements & Focus Management
    // ========================================

    // Prevent autofocus (can be disorienting for kids and screen reader users)
    'jsx-a11y/no-autofocus': ['error', {
      ignoreNonDOM: true
    }],

    // Require interactive elements to be focusable
    'jsx-a11y/interactive-supports-focus': ['error', {
      tabbable: [
        'button',
        'checkbox',
        'link',
        'searchbox',
        'spinbutton',
        'switch',
        'textbox'
      ]
    }],

    // Click events should have keyboard equivalent
    'jsx-a11y/click-events-have-key-events': 'error',

    // Mouse events should have focus events
    'jsx-a11y/mouse-events-have-key-events': 'error',

    // No access key (can conflict with screen readers)
    'jsx-a11y/no-access-key': 'error',

    // ========================================
    // Form Accessibility
    // ========================================

    // Ensure form controls have labels
    'jsx-a11y/label-has-associated-control': ['error', {
      labelComponents: ['Label'],
      labelAttributes: ['label'],
      controlComponents: ['Input', 'Textarea', 'Select'],
      depth: 3
    }],

    // Ensure autocomplete attributes are valid
    'jsx-a11y/autocomplete-valid': ['error', {
      inputComponents: ['Input']
    }],

    // ========================================
    // Headings & Document Structure
    // ========================================

    // Ensure heading hierarchy is logical (important for navigation)
    'jsx-a11y/heading-has-content': ['error', {
      components: ['Heading', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6']
    }],

    // Ensure HTML has lang attribute
    'jsx-a11y/html-has-lang': 'error',

    // Ensure lang attribute is valid
    'jsx-a11y/lang': 'error',

    // ========================================
    // Interactive Content Rules
    // ========================================

    // Anchors must have content or aria-label
    'jsx-a11y/anchor-has-content': ['error', {
      components: ['Link', 'Anchor']
    }],

    // Anchors should be valid (href or role)
    'jsx-a11y/anchor-is-valid': ['error', {
      components: ['Link'],
      specialLink: ['to'],
      aspects: ['invalidHref', 'preferButton']
    }],

    // No distracting elements (marquee, blink)
    'jsx-a11y/no-distracting-elements': 'error',

    // ========================================
    // Keyboard Navigation
    // ========================================

    // Non-interactive elements should not have interactive handlers
    'jsx-a11y/no-noninteractive-element-interactions': ['error', {
      handlers: [
        'onClick',
        'onMouseDown',
        'onMouseUp',
        'onKeyPress',
        'onKeyDown',
        'onKeyUp'
      ]
    }],

    // Non-interactive tabindex should be avoided
    'jsx-a11y/no-noninteractive-tabindex': ['error', {
      tags: [],
      roles: ['tabpanel']
    }],

    // Static elements should not have event handlers
    'jsx-a11y/no-static-element-interactions': ['error', {
      handlers: [
        'onClick',
        'onMouseDown',
        'onMouseUp',
        'onKeyPress',
        'onKeyDown',
        'onKeyUp'
      ]
    }],

    // Positive tabindex is discouraged
    'jsx-a11y/tabindex-no-positive': 'error',

    // ========================================
    // Scope & Context
    // ========================================

    // Ensure scope is only used on th elements
    'jsx-a11y/scope': 'error',

    // Ensure iframe has title
    'jsx-a11y/iframe-has-title': 'error',

    // ========================================
    // Kids-Specific Enhancements (Warnings)
    // ========================================

    // Prefer explicit role over implicit semantics for clarity
    'jsx-a11y/prefer-tag-over-role': 'warn',

    // No redundant roles
    'jsx-a11y/no-redundant-roles': 'warn'
  },

  settings: {
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
        Audio: 'audio'
      }
    }
  }
};
