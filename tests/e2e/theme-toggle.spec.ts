import { test, expect } from '@playwright/test';

test.describe('Theme Toggle', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('should toggle between light and dark mode', async ({ page }) => {
    // Vérifier l'état initial (light mode par défaut)
    await expect(page.locator('.min-h-screen')).toHaveClass(/bg-white/);
    await expect(page.locator('.min-h-screen')).toHaveClass(/text-gray-900/);

    // Cliquer sur le bouton de thème
    const themeButton = page.locator('button[aria-label*="Basculer"]').first();
    await themeButton.click();

    // Attendre que le changement soit appliqué
    await page.waitForTimeout(500);

    // Vérifier que le mode sombre est activé
    await expect(page.locator('html')).toHaveClass('dark');
    await expect(page.locator('.min-h-screen')).toHaveClass(/bg-gray-900/);
    await expect(page.locator('.min-h-screen')).toHaveClass(/text-gray-100/);

    // Cliquer à nouveau pour revenir au mode clair
    await themeButton.click();
    await page.waitForTimeout(500);

    // Vérifier que le mode clair est activé
    await expect(page.locator('html')).not.toHaveClass('dark');
    await expect(page.locator('.min-h-screen')).toHaveClass(/bg-white/);
    await expect(page.locator('.min-h-screen')).toHaveClass(/text-gray-900/);
  });

  test('should persist theme preference', async ({ page }) => {
    // Basculer vers le mode sombre
    const themeButton = page.locator('button[aria-label*="Basculer"]').first();
    await themeButton.click();
    await page.waitForTimeout(500);

    // Vérifier que le mode sombre est activé
    await expect(page.locator('html')).toHaveClass('dark');

    // Recharger la page
    await page.reload();

    // Vérifier que le mode sombre est toujours activé
    await expect(page.locator('html')).toHaveClass('dark');
  });

  test('should apply correct colors in light mode', async ({ page }) => {
    // S'assurer que le mode clair est activé
    const html = page.locator('html');
    if (await html.evaluate(el => el.classList.contains('dark'))) {
      const themeButton = page
        .locator('button[aria-label*="Basculer"]')
        .first();
      await themeButton.click();
      await page.waitForTimeout(500);
    }

    // Vérifier les couleurs du mode clair
    await expect(page.locator('.min-h-screen')).toHaveClass(/bg-white/);
    await expect(page.locator('.min-h-screen')).toHaveClass(/text-gray-900/);

    // Vérifier que le titre est visible (noir sur blanc)
    const title = page.locator('h1');
    await expect(title).toBeVisible();
  });

  test('should apply correct colors in dark mode', async ({ page }) => {
    // Basculer vers le mode sombre
    const themeButton = page.locator('button[aria-label*="Basculer"]').first();
    await themeButton.click();
    await page.waitForTimeout(500);

    // Vérifier les couleurs du mode sombre
    await expect(page.locator('.min-h-screen')).toHaveClass(/bg-gray-900/);
    await expect(page.locator('.min-h-screen')).toHaveClass(/text-gray-100/);

    // Vérifier que le titre est visible (blanc sur gris foncé)
    const title = page.locator('h1');
    await expect(title).toBeVisible();
  });

  test('should have smooth transitions', async ({ page }) => {
    // Vérifier que les transitions sont appliquées
    await expect(page.locator('body')).toHaveClass(/transition-colors/);
    await expect(page.locator('body')).toHaveClass(/duration-200/);
  });
});
