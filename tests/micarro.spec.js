// micarro.spec.js
const { test, expect } = require('@playwright/test');

test.describe('navegación y búsqueda en Tucarro.com.co', () => {

  test('Búsqueda de "Mazda3" y navegación a la página de resultados', async ({ page }) => {

    // 1. Navegar a la página principal.
    await page.goto('https://carros.tucarro.com.co/');
    await page.setViewportSize({ width: 1280, height: 720 });
    
    // 2. CERRAR EL POP-UP DE COOKIES, SI ESTÁ PRESENTE.
    const cookiesBanner = page.locator('text=Entendido');
    if (await cookiesBanner.isVisible()) {
      await cookiesBanner.click();
    }

    // 3. CERRAR EL POP-UP DE MERCADO LIBRE, SI ESTÁ PRESENTE.
    const keepHereButton = page.locator('text=Quedarme aquí');
    if (await keepHereButton.isVisible()) {
      await keepHereButton.click();
    }
    
    // 4. Llenar el campo de búsqueda.
    await page.locator('#cb1-edit').fill('Mazda3');

    // 5. Hacer clic en el botón de búsqueda.
    await page.locator('xpath=//div[@class="nav-icon-search"]').click();

    // 6. Esperar a que los resultados de la búsqueda carguen.
    await page.waitForSelector('text="Mazda3"');

  
    await expect(page).toHaveURL(/mazda3/);
    await expect(page.locator('h1')).toContainText('Mazda3');
  });
});