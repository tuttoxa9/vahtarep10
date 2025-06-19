# Настройка переменных окружения для Netlify

## Проблема
Заявки отправляются успешно (нет ошибок в консоли), но не сохраняются в Firebase и не отправляются уведомления в Telegram.

## Причина
На Netlify не настроены переменные окружения для Firebase и Telegram.

## Решение
Необходимо настроить следующие переменные окружения в админ-панели Netlify:

### 1. Войти в админ-панель Netlify
1. Перейти на https://app.netlify.com
2. Выбрать проект vahtarep10
3. Перейти в Site settings → Environment variables

### 2. Добавить переменные Firebase
Добавить следующие переменные (значения взять из netlify.toml или Firebase Console):

```
NEXT_PUBLIC_FIREBASE_API_KEY = AIzaSyAvdGVXFzqU-DrAi3Sw223qyscDuYjKbG0
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN = vahta1-76378.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID = vahta1-76378
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET = vahta1-76378.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID = 1037943763154
NEXT_PUBLIC_FIREBASE_APP_ID = 1:1037943763154:web:0e2a2dffc1de4d7279bd0b
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID = G-DVYZFE1PN7
```

### 3. Добавить переменные Telegram
Добавить переменные для отправки уведомлений в Telegram:

```
TELEGRAM_BOT_TOKEN = [ВАШ_TELEGRAM_BOT_TOKEN]
TELEGRAM_CHAT_ID = [ВАШ_TELEGRAM_CHAT_ID]
```

### 4. Получить Telegram токены
Если у вас еще нет Telegram бота:

1. **Создать бота:**
   - Написать @BotFather в Telegram
   - Отправить `/newbot`
   - Следовать инструкциям
   - Получить токен бота

2. **Получить Chat ID:**
   - Написать боту любое сообщение
   - Перейти на `https://api.telegram.org/bot[ВАШ_ТОКЕН]/getUpdates`
   - Найти `"chat":{"id":ВАША_ID}`

### 5. Проверить настройки
После добавления переменных:
1. Сделать новый deploy (или запустить существующий заново)
2. Проверить логи функций в Netlify Functions
3. Отправить тестовую заявку

### 6. Логи для отладки
В новой версии функция логирует:
- Какие переменные окружения установлены
- Результат сохранения в Firebase
- Результат отправки в Telegram
- Подробные ошибки

Логи можно посмотреть в:
Site overview → Functions → View function logs

## Проверка работы
После настройки переменных функция будет:
1. ✅ Сохранять заявки в Firebase
2. ✅ Отправлять уведомления в Telegram
3. ✅ Показывать статус операций в ответе пользователю

## Fallback
Если Firebase не работает, функция всё равно:
- Создаст временный ID заявки
- Попытается отправить уведомление в Telegram
- Вернёт успешный ответ пользователю
