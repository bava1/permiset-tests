"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
test_1.test.describe('PermiSET Navigation', () => {
    let context;
    let page;
    const clientURL = process.env.BASE_URL_CLIENT || '';
    let authData = {
        userEmail: 'administrator@test.com',
        userPassword: '123456'
    };
    test_1.test.beforeAll(async ({ browser }) => {
        context = await browser.newContext();
        await context.clearCookies();
        page = await context.newPage();
        await page.goto(`${clientURL}/auth/login`);
        await page.waitForTimeout(2000);
        // Authorization
        await page.getByLabel('Email').fill(authData.userEmail);
        await page.getByLabel('Password').fill(authData.userPassword);
        await page.getByRole('button', { name: 'Login' }).click();
    });
    (0, test_1.test)('Go to homepage', async () => {
        await page.waitForTimeout(2000);
        await (0, test_1.expect)(page).toHaveURL(`${clientURL}`);
    });
    (0, test_1.test)('left navigation', async () => {
        await page.waitForTimeout(2000);
        await page.getByRole('button', { name: 'Dashboard' }).click();
        await (0, test_1.expect)(page).toHaveURL(`${clientURL}/dashboard`);
        await page.getByRole('button', { name: 'Users' }).click();
        await (0, test_1.expect)(page).toHaveURL(`${clientURL}/users`);
        await page.getByRole('button', { name: 'Issues' }).click();
        await (0, test_1.expect)(page).toHaveURL(`${clientURL}/issues`);
        await page.getByRole('button', { name: 'Blog' }).click();
        await (0, test_1.expect)(page).toHaveURL(`${clientURL}/blog`);
        await page.getByRole('button', { name: 'Logs' }).click();
        await (0, test_1.expect)(page).toHaveURL(`${clientURL}/logs`);
        await page.getByRole('button', { name: 'Docs' }).click();
        await (0, test_1.expect)(page).toHaveURL(`${clientURL}/docs`);
        await page.getByRole('button', { name: 'Settings' }).click();
        await (0, test_1.expect)(page).toHaveURL(`${clientURL}/setting`);
    });
    (0, test_1.test)('Go logout', async () => {
        await page.getByRole('button', { name: 'Home' }).click();
        await (0, test_1.expect)(page).toHaveURL(`${clientURL}`);
    });
});
