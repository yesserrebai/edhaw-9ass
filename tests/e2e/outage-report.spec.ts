import { test, expect } from '@playwright/test';

test.describe('Outage Report Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
  });

  test('should load the main page', async ({ page }) => {
    // Verify page loads with correct title
    await expect(page.locator('h1')).toContainText('Edhaw 9as');
    await expect(page.locator('p')).toContainText(
      'Application de signalement de coupures'
    );
  });

  test('should request location permission', async ({ page }) => {
    // Verify location request message appears
    await expect(
      page.locator('text=Demande de votre localisation')
    ).toBeVisible();
  });

  test('should show location success message', async ({ page }) => {
    // Mock geolocation to return success
    await page.addInitScript(() => {
      const mockGeolocation = {
        getCurrentPosition: (success: any) => {
          success({
            coords: {
              latitude: 36.8065,
              longitude: 10.1815,
            },
          });
        },
      };
      Object.defineProperty(navigator, 'geolocation', {
        value: mockGeolocation,
      });
    });

    // Mock fetch for geocoding
    await page.route('**/nominatim.openstreetmap.org/**', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          display_name: 'Tunis, Tunisia',
        }),
      });
    });

    // Wait for location success message
    await expect(
      page.locator('text=Localisation récupérée avec succès')
    ).toBeVisible();
  });

  test('should show report button after location success', async ({ page }) => {
    // Mock geolocation
    await page.addInitScript(() => {
      const mockGeolocation = {
        getCurrentPosition: (success: any) => {
          success({
            coords: {
              latitude: 36.8065,
              longitude: 10.1815,
            },
          });
        },
      };
      Object.defineProperty(navigator, 'geolocation', {
        value: mockGeolocation,
      });
    });

    // Mock fetch
    await page.route('**/nominatim.openstreetmap.org/**', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          display_name: 'Tunis, Tunisia',
        }),
      });
    });

    // Wait for report button to appear
    await expect(page.locator('text=Signaler une Coupure')).toBeVisible();
  });

  test('should open report options when button is clicked', async ({
    page,
  }) => {
    // Mock geolocation and fetch as above
    await page.addInitScript(() => {
      const mockGeolocation = {
        getCurrentPosition: (success: any) => {
          success({
            coords: {
              latitude: 36.8065,
              longitude: 10.1815,
            },
          });
        },
      };
      Object.defineProperty(navigator, 'geolocation', {
        value: mockGeolocation,
      });
    });

    await page.route('**/nominatim.openstreetmap.org/**', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          display_name: 'Tunis, Tunisia',
        }),
      });
    });

    // Click report button
    await page.locator('text=Signaler une Coupure').click();

    // Verify options appear
    await expect(page.locator('text=Maintenant')).toBeVisible();
    await expect(page.locator('text=Récemment')).toBeVisible();
    await expect(page.locator('text=Plus tôt')).toBeVisible();
  });

  test('should create report when option is selected', async ({ page }) => {
    // Mock geolocation and fetch
    await page.addInitScript(() => {
      const mockGeolocation = {
        getCurrentPosition: (success: any) => {
          success({
            coords: {
              latitude: 36.8065,
              longitude: 10.1815,
            },
          });
        },
      };
      Object.defineProperty(navigator, 'geolocation', {
        value: mockGeolocation,
      });
    });

    await page.route('**/nominatim.openstreetmap.org/**', async route => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          display_name: 'Tunis, Tunisia',
        }),
      });
    });

    // Click report button and select option
    await page.locator('text=Signaler une Coupure').click();
    await page.locator('text=Maintenant').click();

    // Verify report appears in table
    await expect(page.locator('text=Rapports de Coupures')).toBeVisible();
  });

  test('should display chart and table sections', async ({ page }) => {
    // Verify both sections are present
    await expect(page.locator('text=Statistiques des Coupures')).toBeVisible();
    await expect(page.locator('text=Rapports de Coupures')).toBeVisible();
  });

  test('should switch language', async ({ page }) => {
    // Find and click language selector
    await page.locator('select').click();
    await page.selectOption('select', 'en');

    // Verify English text appears
    await expect(
      page.locator('text=Electricity outage reporting')
    ).toBeVisible();

    // Switch to Arabic
    await page.locator('select').click();
    await page.selectOption('select', 'ar');

    // Verify Arabic text appears
    await expect(
      page.locator('text=تطبيق الإبلاغ عن انقطاع الكهرباء في تونس')
    ).toBeVisible();
  });

  test('should toggle theme', async ({ page }) => {
    await page.goto('/');

    // Verify page loads
    await expect(page.locator('h1')).toContainText('Edhaw 9as');

    // Look for theme toggle button (any button with SVG icon)
    await expect(page.locator('button svg')).toBeVisible();

    // Get initial theme state
    const initialTheme = await page.evaluate(() => {
      return document.documentElement.classList.contains('dark')
        ? 'dark'
        : 'light';
    });

    // Click theme toggle (find button with SVG and click it)
    const themeButton = page.locator('button svg').first();
    await themeButton.click();

    // Wait for theme change
    await page.waitForTimeout(500);

    // Verify theme changed
    const newTheme = await page.evaluate(() => {
      return document.documentElement.classList.contains('dark')
        ? 'dark'
        : 'light';
    });

    expect(newTheme).not.toBe(initialTheme);

    // Click again to toggle back
    await themeButton.click();

    // Wait for theme change
    await page.waitForTimeout(500);

    // Verify theme changed back
    const finalTheme = await page.evaluate(() => {
      return document.documentElement.classList.contains('dark')
        ? 'dark'
        : 'light';
    });

    expect(finalTheme).toBe(initialTheme);
  });

  test('should persist theme preference', async ({ page }) => {
    await page.goto('/');

    // Toggle to dark mode
    const themeButton = page.locator('button svg').first();
    await themeButton.click();
    await page.waitForTimeout(500);

    // Verify dark mode is applied
    const isDark = await page.evaluate(() => {
      return document.documentElement.classList.contains('dark');
    });
    expect(isDark).toBe(true);

    // Reload page
    await page.reload();

    // Verify theme persists
    const isStillDark = await page.evaluate(() => {
      return document.documentElement.classList.contains('dark');
    });
    expect(isStillDark).toBe(true);
  });

  test('should have proper theme classes on elements', async ({ page }) => {
    await page.goto('/');

    // Check light mode classes on main container
    await expect(page.locator('.min-h-screen')).toHaveClass(/bg-white/);
    await expect(page.locator('.min-h-screen')).toHaveClass(/text-gray-900/);

    // Toggle to dark mode
    const themeButton = page.locator('button svg').first();
    await themeButton.click();
    await page.waitForTimeout(500);

    // Check dark mode classes
    await expect(page.locator('.min-h-screen')).toHaveClass(/bg-gray-900/);
    await expect(page.locator('.min-h-screen')).toHaveClass(/text-gray-100/);
  });
});
