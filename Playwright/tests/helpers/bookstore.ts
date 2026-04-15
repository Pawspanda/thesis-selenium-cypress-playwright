import { Page, expect } from '@playwright/test';

export async function loginBookstore(page: Page, email: string, password: string) {
    await page.goto('/bookstore');

    await page.getByTestId('goto-signin').click();

    await page.locator('#email').fill(email);
    await page.locator('#password').fill(password);
    await page.locator('#submit').click();

    await expect(page.locator('#welcome-message'))
        .toContainText('Hello', { timeout: 10000 });
}

export async function addBook(page: Page, bookId: string) {
    await page.getByTestId(`cart-${bookId}`).getByText('Add To Cart').click();
}

export async function removeBook(page: Page, bookId: string) {
    await page.locator(`a[href="/bookstore/remove/${bookId}"]`)
        .getByText('Delete')
        .click({ force: true });
}

export async function proceedToCheckout(page: Page) {
    await page.getByTestId('checkout').getByText('Proceed To Checkout').click();
}

export async function fillCheckoutForm(page: Page, name: string, address: string, cardName: string, cardNumber: string, month: string, year: string, cvc: string) {
    await page.locator('#name').fill(name);
    await page.locator('#address').fill(address);
    await page.locator('#card-name').fill(cardName);
    await page.locator('#card-number').fill(cardNumber);
    await page.locator('#card-expiry-month').fill(month);
    await page.locator('#card-expiry-year').fill(year);
    await page.locator('#card-cvc').fill(cvc);
    await page.getByTestId('purchase').click();
}