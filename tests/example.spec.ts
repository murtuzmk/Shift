import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Shift/);
});

//User story from sprint 1: 1, 5,
test('onboarding-acc-creation', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('button', { name: 'Get Started' }).click();
  await page.getByRole('link', { name: 'Sign up' }).click();
  await expect(page.getByText('Already have an account? Log')).toBeVisible();
  await page.getByLabel('Email address*').click();
  //make sure to change number for each test, current number used is 3
  await page.getByLabel('Email address*').fill('newaccount3@gmail.com');
  await page.getByLabel('Password*').click();
  await page.getByLabel('Password*').fill('newaccount@gmail.com');
  await expect(page.getByText('Your password must contain: At least 8 characters At least 3 of the following:')).toBeVisible();
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await page.getByRole('button', { name: 'Show password' }).click();
  await page.getByLabel('Password*').click();
  await page.getByLabel('Password*').press('ArrowLeft');
  await page.getByLabel('Password*').press('ArrowLeft');
  await page.getByLabel('Password*').press('ArrowLeft');
  await page.getByLabel('Password*').press('ArrowLeft');
  await page.getByLabel('Password*').press('ArrowLeft');
  await page.getByLabel('Password*').press('ArrowLeft');
  await page.getByLabel('Password*').press('ArrowLeft');
  await page.getByLabel('Password*').press('ArrowLeft');
  await page.getByLabel('Password*').press('ArrowLeft');
  await page.getByLabel('Password*').press('ArrowLeft');
  await page.getByLabel('Password*').press('ArrowLeft');
  await page.getByLabel('Password*').fill('Newaccount@gmail.com');
  await page.getByLabel('Password*').press('ArrowRight');
  await page.getByLabel('Password*').press('ArrowRight');
  await page.getByLabel('Password*').fill('New1account3@gmail.com');
  await expect(page.getByText('Your password must contain: At least 8 characters At least 3 of the following:')).toBeVisible();
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await expect(page.getByRole('heading', { name: 'Authorize App' })).toBeVisible();
  await page.getByRole('button', { name: 'Accept' }).click();
  await expect(page.getByRole('heading', { name: 'Let\'s get you set up' })).toBeVisible();
  await page.getByPlaceholder('John Doe').click();
  await page.getByPlaceholder('John Doe').fill('Sample name');
  await page.getByLabel('Residence Hall').click();
  await page.getByLabel('Hillenbrand').click();
  await page.getByLabel('Role').click();
  await page.getByLabel('Resident Education Coordinator').getByText('Resident Education Coordinator').click();
  await page.getByRole('button', { name: 'Finish' }).click();
  await expect(page.getByLabel('You\'re all set up!')).toBeVisible();
  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page.getByRole('heading', { name: 'Welcome, Sample name! 👋' })).toBeVisible();
});

//User story from sprint 1: 2
test('Login', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('button', { name: 'Get Started' }).click();
  await page.getByLabel('Email address*').fill('rea2@gmail.com');
  await page.getByLabel('Password*').click();
  await page.getByLabel('Password*').fill('rea2@gmail.com');
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
});

//User story from sprint 1: 3
test('reset-password', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('button', { name: 'Get Started' }).click();
  await page.getByRole('link', { name: 'Forgot password?' }).click();
  await expect(page.getByRole('heading', { name: 'Forgot Your Password?' })).toBeVisible();
  await page.getByLabel('Email address*').click();
  await page.getByLabel('Email address*').fill('rea2@gmail.com');
  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page.getByRole('heading', { name: 'Check Your Email' })).toBeVisible();
});

//User story from sprint 1: 6
test('social-login', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('button', { name: 'Get Started' }).click();
  await page.getByRole('button', { name: 'Continue with Google' }).click();
  await expect(page.getByText('Sign in with Google')).toBeVisible();
});

//User story from sprint 1: 7
test('create-RA', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('button', { name: 'Get Started' }).click();
  await page.getByLabel('Email address*').fill('rea2@gmail.com');
  await page.getByLabel('Password*').click();
  await page.getByLabel('Password*').fill('rea2@gmail.com');
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await expect(page.getByRole('link', { name: 'Create RA Account' })).toBeVisible();
  await page.getByRole('link', { name: 'Create RA Account' }).click();
  await page.getByLabel('email').click();
  await page.getByLabel('email').fill('newtestra1@gmail.com');
  await page.getByLabel('Password').click();
  await page.getByLabel('Password').fill('newtestra1@gmail.com');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('button', { name: 'Loading... Submit' }).click();
  await expect(page.getByRole('button', { name: 'Submit' })).toBeVisible();
});

//User story from sprint 1: 9
test('add-edit-delete-events', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('button', { name: 'Get Started' }).click();
  await page.getByLabel('Email address*').fill('rea2@gmail.com');
  await page.getByLabel('Password*').click();
  await page.getByLabel('Password*').fill('rea2@gmail.com');
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await page.locator('.rbc-row-bg > div:nth-child(4)').first().click();
  await page.getByPlaceholder('Enter title').click();
  await page.getByPlaceholder('Enter title').fill('Abc');
  await page.getByPlaceholder('Enter title').press('Enter');
  await page.getByText('Abc').click();
  await page.getByPlaceholder('Enter title').click();
  await expect(page.getByText('Abc')).toBeVisible();
  await page.getByPlaceholder('Enter title').click();
  await page.getByPlaceholder('Enter title').fill('Abcd');
  await page.getByPlaceholder('Enter title').press('Enter');
  await expect(page.getByText('Abcd')).toBeVisible();
  await page.getByText('Abcd').click();
  await page.getByRole('button', { name: 'Delete' }).click();
  await expect(page.locator('.rbc-row-bg > div:nth-child(4)').first()).toBeVisible();
});

//User story from sprint 1: 10, 13
test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('button', { name: 'Get Started' }).click();
  await page.getByLabel('Email address*').fill('ra3@gmail.com');
  await page.getByLabel('Password*').click();
  await page.getByLabel('Password*').fill('ra3@gmail.com');
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await page.getByRole('link', { name: 'Availability' }).click();
  await page.getByRole('button', { name: 'April 13,' }).click();
  await page.getByRole('button', { name: 'April 12,' }).click();
  await page.getByRole('button', { name: 'April 11,' }).click();
  await page.getByRole('button', { name: 'April 10,' }).click();
  await page.getByRole('button', { name: 'April 17,' }).click();
  await page.getByRole('button', { name: 'April 16,' }).click();
  await page.getByRole('button', { name: 'April 9,' }).click();
  await page.getByRole('button', { name: 'April 8,' }).click();
  await page.getByRole('button', { name: 'Clear' }).click();
});

//User story from sprint 1: 11, 12
test('test-calendar', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('button', { name: 'Get Started' }).click();
  await page.getByLabel('Email address*').fill('rea2@gmail.com');
  await page.getByLabel('Password*').click();
  await page.getByLabel('Password*').fill('rea2@gmail.com');
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await page.getByRole('button', { name: 'Week' }).click();
  await expect(page.getByText('April 14 –')).toBeVisible();
  await page.getByRole('button', { name: 'Agenda' }).click();
  await expect(page.getByRole('cell', { name: 'Event', exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Month' }).click();
  await page.getByRole('button', { name: 'Next' }).click();
  await expect(page.getByText('May')).toBeVisible();
  await page.getByRole('button', { name: 'Back' }).click();
  await page.getByRole('button', { name: 'Back' }).click();
  await expect(page.getByText('March')).toBeVisible();
  await page.getByRole('button', { name: 'Today' }).click();
  await expect(page.getByText('April')).toBeVisible();
});

//User story from sprint 1: 16
test('min-shifts', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('button', { name: 'Get Started' }).click();
  await page.getByLabel('Email address*').fill('rea2@gmail.com');
  await page.getByLabel('Password*').click();
  await page.getByLabel('Password*').fill('rea2@gmail.com');
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await page.getByRole('link', { name: 'Executive Page' }).click();
  await expect(page.getByText('Min Days:')).toBeVisible();
  await page.locator('input[type="text"]').click();
  await page.locator('input[type="text"]').fill('15');
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.locator('.bg-blue-500').first().click();
  await expect(page.getByText('Min Days:')).toBeVisible();
  await page.getByRole('link', { name: 'Availability' }).click();
  await expect(page.getByText('Need 15 more days')).toBeVisible();
});

test('edit-approve-ra-schedule', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('button', { name: 'Get Started' }).click();
  await page.getByLabel('Email address*').fill('rea2@gmail.com');
  await page.getByLabel('Password*').click();
  await page.getByLabel('Password*').fill('rea2@gmail.com');
  await page.getByRole('button', { name: 'Continue', exact: true }).click();
  await page.getByRole('link', { name: 'Executive Page' }).click();
  await page.getByRole('button', { name: 'Assign this Schedule' }).click();
  await expect(page.getByRole('button', { name: 'Assign this Schedule' })).toBeVisible();
});

//User story
test('Theme', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('button', { name: 'Toggle theme' }).click();
  await page.getByRole('menuitem', { name: 'Light' }).click();
  await page.getByRole('button', { name: 'Toggle theme' }).click();
  await page.getByRole('menuitem', { name: 'Dark' }).click();
  await page.getByRole('button', { name: 'Toggle theme' }).click();
  await page.getByRole('menuitem', { name: 'System' }).click();
});

//User story
test('Logout', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('button', { name: 'Get Started' }).click();
  await page.getByLabel('Email address*').fill('rea2@gmail.com');
  await page.getByLabel('Password*').click();
  await page.getByLabel('Password*').fill('rea2@gmail.com');
  await page.getByLabel('Password*').press('Enter');
  await page.getByRole('button', { name: 'Toggle theme' }).nth(1).click();
  await page.getByRole('menuitem', { name: 'Light' }).click();
  await expect(page.locator('div').filter({ hasText: 'DashboardEmployeesExecutive' }).nth(4)).toBeVisible();
  await page.getByRole('button', { name: 'Logout' }).click();
  await expect(page.getByRole('button', { name: 'Get Started' })).toBeVisible();
});



