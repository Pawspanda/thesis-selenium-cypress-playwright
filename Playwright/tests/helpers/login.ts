import { Page } from '@playwright/test';

export async function login(page: Page, username: string, password: string) {
  
  await page.locator('#username').fill(username);
  await page.locator('#password').fill(password);
  await page.getByRole('button', { name: 'Login' }).click();


}