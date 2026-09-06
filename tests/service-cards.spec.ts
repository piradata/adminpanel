import { expect, test } from '@playwright/test';

test.describe('Service Card Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');
  });

  test('text elements have user-select-none style', async ({ page }) => {
    const header = page.locator('h1');
    const hasStyle = await header.evaluate((el: HTMLElement) => el.style.userSelect === 'none');
    expect(hasStyle).toBe(true);
  });

  test('service cards are focusable', async ({ page }) => {
    const firstCard = page.locator('[data-service-card] a[href]').first();
    await firstCard.focus();
    const isFocused = await page.evaluate(() => document.activeElement?.tagName === 'A');
    expect(isFocused).toBe(true);
  });

  test('ArrowRight navigates between cards', async ({ page }) => {
    const cards = page.locator('[data-service-card] a[href]');
    if ((await cards.count()) < 2) test.skip();

    await cards.nth(0).focus();
    await page.keyboard.press('ArrowRight');
    await page.waitForTimeout(100);

    const index = await page.evaluate(() => {
      const focused = document.activeElement as HTMLAnchorElement;
      return Array.from(document.querySelectorAll('[data-service-card] a[href]')).indexOf(focused);
    });
    expect(index).toBeGreaterThan(0);
  });

  test('ArrowLeft navigates back', async ({ page }) => {
    const cards = page.locator('[data-service-card] a[href]');
    if ((await cards.count()) < 2) test.skip();

    await cards.nth(1).focus();
    await page.keyboard.press('ArrowLeft');
    await page.waitForTimeout(100);

    const index = await page.evaluate(() => {
      const focused = document.activeElement as HTMLAnchorElement;
      return Array.from(document.querySelectorAll('[data-service-card] a[href]')).indexOf(focused);
    });
    expect(index).toBe(0);
  });

  test('data-service-card attribute exists', async ({ page }) => {
    const wrappers = page.locator('[data-service-card]');
    const count = await wrappers.count();
    expect(count).toBeGreaterThan(0);
  });

});
