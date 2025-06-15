# Настройка Firebase для проекта Vahta

## Текущая конфигурация

В проекте уже настроена рабочая Firebase конфигурация:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyAvdGVXFzqU-DrAi3Sw223qyscDuYjKbG0
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=vahta1-76378.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=vahta1-76378
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=vahta1-76378.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=1037943763154
NEXT_PUBLIC_FIREBASE_APP_ID=1:1037943763154:web:0e2a2dffc1de4d7279bd0b
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=G-DVYZFE1PN7
```

## Статус подключения

✅ **Firebase подключен и работает**
- Проект ID: `vahta1-76378`
- Firestore Database: активна
- Коллекции: `vacancies`, `applications`

## Проверка работы

### 1. Вакансии загружаются:
```bash
curl http://localhost:3001/api/vacancies
# Возвращает список вакансий из Firestore
```

### 2. Заявки сохраняются:
- Функция `submit-application` успешно сохраняет заявки
- Тестовая заявка создана с ID: `KNN2Nt08wUJ2l3PRShft`

## Структура данных

### Коллекция `vacancies`
```json
{
  "id": "string",
  "title": "string",
  "company": "string", 
  "location": "string",
  "salary": {
    "min": "number",
    "max": "number", 
    "currency": "string"
  },
  "employment_type": "string",
  "experience": "string",
  "description": "string",
  "requirements": "array",
  "benefits": "array",
  "status": "active|inactive",
  "createdAt": "timestamp",
  "updatedAt": "timestamp",
  "viewCount": "number",
  "detailsUrl": "string"
}
```

### Коллекция `applications`
```json
{
  "id": "string",
  "vacancyId": "string",
  "applicantName": "string",
  "applicantPhone": "string", 
  "applicantEmail": "string",
  "message": "string",
  "submittedAt": "timestamp",
  "status": "pending"
}
```

## Создание новой Firebase конфигурации (если нужно)

Если вы хотите создать свой собственный Firebase проект:

### 1. Создайте проект Firebase
1. Перейдите на [Firebase Console](https://console.firebase.google.com/)
2. Нажмите "Создать проект"
3. Введите название проекта
4. Настройте проект

### 2. Настройте Firestore Database
1. В левом меню выберите "Firestore Database"
2. Нажмите "Создать базу данных"
3. Выберите режим "Тестовый" (для разработки)
4. Выберите регион

### 3. Создайте веб-приложение
1. В настройках проекта нажмите "Добавить приложение"
2. Выберите "Веб"
3. Введите название приложения
4. Скопируйте конфигурацию

### 4. Обновите .env.local
Замените значения в `.env.local` на ваши:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=ваш_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=ваш_проект.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=ваш_проект_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=ваш_проект.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=ваш_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=ваш_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=ваш_measurement_id
```

## Примечания

- Текущая конфигурация уже рабочая и тестированная
- Вакансии успешно загружаются с сервера
- Заявки успешно сохраняются в базе данных
- Смена конфигурации нужна только если требуется использовать другой Firebase проект