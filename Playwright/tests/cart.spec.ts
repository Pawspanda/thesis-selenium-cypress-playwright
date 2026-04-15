import { test, expect } from '@playwright/test';
import { loginBookstore, addBook, removeBook } from './helpers/bookstore';

test.describe('Cart Test', () => {

    test.beforeEach(async ({ page }) => {
        await page.context().clearCookies();
        await loginBookstore(page, 'happyuser@email.com', 'NewPassword!');
        await page.goto('/bookstore');
    });

    test('Adding books to cart', async ({ page }) => {

        await addBook(page, '674108466cb6226060a20d44');
        await addBook(page, '67410a586cb6226060a20d8d');
        await addBook(page, '67410b8c6cb6226060a20da4');

        await page.locator('.position-relative > img').click();

    });
    
     test('Removing books from cart', async ({ page }) => {

        await addBook(page, '674108466cb6226060a20d44');
        await addBook(page, '67410a586cb6226060a20d8d');
        await addBook(page, '67410b8c6cb6226060a20da4');

        await page.locator('.position-relative > img').click();

        await removeBook(page, '674108466cb6226060a20d44');
        await removeBook(page, '67410a586cb6226060a20d8d');
        await removeBook(page, '67410b8c6cb6226060a20da4');

        await expect(page.locator(`a[href="/bookstore/remove/674108466cb6226060a20d44"]`)).not.toBeVisible();
    });

});