import { test, expect, BrowserContext, Page } from '@playwright/test';
import { 
    getLanguageFromLocalStorage, 
    setLanguageInLocalStorage, 
    switchLanguage, 
    checkLanguageAndText 
} from '../../utils/translationUtils';
import { clearLocalStorage } from '../../utils/localStorageUtils';

test.describe('PermiSET Translation', () => {
    let context: BrowserContext;
    let page: Page;
    const clientURL = process.env.BASE_URL_CLIENT || '';
    let authData = {
        userEmail: 'k.asmus@test.com',
        userPassword: '123456'
    };

    // ✅ Add local retry for this group of tests
    test.describe.configure({ retries: 5 });

    test.beforeAll(async ({ browser }) => {
        console.log('Initializing browser and logging in...');

        context = await browser.newContext();
        await context.clearCookies();
        page = await context.newPage();

        try {
            await page.goto(`${clientURL}/auth/login`, { timeout: 10000 }); // ✅ Увеличили таймаут запроса
        } catch (error) {
            console.error(`Failed to load login page: ${error}`);
            throw error; // Позволяет Playwright запустить повтор теста (retry)
        }

        console.log('Filling in login credentials...');
        await page.getByLabel('Email').fill(authData.userEmail);
        await page.getByLabel('Password').fill(authData.userPassword);
        await page.getByRole('button', { name: 'Login' }).click();

        await page.waitForURL(clientURL, { timeout: 15000 }); // ✅ Увеличили таймаут загрузки
        console.log('Successfully logged in.');
    });

    test('Authorization and homepage access', async () => {
        await expect(page).toHaveURL(`${clientURL}`);
        console.log('Successfully logged in and redirected to homepage.');
    });

    test('Check locale and set default if necessary', async () => {
        let i18nextLng = await getLanguageFromLocalStorage(page);

        if (!i18nextLng) {
            await setLanguageInLocalStorage(page, 'en');
            i18nextLng = 'en';
        }

        await checkLanguageAndText(page, i18nextLng);
    });

    test('Switch language from en to ua and verify', async () => {
        await switchLanguage(page, 'ua');
        await checkLanguageAndText(page, 'ua');
    });

    test('LogOut Test', async () => {
        console.log('Starting logout process...');
        
        await page.waitForSelector('[aria-label="User Options"]', { state: 'visible' });
        await page.getByLabel('User Options').click();
        
        await page.waitForSelector('role=menuitem[name="Logout"]', { state: 'visible' });
        await page.getByRole('menuitem', { name: 'Logout' }).click();
        
        await page.waitForTimeout(1000);
        await expect(page).toHaveURL(`${clientURL}/auth/login`);

        // Clear localStorage after logout
        await clearLocalStorage(page);
        
        console.log('Successfully logged out.');
    });
});
