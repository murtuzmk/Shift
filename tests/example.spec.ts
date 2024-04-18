import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Shift/);
});

test('Login', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByLabel('Email address*').click();
  await page.getByLabel('Email address*').click();
  await page.getByLabel('Email address*').fill('rea2@gmail.com');
  await page.getByLabel('Password*').click();
  await page.getByLabel('Password*').fill('rea2@gmail.com');
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
});

test('Theme', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('button', { name: 'Log in' }).click();
  await page.getByLabel('Email address*').click();
  await page.getByLabel('Email address*').fill('rea2@gmail.com');
  await page.getByLabel('Password*').click();
  await page.getByLabel('Password*').fill('rea2@gmail.com');
  // Click the button and wait for navigation.
  const [response] = await Promise.all([
    page.waitForLoadState(),
    page.getByRole('button', { name: 'Continue', exact: true }).click(),
  ]);
  await page.getByLabel('Close').click();
  await page.getByRole('button', { name: 'Toggle theme' }).click();
  await page.getByRole('menuitem', { name: 'Light' }).click();
  await page.getByRole('button', { name: 'Toggle theme' }).click();
  await page.getByRole('menuitem', { name: 'Dark' }).click();
});