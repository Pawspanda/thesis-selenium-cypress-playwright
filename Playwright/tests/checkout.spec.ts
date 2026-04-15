import { test, expect } from '@playwright/test';
import { loginBookstore, addBook, proceedToCheckout, fillCheckoutForm } from './helpers/bookstore';

test.describe('Checkout Test', () => {
  
    test.beforeEach(async ({ page }) => {
        await page.context().clearCookies();
        await loginBookstore(page, 'happyuser@email.com', 'NewPassword!');
        await page.goto('/bookstore');
        await addBook(page, '674108466cb6226060a20d44');
        await page.locator('.position-relative > img').click();
        
    });

    test('Successful purchase', async ({ page }) => {

        await proceedToCheckout(page);

        await fillCheckoutForm(
            page,
            'Happy',
            'Turku, Finland',
            'Happy User',
            '4242424242424242',
            '06',
            '2028',
            '232'
        );

        await expect(page.locator('#flash > b')).toContainText('Your purchase was successful!');
    });

    test('Expired card', async ({ page }) => {

        await proceedToCheckout(page);

        await fillCheckoutForm(
            page,
            'Happy',
            'Turku, Finland',
            'Happy User',
            '4242424242424242',
            '06',
            '2024',
            '232'
        );

        await expect(page.locator('#charge-error')).toContainText("Your card's expiration year is invalid");
    });

    test('Invalid card number', async ({ page }) => {

        await proceedToCheckout(page);

        await fillCheckoutForm(
            page,
            'Happy',
            'Turku, Finland',
            'Happy User',
            '4242424242424213',
            '06',
            '2028',
            '232'
        );

        await expect(page.locator('#charge-error')).toContainText('Your card number is incorrect');
    });
});