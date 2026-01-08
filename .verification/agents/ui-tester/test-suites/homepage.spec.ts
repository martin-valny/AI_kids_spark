import { test, expect } from '@playwright/test';

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
