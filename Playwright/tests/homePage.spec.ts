import { test } from '@playwright/test';

test.describe('Homepage', () => {

  test('Opens homepage successfully', async ({ page }) => {

    await page.goto('/');

    page.getByRole('heading', 
        { name: 'Automation Testing Practice WebSite for QA and Developers' });

  });

});