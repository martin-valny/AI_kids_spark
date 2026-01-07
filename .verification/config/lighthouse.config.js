/**
 * Lighthouse CI Configuration for AI Kids Spark
 *
 * This configuration ensures optimal performance, accessibility,
 * and user experience for young learners.
 */

module.exports = {
  ci: {
    collect: {
      // Number of runs per URL to get consistent results
      numberOfRuns: 3,

      // URLs to test
      url: [
        'http://localhost:5173/',
        'http://localhost:5173/lessons',
        'http://localhost:5173/activities/pattern-detective',
        'http://localhost:5173/activities/draw-ai-friend',
        'http://localhost:5173/lessons/intro-to-ai'
      ],

      // Lighthouse settings
      settings: {
        onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
        skipAudits: ['uses-http2', 'redirects-http'],

        // Desktop configuration
        formFactor: 'desktop',
        throttling: {
          rttMs: 40,
          throughputKbps: 10240,
          cpuSlowdownMultiplier: 1
        },
        screenEmulation: {
          mobile: false,
          width: 1350,
          height: 940,
          deviceScaleFactor: 1
        }
      },

      // Start local server if needed
      startServerCommand: 'npm run dev',
      startServerReadyPattern: 'Local:',
      startServerReadyTimeout: 30000
    },

    assert: {
      preset: 'lighthouse:no-pwa',

      assertions: {
        // Performance assertions
        'categories:performance': ['error', { minScore: 0.85 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['error', { minScore: 0.90 }],
        'categories:seo': ['error', { minScore: 0.90 }],

        // Web Vitals - Critical for kids' experience
        'largest-contentful-paint': ['error', { maxNumericValue: 2500 }],
        'first-contentful-paint': ['error', { maxNumericValue: 1800 }],
        'cumulative-layout-shift': ['error', { maxNumericValue: 0.1 }],
        'total-blocking-time': ['error', { maxNumericValue: 300 }],
        'speed-index': ['warn', { maxNumericValue: 3400 }],
        'interactive': ['warn', { maxNumericValue: 3800 }],

        // Resource budgets
        'resource-summary:script:size': ['error', { maxNumericValue: 409600 }], // 400kb
        'resource-summary:stylesheet:size': ['error', { maxNumericValue: 102400 }], // 100kb
        'resource-summary:image:size': ['warn', { maxNumericValue: 1024000 }], // 1MB
        'resource-summary:total:size': ['warn', { maxNumericValue: 2048000 }], // 2MB

        // Kids-specific accessibility checks
        'color-contrast': ['error', { minScore: 1.0 }],
        'document-title': ['error', { minScore: 1.0 }],
        'html-has-lang': ['error', { minScore: 1.0 }],
        'meta-description': ['warn', { minScore: 1.0 }],
        'viewport': ['error', { minScore: 1.0 }],

        // Image optimization - Important for kids content
        'modern-image-formats': ['warn', { maxLength: 0 }],
        'uses-optimized-images': ['warn', { maxLength: 0 }],
        'uses-responsive-images': ['warn', { maxLength: 0 }],
        'offscreen-images': ['warn', { maxLength: 0 }],

        // JavaScript optimization
        'unused-javascript': ['warn', { maxLength: 0 }],
        'uses-rel-preconnect': ['warn', { maxLength: 0 }],
        'uses-text-compression': ['error', { minScore: 1.0 }],

        // Font optimization
        'font-display': ['warn', { minScore: 1.0 }],
        'preload-fonts': ['warn', { maxLength: 0 }],

        // User experience
        'errors-in-console': ['error', { maxLength: 0 }],
        'no-document-write': ['error', { minScore: 1.0 }],
        'geolocation-on-start': ['error', { minScore: 1.0 }],
        'notification-on-start': ['error', { minScore: 1.0 }],

        // Best practices for kids
        'is-on-https': ['warn', { minScore: 1.0 }],
        'uses-passive-event-listeners': ['warn', { minScore: 1.0 }],
        'no-vulnerable-libraries': ['error', { minScore: 1.0 }],

        // Mobile-friendly (important even on desktop)
        'tap-targets': ['warn', { minScore: 0.9 }],
        'content-width': ['error', { minScore: 1.0 }]
      }
    },

    upload: {
      target: 'temporary-public-storage',
      reportFilenamePattern: '%%PATHNAME%%-%%DATETIME%%-report.%%EXTENSION%%'
    },

    server: {
      // Optional: Configure LHCI server for historical tracking
      // target: 'lhci',
      // serverBaseUrl: 'http://localhost:9001',
      // token: 'your-build-token'
    }
  }
};

/**
 * Mobile configuration (export separately or switch in CI)
 */
const mobileConfig = {
  ci: {
    collect: {
      numberOfRuns: 3,
      url: [
        'http://localhost:5173/',
        'http://localhost:5173/lessons',
        'http://localhost:5173/activities/pattern-detective',
        'http://localhost:5173/activities/draw-ai-friend',
        'http://localhost:5173/lessons/intro-to-ai'
      ],
      settings: {
        onlyCategories: ['performance', 'accessibility', 'best-practices', 'seo'],
        formFactor: 'mobile',
        throttling: {
          rttMs: 150,
          throughputKbps: 1638.4,
          cpuSlowdownMultiplier: 4
        },
        screenEmulation: {
          mobile: true,
          width: 375,
          height: 667,
          deviceScaleFactor: 2
        }
      }
    },
    assert: {
      // Same assertions as desktop but slightly relaxed performance
      assertions: {
        'categories:performance': ['error', { minScore: 0.75 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'largest-contentful-paint': ['error', { maxNumericValue: 4000 }],
        'first-contentful-paint': ['error', { maxNumericValue: 2500 }]
      }
    }
  }
};

module.exports.mobileConfig = mobileConfig;
