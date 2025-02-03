import { test, expect, BrowserContext, Page, APIRequestContext } from '@playwright/test';

test.describe('Negative Auth', () => {
    let context: BrowserContext;
    // let request: APIRequestContext;
    let apiResponse: any;
    let page: Page;
    const clientURL = process.env.DEV_URL_CLIENT || '';
    // const clientURL = process.env.BASE_URL_CLIENT || '';
    let authData = {
        userEmail: 'k.asmus@test.com',
        userPassword: '123456'
    };

    test.beforeAll(async ({ browser }) => {
        context = await browser.newContext();
        await context.clearCookies();
        page = await context.newPage();
        await page.goto(`${clientURL}/auth/login`);
        await page.fill('form #login-form-email-input', `${authData.userEmail}`);
        await page.fill('form #login-form-password-input', `${authData.userPassword}`);
        await page.getByRole('button', { name: 'Login' }).click();

    });

    test.skip('email empty', async () => {
        await page.waitForTimeout(2000);
        await expect(page).toHaveURL(`${clientURL}`);
    });

    test.skip('email invalid', async () => {
        await page.waitForTimeout(2000);
        await expect(page).toHaveURL(`${clientURL}`);
    });

    test.skip('password empty', async () => {
        await page.waitForTimeout(2000);
        await expect(page).toHaveURL(`${clientURL}`);
    });

    test.skip('password invalid', async () => {
        await page.waitForTimeout(2000);
        await expect(page).toHaveURL(`${clientURL}`);
    });

    test.skip('Password length mismatch', async () => {
        await page.waitForTimeout(2000);
        await expect(page).toHaveURL(`${clientURL}`);
    });
    
    test('test user verification', async () => {
        await expect(page.locator(`text=Your email: ${authData.userEmail}`)).toBeVisible();
        // await expect(page.locator('h1', { hasText: 'Welcome Role Administrator employee' })).toBeVisible();
        
    });

    test('test LogOut', async () => {
        await page.getByLabel('User Options').click();
        await page.getByRole('menuitem', { name: 'Logout' }).click();
        await page.waitForTimeout(2000);
        await expect(page).toHaveURL(`${clientURL}/auth/login`);
        // await expect(page.locator('text=Don’t have an account?')).toBeVisible();
    });

});
/*
2. Тестовые сценарии
2.1 Позитивные сценарии
Успешный вход
Ввести валидный email и пароль.
Нажать кнопку "Войти".
Проверить, что пользователь перенаправляется на главную страницу/dashboard.
Убедиться, что отображается приветственное сообщение.
2.2 Негативные сценарии
Невалидный email

Ввести невалидный email (например, user@domain, userdomain.com).
Нажать кнопку "Войти".
Проверить, что отображается сообщение об ошибке: "Введите корректный email".
Пустое поле email

Оставить поле email пустым, заполнить пароль.
Нажать кнопку "Войти".
Убедиться, что появляется сообщение об ошибке: "Поле email обязательно для заполнения".
Пустое поле пароля

Заполнить email, оставить поле пароля пустым.
Нажать кнопку "Войти".
Проверить сообщение об ошибке: "Поле пароль обязательно для заполнения".
Неправильный пароль

Ввести валидный email и неверный пароль.
Нажать кнопку "Войти".
Проверить, что отображается сообщение: "Неправильный email или пароль".
Несуществующий аккаунт

Ввести email, который отсутствует в системе, и любой пароль.
Нажать "Войти".
Убедиться, что появляется сообщение: "Аккаунт не найден".
Несоответствие длины пароля

Ввести пароль, не соответствующий минимальной длине (например, менее 8 символов).
Проверить, что выводится сообщение: "Пароль должен быть длиной не менее 8 символов".
SQL-инъекция

Ввести SQL-код в поле email или пароль.
Убедиться, что запрос отклоняется, и не происходит нарушения безопасности.
2.3 Сценарии UI
Проверка кнопки "Войти"

Кнопка должна быть неактивной, если поля email или пароль пусты.
Проверка отображения ошибок

Убедиться, что ошибки отображаются возле соответствующего поля.
Проверить стили (например, красная рамка вокруг полей с ошибками).
Проверка кнопки "Забыли пароль?"

Нажать "Забыли пароль?".
Убедиться, что пользователь перенаправляется на страницу восстановления пароля.
Проверка ссылки "Регистрация"

Нажать на ссылку "Регистрация".
Убедиться, что пользователь перенаправляется на страницу регистрации.

*/
