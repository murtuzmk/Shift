import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Shift/);
});

test('Login', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('button', { name: 'Get Started' }).click();
  await page.getByLabel('Email address*').fill('rea2@gmail.com');
  await page.getByLabel('Password*').click();
  await page.getByLabel('Password*').fill('rea2@gmail.com');
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
});
