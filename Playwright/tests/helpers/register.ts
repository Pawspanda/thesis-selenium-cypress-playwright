import { Page } from '@playwright/test';

export async function register(page: Page, username: string, password: string, confirmPassword: string) {

  await page.locator('#username').fill(username);
  await page.locator('#password').fill(password);
  await page.locator('#confirmPassword').fill(confirmPassword);

  await page.getByRole('button', { name: 'Register' }).click();
}