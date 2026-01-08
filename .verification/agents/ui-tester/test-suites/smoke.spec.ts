import { test, expect } from '@playwright/test';
import {
  HomePage,
  LessonsPage,
  DrawingPage,
  ThreeDPage,
} from '../helpers/page-objects';
import {
  waitForPageReady,
  monitorConsoleErrors,
  checkThreeJsCanvas,
} from '../helpers/test-utils';

/**
 * Smoke Tests for AI Kids Spark
 *
 * Critical path tests that must pass before deployment.
 * These tests verify core functionality and catch blocking issues.
 *
 * Priority: HIGHEST
 * Run on: Every push, PR, and scheduled test
 */

test.describe('Smoke Tests - Critical Path', () => {
  test.beforeEach(async ({ page }) => {
    // Monitor console errors throughout tests
    await monitorConsoleErrors(page);
  });

  test('should load home page successfully', async ({ page }) => {
    const homePage = new HomePage(page);

    // Navigate to home page
    await homePage.navigate();
    await waitForPageReady(page);

    // Verify page loads
    await expect(page).toHaveTitle(/ai-kids-spark/i);

    // Verify main sections are visible
    await expect(homePage.heroSection).toBeVisible();
    await expect(homePage.navigationMenu).toBeVisible();

    // Take screenshot for visual verification
    await page.screenshot({ path: 'screenshots/home-page.png' });
  });

  test('should display navigation menu', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.navigate();
    await waitForPageReady(page);

    // Verify navigation elements exist
    await expect(homePage.navigationMenu).toBeVisible();

    // Check that key navigation links/buttons are present
    const navLinks = await page.locator('nav a, nav button').count();
    expect(navLinks).toBeGreaterThan(0);
  });

  test('should navigate to lessons page', async ({ page }) => {
    const homePage = new HomePage(page);
    const lessonsPage = new LessonsPage(page);

    await homePage.navigate();
    await waitForPageReady(page);

    // Find and click lessons link
    const lessonsLink = page.locator('a[href*="lesson"], button:has-text("Lessons"), a:has-text("Lessons")').first();

    if (await lessonsLink.isVisible()) {
      await lessonsLink.click();
      await waitForPageReady(page);

      // Verify we're on lessons page
      const url = page.url();
      expect(url).toContain('lesson');

      // Verify lessons content loads
      const hasContent = await page.locator('main, [role="main"], article, .lesson').count() > 0;
      expect(hasContent).toBeTruthy();
    } else {
      test.skip();
    }
  });

  test('should load drawing canvas without errors', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.navigate();
    await waitForPageReady(page);

    // Find drawing/art link
    const drawingLink = page.locator('a[href*="draw"], a[href*="art"], button:has-text("Draw"), a:has-text("Art")').first();

    if (await drawingLink.isVisible()) {
      const consoleErrors: string[] = [];

      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text());
        }
      });

      page.on('pageerror', (error) => {
        consoleErrors.push(error.message);
      });

      await drawingLink.click();
      await waitForPageReady(page);

      // Wait for canvas to load
      await page.waitForTimeout(1000);

      // Verify canvas exists
      const canvas = page.locator('canvas');
      const canvasCount = await canvas.count();

      if (canvasCount > 0) {
        await expect(canvas.first()).toBeVisible();
      }

      // Check for critical errors
      const criticalErrors = consoleErrors.filter(
        (err) => !err.includes('favicon') && !err.includes('DevTools')
      );

      expect(criticalErrors.length).toBe(0);
    } else {
      test.skip();
    }
  });

  test('should load Three.js 3D scene without errors', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.navigate();
    await waitForPageReady(page);

    // Find 3D link
    const threeDLink = page.locator('a[href*="3d"], a[href*="three"], button:has-text("3D"), a:has-text("3D")').first();

    if (await threeDLink.isVisible()) {
      const consoleErrors: string[] = [];

      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text());
        }
      });

      await threeDLink.click();
      await waitForPageReady(page);

      // Wait for Three.js to initialize
      await page.waitForTimeout(2000);

      // Check if Three.js canvas is present
      const canvas = page.locator('canvas');
      const canvasCount = await canvas.count();

      if (canvasCount > 0) {
        await expect(canvas.first()).toBeVisible();

        // Verify WebGL context exists
        const hasWebGL = await checkThreeJsCanvas(page);
        expect(hasWebGL).toBeTruthy();
      }

      // Filter out non-critical errors
      const criticalErrors = consoleErrors.filter(
        (err) =>
          !err.includes('favicon') &&
          !err.includes('DevTools') &&
          !err.includes('Extension')
      );

      expect(criticalErrors.length).toBe(0);
    } else {
      test.skip();
    }
  });

  test('should not have console errors on home page', async ({ page }) => {
    const consoleErrors: string[] = [];
    const pageErrors: string[] = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    page.on('pageerror', (error) => {
      pageErrors.push(error.message);
    });

    const homePage = new HomePage(page);
    await homePage.navigate();
    await waitForPageReady(page);

    // Wait a bit to catch any delayed errors
    await page.waitForTimeout(2000);

    // Filter out known non-critical errors
    const criticalConsoleErrors = consoleErrors.filter(
      (err) =>
        !err.includes('favicon') &&
        !err.includes('DevTools') &&
        !err.includes('Extension') &&
        !err.toLowerCase().includes('third-party')
    );

    const criticalPageErrors = pageErrors.filter(
      (err) => !err.toLowerCase().includes('extension')
    );

    // Report errors if found
    if (criticalConsoleErrors.length > 0) {
      console.log('Console errors found:', criticalConsoleErrors);
    }

    if (criticalPageErrors.length > 0) {
      console.log('Page errors found:', criticalPageErrors);
    }

    expect(criticalConsoleErrors.length).toBe(0);
    expect(criticalPageErrors.length).toBe(0);
  });

  test('should render main content within acceptable time', async ({ page }) => {
    const homePage = new HomePage(page);

    const startTime = Date.now();

    await homePage.navigate();
    await waitForPageReady(page);

    const loadTime = Date.now() - startTime;

    // Verify page loads within 5 seconds
    expect(loadTime).toBeLessThan(5000);

    // Verify main content is visible
    const mainContent = page.locator('main, [role="main"], #root > div');
    await expect(mainContent.first()).toBeVisible();
  });

  test('should have accessible page structure', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.navigate();
    await waitForPageReady(page);

    // Check for semantic HTML
    const hasMain = await page.locator('main, [role="main"]').count() > 0;
    const hasNav = await page.locator('nav, [role="navigation"]').count() > 0;

    expect(hasMain).toBeTruthy();
    expect(hasNav).toBeTruthy();

    // Check for heading hierarchy
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBeGreaterThan(0);
  });

  test('should have working back navigation', async ({ page }) => {
    const homePage = new HomePage(page);

    await homePage.navigate();
    await waitForPageReady(page);

    const initialUrl = page.url();

    // Find any internal link
    const internalLink = page.locator('a[href^="/"], a[href^="./"]').first();

    if (await internalLink.isVisible()) {
      await internalLink.click();
      await waitForPageReady(page);

      const newUrl = page.url();

      // Navigate back
      await page.goBack();
      await waitForPageReady(page);

      const backUrl = page.url();

      // Verify we're back at the initial URL
      expect(backUrl).toBe(initialUrl);
    } else {
      test.skip();
    }
  });

  test('should load all critical resources', async ({ page }) => {
    const homePage = new HomePage(page);

    const failedResources: string[] = [];

    page.on('requestfailed', (request) => {
      const url = request.url();
      // Only track critical resources
      if (
        url.endsWith('.js') ||
        url.endsWith('.css') ||
        url.includes('/api/')
      ) {
        failedResources.push(url);
      }
    });

    await homePage.navigate();
    await waitForPageReady(page);

    // Wait for any delayed resource loading
    await page.waitForTimeout(2000);

    // Report failed resources
    if (failedResources.length > 0) {
      console.log('Failed to load resources:', failedResources);
    }

    expect(failedResources.length).toBe(0);
  });
});
