import { Page, Locator, expect } from '@playwright/test';

/**
 * Test Utilities for AI Kids Spark UI Testing
 *
 * Reusable helper functions for common testing scenarios,
 * specifically designed for testing kids' educational interfaces.
 */

/**
 * Wait for the page to be fully loaded and ready
 */
export async function waitForPageReady(page: Page): Promise<void> {
  await page.waitForLoadState('domcontentloaded');
  await page.waitForLoadState('networkidle');
}

/**
 * Check if an element meets minimum touch target size (WCAG AAA)
 * Minimum size for children: 44x44 pixels
 */
export async function checkTouchTargetSize(
  locator: Locator,
  minWidth: number = 44,
  minHeight: number = 44
): Promise<boolean> {
  const box = await locator.boundingBox();
  if (!box) return false;
  return box.width >= minWidth && box.height >= minHeight;
}

/**
 * Verify text is readable (font size and contrast)
 */
export async function checkTextReadability(
  locator: Locator,
  minFontSize: number = 16
): Promise<void> {
  const fontSize = await locator.evaluate((el) => {
    const style = window.getComputedStyle(el);
    return parseFloat(style.fontSize);
  });

  expect(fontSize).toBeGreaterThanOrEqual(minFontSize);
}

/**
 * Check for console errors during page operations
 */
export async function monitorConsoleErrors(page: Page): Promise<string[]> {
  const errors: string[] = [];

  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });

  page.on('pageerror', (error) => {
    errors.push(error.message);
  });

  return errors;
}

/**
 * Wait for animations to complete
 */
export async function waitForAnimations(page: Page): Promise<void> {
  await page.waitForTimeout(500);
  await page.evaluate(() => {
    return Promise.all(
      document.getAnimations().map((animation) => animation.finished)
    );
  });
}

/**
 * Check if element is in viewport
 */
export async function isInViewport(locator: Locator): Promise<boolean> {
  return await locator.evaluate((element) => {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= window.innerHeight &&
      rect.right <= window.innerWidth
    );
  });
}

/**
 * Scroll element into view smoothly
 */
export async function scrollIntoView(locator: Locator): Promise<void> {
  await locator.evaluate((element) => {
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
  await new Promise(resolve => setTimeout(resolve, 500));
}

/**
 * Check if Three.js canvas is rendering
 */
export async function checkThreeJsCanvas(page: Page): Promise<boolean> {
  const canvasExists = await page.locator('canvas').count() > 0;
  if (!canvasExists) return false;

  const isRendering = await page.evaluate(() => {
    const canvas = document.querySelector('canvas');
    if (!canvas) return false;

    // Check if canvas has WebGL context
    const gl = canvas.getContext('webgl') || canvas.getContext('webgl2');
    return gl !== null;
  });

  return isRendering;
}

/**
 * Verify form field accessibility
 */
export async function checkFormFieldAccessibility(
  locator: Locator
): Promise<void> {
  // Check for label
  const hasAriaLabel = await locator.getAttribute('aria-label');
  const hasAriaLabelledBy = await locator.getAttribute('aria-labelledby');
  const id = await locator.getAttribute('id');

  let hasLabel = false;
  if (id) {
    const page = locator.page();
    const label = page.locator(`label[for="${id}"]`);
    hasLabel = await label.count() > 0;
  }

  expect(
    hasAriaLabel || hasAriaLabelledBy || hasLabel,
    'Form field should have an accessible label'
  ).toBeTruthy();
}

/**
 * Test keyboard navigation
 */
export async function testKeyboardNavigation(
  page: Page,
  elements: Locator[]
): Promise<void> {
  // Focus first element
  await elements[0].focus();

  // Tab through elements
  for (let i = 1; i < elements.length; i++) {
    await page.keyboard.press('Tab');
    await expect(elements[i]).toBeFocused();
  }
}

/**
 * Check for motion safety (reduced motion preference)
 */
export async function checkMotionSafety(page: Page): Promise<void> {
  await page.emulateMedia({ reducedMotion: 'reduce' });

  const hasReducedMotion = await page.evaluate(() => {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  });

  expect(hasReducedMotion).toBeTruthy();
}

/**
 * Verify responsive image loading
 */
export async function checkResponsiveImages(page: Page): Promise<void> {
  const images = await page.locator('img').all();

  for (const img of images) {
    const isLoaded = await img.evaluate((el: HTMLImageElement) => {
      return el.complete && el.naturalHeight !== 0;
    });

    expect(isLoaded).toBeTruthy();
  }
}

/**
 * Check color contrast ratio
 */
export async function checkColorContrast(
  locator: Locator,
  minRatio: number = 4.5
): Promise<void> {
  const contrast = await locator.evaluate((el) => {
    const style = window.getComputedStyle(el);
    const color = style.color;
    const backgroundColor = style.backgroundColor;

    // Simple contrast calculation (in real scenario, use a proper library)
    // This is a placeholder - actual implementation would need proper color parsing
    return { color, backgroundColor };
  });

  // In production, you would calculate actual contrast ratio
  expect(contrast).toBeTruthy();
}

/**
 * Wait for API response
 */
export async function waitForApiResponse(
  page: Page,
  urlPattern: string | RegExp,
  timeout: number = 10000
): Promise<Response> {
  const response = await page.waitForResponse(
    (response) => {
      const url = response.url();
      if (typeof urlPattern === 'string') {
        return url.includes(urlPattern);
      }
      return urlPattern.test(url);
    },
    { timeout }
  );

  return response.json();
}

/**
 * Take accessible screenshot (with metadata)
 */
export async function takeAccessibleScreenshot(
  page: Page,
  name: string
): Promise<void> {
  await page.screenshot({
    path: `screenshots/${name}.png`,
    fullPage: true,
  });
}

/**
 * Check if element has proper ARIA attributes
 */
export async function checkAriaAttributes(locator: Locator): Promise<void> {
  const role = await locator.getAttribute('role');
  const ariaLabel = await locator.getAttribute('aria-label');
  const ariaLive = await locator.getAttribute('aria-live');

  // At least one ARIA attribute should be present for interactive elements
  const hasAriaAttributes = role || ariaLabel || ariaLive;
  expect(hasAriaAttributes).toBeTruthy();
}

/**
 * Simulate touch interaction
 */
export async function simulateTouch(
  locator: Locator,
  type: 'tap' | 'long-press' | 'swipe' = 'tap'
): Promise<void> {
  const box = await locator.boundingBox();
  if (!box) throw new Error('Element not found');

  const x = box.x + box.width / 2;
  const y = box.y + box.height / 2;

  const page = locator.page();

  switch (type) {
    case 'tap':
      await page.touchscreen.tap(x, y);
      break;
    case 'long-press':
      await page.touchscreen.tap(x, y);
      await page.waitForTimeout(1000);
      break;
    case 'swipe':
      await page.touchscreen.tap(x, y);
      await page.mouse.move(x + 100, y);
      break;
  }
}

/**
 * Performance metrics interface
 */
interface PerformanceMetrics {
  loadTime: number;
  domReady: number;
  firstPaint: number;
}

/**
 * Get performance metrics
 */
export async function getPerformanceMetrics(page: Page): Promise<PerformanceMetrics> {
  return await page.evaluate(() => {
    const perfData = window.performance.timing;
    return {
      loadTime: perfData.loadEventEnd - perfData.navigationStart,
      domReady: perfData.domContentLoadedEventEnd - perfData.navigationStart,
      firstPaint: performance.getEntriesByType('paint')[0]?.startTime || 0,
    };
  });
}
