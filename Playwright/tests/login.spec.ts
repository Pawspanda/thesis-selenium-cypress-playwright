import { test, expect } from '@playwright/test';
import { login } from './helpers/login';

test.describe('Login Tests', () => {
  
    test.beforeEach(async ({ page }) => {
        await page.context().clearCookies();
        await page.goto('/login');
    });

    test('User can login', async ({ page }) => {
      
        await page.goto('/login');

        await login(page, 'practice', 'SuperSecretPassword!');

        await expect(page.locator('#flash')).toContainText('You logged in');

        await page.locator('.button', { hasText: 'Logout' }).click();

        await expect(page.locator('#flash')).toContainText('logged out');

    });

    test('Invalid username', async ({ page }) => {
      
        await page.goto('/login');

        await login(page, 'wrong', 'SuperSecretPassword!');

        await expect(page.locator('#flash > b'))
          .toContainText('Your username is invalid');

    });

    test('Invalid password', async ({ page }) => {
      
        await page.goto('/login');

        await login(page, 'practice', 'wrongPassword');

        await expect(page.locator('#flash > b'))
          .toContainText('Your password is invalid');

    });

});
