"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
test_1.test.describe('PermiSET Auth', () => {
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
    (0, test_1.test)('test LogIn', async () => {
        await page.waitForTimeout(2000);
        await (0, test_1.expect)(page).toHaveURL(`${clientURL}`);
    });
    (0, test_1.test)('test LogOut', async () => {
        await page.getByLabel('User Options').click();
        await page.getByRole('menuitem', { name: 'Logout' }).click();
        await page.waitForTimeout(2000);
        await (0, test_1.expect)(page).toHaveURL(`${clientURL}/auth/login`);
    });
});
