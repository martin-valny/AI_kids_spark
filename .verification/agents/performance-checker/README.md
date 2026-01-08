# Performance Checker Agent

Automated performance monitoring and optimization for AI Kids Spark. This agent runs Lighthouse audits, analyzes bundle sizes, and checks image optimization to ensure fast, accessible experiences for young learners.

## Directory Structure

```
performance-checker/
├── agent.config.json          # Main agent configuration
├── benchmarks/
│   ├── baseline.json         # Performance baselines for all pages
│   └── thresholds.json       # Performance thresholds and budgets
├── scripts/
│   ├── lighthouse-audit.js   # Lighthouse performance audits
│   ├── bundle-analysis.js    # Bundle size analysis
│   └── image-audit.js        # Image optimization checks
└── reports/                  # Generated reports (auto-created)
```

## Configuration Files

### 1. agent.config.json
Main configuration with:
- Lighthouse settings (desktop/mobile)
- Performance thresholds (Performance: 85, Accessibility: 95)
- Resource budgets (JS: 400kb, CSS: 100kb, LCP: 2500ms)
- Web Vitals thresholds (LCP, FID, CLS, FCP, TBT, SI, TTI)
- Kids-specific requirements (font size, touch targets, contrast)

### 2. lighthouse.config.js
Lighthouse CI configuration for:
- Test URLs: /, /lessons, /activities/*, /lessons/intro-to-ai
- Assertions for performance, accessibility, best-practices, SEO
- Web Vitals thresholds
- Kids-specific checks (color contrast, responsive images, errors)
- Resource budgets
- Both desktop and mobile configurations

### 3. baseline.json
Performance baselines for tracking:
- Historical metrics for all pages
- Global averages
- Trend analysis
- Used for regression detection

### 4. thresholds.json
Comprehensive thresholds for:
- Lighthouse scores (performance, accessibility, best-practices, SEO)
- Web Vitals (LCP, FID, CLS, FCP, TBT, SI, TTI)
- Resource budgets (JS, CSS, images, fonts, total)
- Kids-specific requirements
- Network requests
- Caching policies
- Regression limits

## Scripts

### lighthouse-audit.js
Runs comprehensive Lighthouse audits on all pages.

**Features:**
- Desktop and mobile testing
- Web Vitals measurement
- Resource size analysis
- Threshold validation
- HTML and JSON reports
- Console error detection

**Usage:**
```bash
node .verification/agents/performance-checker/scripts/lighthouse-audit.js
```

**Requirements:**
- Chrome/Chromium installed
- Dev server running on localhost:5173
- npm packages: lighthouse, chrome-launcher

### bundle-analysis.js
Analyzes JavaScript and CSS bundle sizes.

**Features:**
- JavaScript bundle analysis
- CSS bundle analysis
- Font file analysis
- Duplicate dependency detection
- Code splitting analysis
- Tree map visualization (with rollup-plugin-visualizer)
- Budget validation

**Usage:**
```bash
# Build first
npm run build

# Run analysis
node .verification/agents/performance-checker/scripts/bundle-analysis.js
```

**Requirements:**
- Built dist/ directory
- npm packages: glob

### image-audit.js
Comprehensive image optimization audit.

**Features:**
- File size analysis
- Format optimization (WebP, AVIF recommendations)
- Dimension checking
- Alt text coverage
- Lazy loading implementation check
- Retina image detection
- Accessibility compliance

**Usage:**
```bash
node .verification/agents/performance-checker/scripts/image-audit.js
```

**Requirements:**
- npm packages: glob, image-size

## Performance Budgets

### Resource Budgets
- **JavaScript:** 400kb (error), 350kb (warning), 300kb (target)
- **CSS:** 100kb (error), 80kb (warning), 60kb (target)
- **Images:** 1000kb per page (error), 800kb (warning)
- **Fonts:** 150kb (error), 120kb (warning)
- **Total:** 2000kb per page (error), 1500kb (warning)

### Web Vitals Targets
- **LCP (Largest Contentful Paint):** < 2500ms (good), < 4000ms (acceptable)
- **FID (First Input Delay):** < 100ms (good), < 300ms (acceptable)
- **CLS (Cumulative Layout Shift):** < 0.1 (good), < 0.25 (acceptable)
- **FCP (First Contentful Paint):** < 1800ms (good), < 3000ms (acceptable)
- **TBT (Total Blocking Time):** < 300ms (good), < 600ms (acceptable)

### Lighthouse Score Thresholds
- **Performance:** 85 (error), 90 (warning), 95 (target)
- **Accessibility:** 95 (error), 97 (warning), 100 (target)
- **Best Practices:** 90 (error), 93 (warning), 100 (target)
- **SEO:** 90 (error), 95 (warning), 100 (target)

## Kids-Specific Requirements

- **Font Size:** Minimum 16px
- **Touch Targets:** Minimum 44px (WCAG AA compliance)
- **Color Contrast:** Minimum 4.5:1 ratio
- **Animation Duration:** Maximum 3000ms
- **Console Errors:** 0 allowed
- **Image Alt Text:** 100% coverage required

## Running Performance Checks

### Quick Check
```bash
# Lighthouse audit only
npm run perf:lighthouse
```

### Full Analysis
```bash
# Build and run all checks
npm run build
npm run perf:full
```

### Individual Checks
```bash
# Lighthouse only
node .verification/agents/performance-checker/scripts/lighthouse-audit.js

# Bundle analysis
node .verification/agents/performance-checker/scripts/bundle-analysis.js

# Image audit
node .verification/agents/performance-checker/scripts/image-audit.js
```

## Reports

All reports are saved to `.verification/reports/performance/`:
- `summary-{timestamp}.json` - Overall performance summary
- `report-{timestamp}.html` - Visual HTML report
- `lighthouse-{page}-{timestamp}.html` - Individual Lighthouse reports
- `bundle-analysis-{timestamp}.json/html` - Bundle size analysis
- `image-audit-{timestamp}.json/html` - Image optimization report

## Integration with CI/CD

### GitHub Actions Example
```yaml
- name: Performance Check
  run: |
    npm run build
    npm run dev &
    sleep 5
    node .verification/agents/performance-checker/scripts/lighthouse-audit.js
    node .verification/agents/performance-checker/scripts/bundle-analysis.js
    node .verification/agents/performance-checker/scripts/image-audit.js
```

## Troubleshooting

### "Dist directory not found"
Run `npm run build` before bundle analysis.

### "Chrome not found"
Install Chrome/Chromium:
```bash
# Ubuntu/Debian
sudo apt-get install chromium-browser

# macOS
brew install --cask google-chrome
```

### "Cannot connect to localhost:5173"
Start the dev server:
```bash
npm run dev
```

### Missing dependencies
Install required packages:
```bash
npm install --save-dev lighthouse chrome-launcher glob image-size rollup-plugin-visualizer
```

## Best Practices

1. **Run before commits:** Catch performance regressions early
2. **Monitor trends:** Track performance over time using baselines
3. **Fix errors first:** Address error-level violations before warnings
4. **Optimize images:** Convert to WebP, compress, add alt text
5. **Code splitting:** Use dynamic imports for large components
6. **Lazy loading:** Implement for below-the-fold content
7. **Bundle analysis:** Regularly check for duplicate dependencies

## Package.json Scripts

Add these scripts to your `package.json`:

```json
{
  "scripts": {
    "perf:lighthouse": "node .verification/agents/performance-checker/scripts/lighthouse-audit.js",
    "perf:bundle": "npm run build && node .verification/agents/performance-checker/scripts/bundle-analysis.js",
    "perf:images": "node .verification/agents/performance-checker/scripts/image-audit.js",
    "perf:full": "npm run perf:lighthouse && npm run perf:bundle && npm run perf:images",
    "perf:check": "npm run perf:full"
  }
}
```

## Support

For issues or questions about the Performance Checker Agent, refer to:
- Lighthouse documentation: https://developers.google.com/web/tools/lighthouse
- Web Vitals: https://web.dev/vitals/
- WCAG Guidelines: https://www.w3.org/WAI/WCAG21/quickref/
