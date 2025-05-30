// Instructions: Создаю файл с планом устранения ошибки таймаута Netlify функции

# Устранение ошибки Netlify Function Timeout

## Проблема
- Ошибка 502 при отправке заявки на вакансию
- "Sandbox.Timeout" - функция превышает лимит времени в 10 секунд
- Функция пытается сохранить в Firebase и отправить в Telegram

## Анализ кода
- ✅ Функция `submit-application.js` содержит логику Firebase + Telegram
- ✅ ApplicationForm правильно отправляет запросы на `/.netlify/functions/submit-application`
- ❌ Функция может зависать на Firebase соединении
- ❌ Таймаут в netlify.toml установлен на 15 секунд, но sandbox ограничивает до 10

## План исправления
1. **completed** - Оптимизировать Firebase подключение (убрать лишние импорты)
2. **completed** - Добавить более короткие таймауты для сетевых запросов (5 сек Firebase, 3 сек Telegram)
3. **completed** - Улучшить обработку ошибок
4. **completed** - Создать более быструю альтернативную функцию (submit-application-simple)
5. **in_progress** - Протестировать исправления

## Статус
- Firebase конфигурация: ✅ Настроена в netlify.toml
- Telegram токены: ❓ Нужно проверить в переменных окружения
- Функция timeout: ⚠️ 15 сек в конфиге, но sandbox ограничивает 10 сек
