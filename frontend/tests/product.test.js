// tests/product.test.js
import { test, expect } from '@playwright/test';

test('Produkti tiek izvadīti', async ({ page }) => {
  await page.goto('http://localhost:5173');
  await page.click('.shop-button'); 
  await page.click('text=Sveces'); // Navigates to the "Sveces" section

  // Validate that the "Pievienot grozam" button exists
  const addToCartButton = await page.locator('.add-to-cart-button').first();
  await expect(addToCartButton).toBeVisible();
});

test('Produktu ir iespējams pievienot grozam', async ({ page }) => {
    await page.goto('http://localhost:5173');
    await page.click('.shop-button');
    await page.click('text=Sveces');
  
    // Add the first product to the cart
    const addToCartButton = await page.locator('.add-to-cart-button').first();
    await addToCartButton.click();
  
    // Navigate to the cart page
    await page.click('.view-cart-button'); 
  
    const removeCartButton = await page.locator('.remove-from-cart').first();
    await expect(removeCartButton).toBeVisible();  
});

test('Person can complete purchase', async ({ page }) => {
    // Go to the main shop page
    await page.goto('http://localhost:5173');
    await page.click('.shop-button');
    await page.click('text=Sveces'); 

    // Add product to the cart
    const addToCartButton = await page.locator('.add-to-cart-button').first();
    await expect(addToCartButton).toBeVisible({ timeout: 5000 });
    await addToCartButton.click();

    // Navigate to the cart page
    const viewCartButton = await page.locator('.view-cart-button');
    await expect(viewCartButton).toBeVisible({ timeout: 5000 });
    await viewCartButton.click();

    // Proceed to checkout
    const checkoutButton = await page.locator('.checkout-button');
    await expect(checkoutButton).toBeVisible({ timeout: 5000 });
    await checkoutButton.click();

    // Wait for the checkout confirmation page to load (adjust URL or title as needed)
    await page.waitForURL(/\/checkout\/confirmation/, { timeout: 15000 });
    await page.waitForLoadState('networkidle');

    // Validate the presence of a confirmation message
    const confirmationMessage = await page.locator('.confirmation-message');
    await expect(confirmationMessage).toBeVisible({ timeout: 5000 });
    await expect(confirmationMessage).toContainText('Thank you for your purchase');
});
