import { test, expect } from '@playwright/test';
import { register } from './helpers/register';

test.describe('Registration', () => {

    test.beforeEach(async ({ page }) => {
        await page.context().clearCookies();
        await page.goto('/register');
    });
    
    test('New registration', async ({ page }) => {

        await page.goto('/register');

        await register(page, 'HappyUser', 'NewSecretPassword!', 'NewSecretPassword!');

        await expect(page.locator('#flash > b')).toBeVisible();
    });

    test('Existing account', async ({ page }) => {

        await page.goto('/register');

        await register(page, 'practice', 'SuperSecretPassword!', 'SuperSecretPassword!');

        await expect(page.locator('#flash > b'))
        .toContainText('Username is already taken');

    });

    test('Passwords do not match', async ({ page }) => {

        await page.goto('/register');

        await register(page, 'Newuser', 'NewSecretPassword!', 'UserSecretPassword!');

        await expect(page.locator('#flash > b'))
        .toContainText('Passwords do not match');

    });

    
    test('Special Character in name', async ({ page }) => {

        await page.goto('/register');

        await register(page, 'SpecialUser!', 'NewSecretPassword!', 'NewSecretPassword!');

        await expect(page.locator('#flash > b'))
        .toContainText('Invalid username');

    });

  });

