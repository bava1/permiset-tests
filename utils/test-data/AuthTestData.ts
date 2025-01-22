export const positiveAuthTestData = [
    {
      email: 'validuser@example.com',
      password: 'ValidPassword123',
      description: 'Корректный email и пароль',
    },
  ];
  
  export const negativeAuthTestData = [
    // Валидация email
    {
      email: 'user@domain',
      password: 'ValidPassword123',
      errorMessage: 'Введите корректный email',
      description: 'Невалидный email без доменной зоны',
    },
    {
      email: '',
      password: 'ValidPassword123',
      errorMessage: 'Поле email обязательно для заполнения',
      description: 'Пустое поле email',
    },
    // Валидация пароля
    {
      email: 'validuser@example.com',
      password: '',
      errorMessage: 'Поле пароль обязательно для заполнения',
      description: 'Пустое поле пароля',
    },
    {
      email: 'validuser@example.com',
      password: 'short',
      errorMessage: 'Пароль должен быть длиной не менее 8 символов',
      description: 'Пароль меньше минимальной длины',
    },
    // Несуществующий аккаунт
    {
      email: 'nonexistent@example.com',
      password: 'RandomPassword',
      errorMessage: 'Аккаунт не найден',
      description: 'Несуществующий аккаунт',
    },
    // SQL-инъекции
    {
      email: "' OR 1=1 --",
      password: 'password123',
      errorMessage: 'Введите корректный email или пароль',
      description: 'Попытка SQL-инъекции в поле email',
    },
    {
      email: 'validuser@example.com',
      password: "' OR 1=1 --",
      errorMessage: 'Введите корректный email или пароль',
      description: 'Попытка SQL-инъекции в поле пароля',
    },
    // Ввод JavaScript-кода
    {
      email: '<script>alert("XSS")</script>',
      password: 'password123',
      errorMessage: 'Введите корректный email',
      description: 'Ввод JavaScript-кода в поле email',
    },
    {
      email: 'validuser@example.com',
      password: '<script>alert("XSS")</script>',
      errorMessage: 'Введите корректный email или пароль',
      description: 'Ввод JavaScript-кода в поле пароля',
    },
    // Наборы символов
    {
      email: 'validuser@example.com',
      password: 'P@$$w0rd',
      errorMessage: '',
      description: 'Пароль с нестандартными символами',
    },
    {
      email: 'validuser@example.com',
      password: 'пароль123',
      errorMessage: 'Пароль может содержать только латинские буквы и цифры',
      description: 'Пароль с кириллическими символами',
    },
  ];
  