import { Page } from '@playwright/test';

/**
 * Get item from localStorage
 * @param page Playwright page instance
 * @param key LocalStorage key
 * @param defaultValue Default value if key is not found
 */

export const getLocalStorageItem = async (page: Page, key: string, defaultValue: string = ''): Promise<string> => {
    return await page.evaluate(({ key, defaultValue }) => {
        return localStorage.getItem(key) || defaultValue;
    }, { key, defaultValue });
};


/**
 * Set item in localStorage
 * @param page Playwright page instance
 * @param key LocalStorage key
 * @param value Value to set
 */
export const setLocalStorageItem = async (page: Page, key: string, value: string): Promise<void> => {
    await page.evaluate(({ key, value }) => {
        localStorage.setItem(key, value);
    }, { key, value });

    console.log(`LocalStorage updated: ${key} = ${value}`);
    await page.waitForTimeout(2000); // Wait for changes to apply
};


/**
 * Remove item from localStorage
 * @param page Playwright page instance
 * @param key LocalStorage key
 */
export const removeLocalStorageItem = async (page: Page, key: string): Promise<void> => {
    await page.evaluate((key) => localStorage.removeItem(key), key);
    console.log(`LocalStorage key removed: ${key}`);
};

/**
 * Clear all items in localStorage
 * @param page Playwright page instance
 */
export const clearLocalStorage = async (page: Page): Promise<void> => {
    await page.evaluate(() => localStorage.clear());
    console.log('LocalStorage cleared');
};
