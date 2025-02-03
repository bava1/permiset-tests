import { Page } from '@playwright/test';
import { getLocalStorageItem, setLocalStorageItem } from './localStorageUtils';

const translationTestData = {
    cz: 'Vítejte',
    en: 'Welcome',
    de: 'Willkommen',
    it: 'Benvenuto',
    ua: 'Ласкаво просимо'
};

// Function to get locale from localStorage
export const getLanguageFromLocalStorage = async (page: Page): Promise<string> => {
    const lang = await getLocalStorageItem(page, 'i18nextLng', 'en');
    console.log(`Current locale from localStorage: ${lang}`);
    return lang;
};

// Function to set locale in localStorage only if needed
export const setLanguageInLocalStorage = async (page: Page, lang: string): Promise<void> => {
    const currentLang = await getLanguageFromLocalStorage(page);
    if (currentLang === lang) {
        console.log(`Locale is already set to ${lang}, skipping update.`);
        return;
    }
    await setLocalStorageItem(page, 'i18nextLng', lang);
};

// Function to switch language via Select
export const switchLanguage = async (page: Page, targetLang: string): Promise<void> => {
    console.log(`Switching language to: ${targetLang}`);
    await page.locator('.MuiSelect-select').click();
    await page.locator(`text=${targetLang.toUpperCase()}`).click();

    await page.waitForFunction(
        (lang) => localStorage.getItem('i18nextLng') === lang,
        targetLang
    );

    console.log(`Language switched to ${targetLang}`);
};

// Function to check Select value and greeting text
export const checkLanguageAndText = async (page: Page, expectedLang: string): Promise<void> => {
    console.log(`Validating UI for language: ${expectedLang}`);

    // Check Select value
    await page.waitForFunction(
        (lang) => document.querySelector('.MuiSelect-select')?.textContent?.includes(lang.toUpperCase()),
        expectedLang
    );

    // Check greeting text
    const expectedGreeting = translationTestData[expectedLang as keyof typeof translationTestData] || 'Welcome';
    await page.waitForFunction(
        (text) => document.querySelector('h1')?.textContent?.includes(text),
        expectedGreeting
    );

    console.log(`Language switch verified: ${expectedLang}`);
};
