import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
  await page.goto('http://localhost:5173/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Shift/);
});

//User story from sprint 1: 1, 5; sprint 2: 1
test('onboarding-acc-creation', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('button', { name: 'Get Started' }).click();
  await page.getByRole('link', { name: 'Sign up' }).click();
  await expect(page.getByText('Already have an account? Log')).toBeVisible();
  await page.getByLabel('Email address*').click();
  //make sure to change number for each test, current number used is 5
  await page.getByLabel('Email address*').fill('newaccount5@gmail.com');
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
  await page.getByLabel('Password*').fill('New1account5@gmail.com');
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

//User story from sprint 1: 4
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
  await page.getByRole('button', { name: 'Delete Account' }).click();
  await expect(page.getByRole('button', { name: 'Get Started' })).toBeVisible();
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
test('clear', async ({ page }) => {
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
  await page.getByLabel('Password*').press('Enter');
  await page.getByRole('link', { name: 'Executive Page' }).click();
  await page.getByRole('textbox').nth(1).click();
  await page.getByRole('textbox').nth(1).fill('15');
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.locator('div > .bg-blue-500').first().click();
  await page.getByRole('link', { name: 'Availability' }).click();
  await expect(page.getByText('Need 15 more days')).toBeVisible();
});

//User story from sprint 1: 17, 18
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

//User story from sprint 2: 2, 3, 4, 7, 8, 16
test('employee', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('button', { name: 'Get Started' }).click();
  await page.getByLabel('Email address*').click();
  await page.getByLabel('Email address*').fill('rea2@gmail.com');
  await page.getByLabel('Password*').click();
  await page.getByLabel('Password*').fill('rea2@gmail.com');
  await page.getByLabel('Password*').press('Enter');
  await page.getByRole('link', { name: 'Employees' }).click();
  await page.goto('http://localhost:5173/employees');
  await expect(page.getByRole('row', { name: 'Johnny boy johndoe1@gmail.com Resident Assistant Unassigned Clocked Out Open' }).getByRole('heading')).toBeVisible();
  await expect(page.getByText('Clocked Out').first()).toBeVisible();
  await page.getByRole('row', { name: 'Johnny boy johndoe1@gmail.com Resident Assistant Unassigned Clocked Out Open' }).getByRole('button').click();
  await expect(page.getByRole('menuitem', { name: 'Disable user account' })).toBeVisible();
  await expect(page.getByRole('menuitem', { name: 'Delete user account' })).toBeVisible();
  await expect(page.getByRole('menuitem', { name: 'View Shifts' })).toBeVisible();
  await page.locator('html').click();
  await page.getByRole('row', { name: 'Johnny boy johndoe1@gmail.com Resident Assistant Unassigned Clocked Out Open' }).getByRole('button').click();
  await page.getByLabel('Open menu').click();
  await page.locator('[id="radix-\\:ri\\:"]').click();
  await expect(page.getByText('Filter by')).toBeVisible();
  await page.locator('html').click();
  await page.getByPlaceholder('Filter role...').click();
  await page.getByPlaceholder('Filter role...').fill('C');
  await expect(page.getByRole('cell', { name: 'Resident Education Coordinator' })).toBeVisible();
  await page.getByPlaceholder('Filter role...').click();
  await page.getByPlaceholder('Filter role...').fill('');
  await expect(page.getByRole('cell', { name: 'Resident Assistant' }).nth(1)).toBeVisible();
});

//User story from sprint 2: 5
test('Theme', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('button', { name: 'Toggle theme' }).click();
  await page.getByRole('menuitem', { name: 'Light' }).click();
  await page.getByRole('button', { name: 'Toggle theme' }).click();
  await page.getByRole('menuitem', { name: 'Dark' }).click();
  await page.getByRole('button', { name: 'Toggle theme' }).click();
  await page.getByRole('menuitem', { name: 'System' }).click();
});

//User story from sprint 2: 6
test('welcome-page', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('button', { name: 'Get Started' }).click();
  await page.getByLabel('Email address*').fill('rea2@gmail.com');
  await page.getByLabel('Password*').click();
  await page.getByLabel('Password*').fill('rea2@gmail.com');
  await page.getByLabel('Password*').press('Enter');
  await page.getByRole('link', { name: 'RA welcome' }).click();
  await expect(page.getByText('WELCOME TO SHIFT RA!')).toBeVisible();
  await page.getByRole('button', { name: 'Next slide' }).click();
  await expect(page.getByText('The University Residences')).toBeVisible();
});

//User story from sprint 2: 9
test('manual-assignment', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('button', { name: 'Get Started' }).click();
  await page.getByLabel('Email address*').fill('rea2@gmail.com');
  await page.getByLabel('Password*').click();
  await page.getByLabel('Password*').fill('rea2@gmail.com');
  await page.getByLabel('Password*').press('Enter');
  await page.getByRole('link', { name: 'Executive Page' }).click();
  await page.getByRole('button', { name: 'April 20,' }).click();
  await page.getByRole('button', { name: 'April 19,' }).click();
  await page.getByRole('button', { name: 'Assign this Schedule' }).click();
});

//User story from sprint 2: 10
test('generate-report', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('button', { name: 'Get Started' }).click();
  await page.getByLabel('Email address*').fill('rea2@gmail.com');
  await page.getByLabel('Password*').click();
  await page.getByLabel('Password*').fill('rea2@gmail.com');
  await page.getByLabel('Password*').press('Enter');
  await page.getByRole('link', { name: 'Executive Page' }).click();
  await page.locator('div').filter({ hasText: /^GenerateDAILYWEEKLYMONTHLY$/ }).getByRole('combobox').selectOption('1');
  await page.locator('div').filter({ hasText: /^GenerateDAILYWEEKLYMONTHLY$/ }).getByRole('combobox').selectOption('2');
  await page.getByRole('button', { name: 'Generate' }).click();
});

//User story from sprint 2: 11, 12, 13, 14
test('calendar-filters', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('button', { name: 'Get Started' }).click();
  await page.getByLabel('Email address*').fill('rea2@gmail.com');
  await page.getByLabel('Password*').click();
  await page.getByLabel('Password*').fill('rea2@gmail.com');
  await page.getByLabel('Password*').press('Enter');
  await page.getByRole('button', { name: 'Import' }).click();
  await page.locator('.rbc-row-segment').first().click();
  await page.getByPlaceholder('Enter title').click();
  await page.getByPlaceholder('Enter title').fill('example');
  await page.getByRole('button', { name: 'Create' }).click();
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Export' }).click();
  const download = await downloadPromise;
  const download1Promise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Download' }).click();
  const download1 = await download1Promise;
  await page.locator('label').nth(1).click();
});

//User story from sprint 2: 15
test('rules', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('button', { name: 'Get Started' }).click();
  await page.getByLabel('Email address*').fill('rea2@gmail.com');
  await page.getByLabel('Password*').click();
  await page.getByLabel('Password*').fill('rea2@gmail.com');
  await page.getByLabel('Password*').press('Enter');
  await page.getByRole('link', { name: 'Executive Page' }).click();
  await page.locator('textarea').click();
  await page.locator('textarea').fill('Add sample rule here!');
  await page.getByRole('button', { name: 'Save' }).click();
  await expect(page.getByText('Add sample rule here!')).toBeVisible();
  await page.getByRole('button', { name: 'Edit' }).click();
  await page.getByText('Add sample rule here!').click();
  await page.getByText('Add sample rule here!').press('ArrowLeft');
  await page.getByText('Add sample rule here!').press('ArrowLeft');
  await page.getByText('Add sample rule here!').press('ArrowLeft');
  await page.getByText('Add sample rule here!').press('ArrowLeft');
  await page.getByText('Add sample rule here!').press('ArrowLeft');
  await page.getByText('Add sample rule here!').press('ArrowLeft');
  await page.getByText('Add sample rule here!').press('ArrowLeft');
  await page.getByText('Add sample rule here!').press('ArrowLeft');
  await page.getByText('Add sample rule here!').press('ArrowLeft');
  await page.getByText('Add sample rule here!').press('ArrowLeft');
  await page.getByText('Add sample rule here!').press('ArrowLeft');
  await page.getByText('Add sample rule here!').press('ArrowLeft');
  await page.getByText('Add sample rule here!').press('ArrowLeft');
  await page.getByText('Add sample rule here!').press('ArrowLeft');
  await page.getByText('Add sample rule here!').press('ArrowLeft');
  await page.getByText('Add sample rule here!').fill('Add edited sample rule here!');
  await page.getByRole('button', { name: 'Save' }).click();
  await expect(page.getByText('Add edited sample rule here!')).toBeVisible();
});

//User story from sprint 2: 17, 18
test('notifs', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('button', { name: 'Get Started' }).click();
  await page.getByLabel('Email address*').fill('rea2@gmail.com');
  await page.getByLabel('Password*').click();
  await page.getByLabel('Password*').fill('rea2@gmail.com');
  await page.getByLabel('Password*').press('Enter');
  await page.getByRole('link', { name: 'Settings' }).click();
  await page.getByLabel('Notification Preference').selectOption('email');
  await expect(page.getByLabel('Notification Preference')).toBeVisible();
  await page.locator('div').filter({ hasText: /^Select OptionEmailSMSBoth$/ }).click();
  await page.getByLabel('Notification Preference').selectOption('sms');
  await page.getByLabel('Notification Preference').selectOption('both');
  await page.getByLabel('Notification Times').selectOption('3 Days');
  await page.getByRole('button', { name: 'Save changes' }).click();
});

//User story from sprint 3: 1, 2
test('layout', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('button', { name: 'Get Started' }).click();
  await page.getByLabel('Email address*').fill('message@gmail.com');
  await page.getByLabel('Password*').click();
  await page.getByLabel('Password*').fill('Message1@gmail.com');
  await page.getByLabel('Password*').press('Enter');
  await page.getByRole('button', { name: 'Change layout' }).click();
  await expect(page.getByText('General InformationTodayBackNextApril')).toBeVisible();
  await page.getByRole('button', { name: 'Change layout' }).click();
  await expect(page.getByText('General InformationTodayBackNextApril')).toBeVisible();
});

//User story from sprint 3: 4
test('test', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('button', { name: 'Get Started' }).click();
  await page.getByLabel('Email address*').fill('message@gmail.com');
  await page.getByLabel('Password*').click();
  await page.getByLabel('Password*').fill('Message1@gmail.com');
  await page.getByLabel('Password*').press('Enter');
  await page.locator('.rbc-row-segment').first().click();
  await page.getByPlaceholder('Enter title').click();
  await page.getByPlaceholder('Enter title').fill('asd');
  await page.getByRole('button', { name: 'Create' }).click();
  await page.locator('div:nth-child(3) > .rbc-row-bg > div:nth-child(4)').click();
  await page.getByPlaceholder('Enter title').click();
  await page.getByPlaceholder('Enter title').fill('lksafak');
  await page.getByRole('button', { name: 'Create' }).click();
  await page.locator('.rbc-row-content > div:nth-child(2)').first().click();
  await page.getByPlaceholder('Enter title').click();
  await page.getByPlaceholder('Enter title').fill('ksa');
  await page.getByRole('button', { name: 'Create' }).click();
  await page.getByPlaceholder('Search for events').click();
  await page.getByPlaceholder('Search for events').fill('ks');
  await expect(page.getByText('ksa')).toBeVisible();
  await page.getByPlaceholder('Search for events').click();
  await page.getByPlaceholder('Search for events').fill('');
  await expect(page.getByText('asd')).toBeVisible();
  await page.locator('label').first().click();
  await expect(page.getByText('Example Event')).toBeVisible();
  await page.locator('label').first().click();
  await page.getByText('ksa').click();
  await expect(page.getByText('ksa')).toBeVisible();
});

//User story from sprint 3: 7, 8, 9, 10, 11, 13, 14
test('message', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('button', { name: 'Get Started' }).click();
  await page.getByLabel('Email address*').fill('message@gmail.com');
  await page.getByLabel('Password*').click();
  await page.getByLabel('Password*').fill('Message1@gmail.com');
  await page.getByLabel('Password*').press('Enter');
  await page.getByRole('link', { name: 'Messages' }).click();
  await expect(page.getByText('Welcome!')).toBeVisible();
  await page.getByPlaceholder('Group Chat').click();
  await page.getByPlaceholder('Group Chat').fill('Group1');
  await page.getByRole('button', { name: 'Create Group Chat' }).click();
  await expect(page.locator('#ce-chat-feed-title-Group1')).toBeVisible();
  await page.getByText('Say hello!').nth(1).click();
  await expect(page.getByLabel('paper-clip').locator('svg')).toBeVisible();
  await page.getByRole('paragraph').click();
  await page.getByRole('paragraph').click();
  await page.locator('#toolbar').click();
  await page.getByRole('paragraph').click();
  await page.locator('.ql-editor').fill('Hi');
  await page.locator('.ql-editor').click();
  await page.getByText('Hi', { exact: true }).dblclick();
  await page.locator('#toolbar').dblclick();
  await page.getByLabel('arrow-up').locator('svg').click();
  await expect(page.getByText('Hi', { exact: true })).toBeVisible();
  await page.getByText('Select user...').click();
  await page.getByPlaceholder('Search user...').press('ArrowDown');
  await page.getByPlaceholder('Search user...').press('Enter');
  await page.getByRole('button', { name: 'Create DM' }).click();
  await page.getByRole('button', { name: 'Create DM' }).press('Control+r');
  await page.getByRole('paragraph').click();
  await page.locator('.ql-editor').fill('Hi');
  await page.getByText('Hi').nth(1).click();
  await page.getByText('Hi').nth(1).click({
    button: 'right'
  });
  await page.getByText('Hi').nth(1).click();
  await page.getByRole('button', { name: 'Toggle theme' }).click();
  await page.getByRole('menuitem', { name: 'Light' }).click();
  await page.locator('#ce-options-drop-down svg').click();
  await page.getByRole('button', { name: 'delete Delete' }).click();
  await page.locator('div').filter({ hasText: /^ShiftMessages$/ }).click();
  await page.locator('body').press('Control+r');
  await expect(page.locator('#ce-chat-card-title-Group1')).toBeVisible();
});

//User story from sprint 3: 17, 18
test('emergency', async ({ page }) => {
  await page.goto('http://localhost:5173/');
  await page.getByRole('button', { name: 'Get Started' }).click();
  await page.getByLabel('Email address*').fill('message@gmail.com');
  await page.getByLabel('Password*').click();
  await page.getByLabel('Password*').fill('Message1@gmail.com');
  await page.getByLabel('Password*').press('Enter');
  await page.getByPlaceholder('Emergency Chat').click();
  await page.getByPlaceholder('Emergency Chat').click();
  await page.getByPlaceholder('Emergency Chat').click();
  await page.getByPlaceholder('Emergency Chat').fill('lknvlksnd');
  await page.getByRole('button', { name: 'Send' }).click();
  await page.getByPlaceholder('Emergency Chat').click();
  await page.getByPlaceholder('Emergency Chat').fill('sdvsdv');
  await page.getByRole('button', { name: 'Send' }).click();
  await page.getByPlaceholder('Emergency Chat').click();
  await page.getByPlaceholder('Emergency Chat').fill('sdvsdvsd');
  await page.getByRole('button', { name: 'Send' }).click();
  await page.getByPlaceholder('Emergency Chat').click();
  await page.getByPlaceholder('Emergency Chat').fill('sdvsdvsd');
  await page.getByRole('button', { name: 'Send' }).click();
  await page.getByPlaceholder('Emergency Chat').click();
  await page.getByPlaceholder('Emergency Chat').fill('sdvsdvsd');
  await page.getByRole('button', { name: 'Send' }).click();
  await page.getByPlaceholder('Emergency Chat').fill('s');
  await page.getByPlaceholder('Emergency Chat').click();
  await page.getByPlaceholder('Emergency Chat').fill('sdvsdvsd');
  await page.locator('form').click();
  await page.getByRole('button', { name: 'Send' }).click();
  await page.getByPlaceholder('Emergency Chat').click();
  await page.getByPlaceholder('Emergency Chat').fill('vsdv');
  page.once('dialog', dialog => {
    console.log(`Dialog message: ${dialog.message()}`);
    dialog.dismiss().catch(() => {});
  });
  await page.getByRole('button', { name: 'Send' }).click();
});