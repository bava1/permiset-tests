"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
test_1.test.describe('Permiset API', () => {
    let request;
    let token;
    const apiURL = process.env.BASE_URL_SERVER || 'https://permiset-server-8-latest.onrender.com';
    test_1.test.beforeAll(async ({ playwright }) => {
        // Увеличиваем таймаут для блока beforeAll
        test_1.test.setTimeout(5000); // 30 секунд
        request = await playwright.request.newContext({
            ignoreHTTPSErrors: true,
        });
        const response = await request.post(`${apiURL}/auth/login`, {
            headers: { 'Content-Type': 'application/json' },
            data: {
                email: 'administrator@test.com',
                password: '123456',
            },
        });
        (0, test_1.expect)(response.ok()).toBeTruthy();
        const responseData = await response.json();
        token = responseData.token;
        (0, test_1.expect)(token).toBeDefined();
    });
    test_1.test.afterAll(async () => {
        await request.dispose();
    });
    (0, test_1.test)('login and get token', async () => {
        (0, test_1.expect)(token).toBeDefined();
        console.log('Users token:', token);
    });
    (0, test_1.test)('get roles list 1', async () => {
        const protectedResponse = await request.get(`${apiURL}/roles`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        (0, test_1.expect)(protectedResponse.ok()).toBeTruthy();
        const usersData = await protectedResponse.json();
        console.log('Roles data1 length:', usersData.length);
        (0, test_1.expect)(usersData.length).toBeGreaterThan(0);
    });
    test_1.test.skip('cteate role', async () => {
        const response2 = await request.post(`${apiURL}/roles`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            data: {
                "name": "Tester",
                "permissions": [
                    "read",
                    "update"
                ]
            },
        });
    });
    test_1.test.skip('get roles list 2', async () => {
        const protectedResponse = await request.get(`${apiURL}/roles`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        (0, test_1.expect)(protectedResponse.ok()).toBeTruthy();
        const usersData = await protectedResponse.json();
        console.log('Roles data2 length:', usersData.length);
        console.log('Roles data list:', usersData);
        (0, test_1.expect)(usersData.length).toBeGreaterThan(0);
    });
});
