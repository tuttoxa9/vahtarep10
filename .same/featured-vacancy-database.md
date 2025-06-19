# Реализация особенных вакансий в базе данных

## Структура базы данных (Firestore)

### Обновление коллекции `vacancies`

Добавить новое поле в документы вакансий:

```typescript
interface VacancyDocument {
  // ... существующие поля ...
  isFeatured: boolean; // По умолчанию false
}
```

## Firestore Rules

Обновить правила безопасности для поля `isFeatured`:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /vacancies/{vacancyId} {
      allow read: if true; // Публичное чтение
      allow write: if request.auth != null; // Только авторизованные пользователи

      // Валидация поля isFeatured
      allow update: if request.auth != null &&
        (resource.data.isFeatured is bool || !('isFeatured' in request.resource.data));
    }
  }
}
```

## Индексы для оптимизации

Создать составные индексы в Firestore:

1. **Индекс для особенных вакансий:**
   - Поля: `isFeatured (Ascending)`, `createdAt (Descending)`
   - Для быстрой выборки особенных вакансий

2. **Индекс для сортировки с приоритетом:**
   - Поля: `isFeatured (Descending)`, `createdAt (Descending)`
   - Для показа особенных вакансий первыми

## Миграция существующих данных

Скрипт для обновления существующих вакансий:

```javascript
// Добавить поле isFeatured ко всем существующим вакансиям
const batch = db.batch();
const vacanciesRef = db.collection('vacancies');

vacanciesRef.get().then((snapshot) => {
  snapshot.docs.forEach((doc) => {
    if (!doc.data().hasOwnProperty('isFeatured')) {
      batch.update(doc.ref, { isFeatured: false });
    }
  });

  return batch.commit();
});
```

## CRM интеграция

### Интерфейс управления

В CRM-панели добавить:

1. **Чекбокс "Особенная вакансия"** в форме редактирования вакансии
2. **Фильтр по особенным вакансиям** в списке вакансий
3. **Массовые операции** для пометки/снятия пометки особенных вакансий
4. **Статистика** по количеству особенных вакансий

### API endpoints

```typescript
// GET /api/vacancies?featured=true
// Получить только особенные вакансии

// PATCH /api/vacancies/{id}/featured
// Переключить статус особенной вакансии
{
  isFeatured: boolean
}
```

## Бизнес-логика

### Ограничения

1. **Лимит особенных вакансий:** Не более 20% от общего количества активных вакансий
2. **Автоматическое снятие:** Особенный статус автоматически снимается через 30 дней
3. **Приоритет сортировки:** Особенные вакансии всегда показываются первыми

### Аналитика

Отслеживать:
- Количество просмотров особенных вакансий
- Конверсия в отклики
- Эффективность особенного статуса

## Примеры запросов

### Получение всех вакансий с приоритетом особенных

```typescript
const getVacanciesWithPriority = async () => {
  return await db.collection('vacancies')
    .orderBy('isFeatured', 'desc')
    .orderBy('createdAt', 'desc')
    .get();
};
```

### Получение только особенных вакансий

```typescript
const getFeaturedVacancies = async () => {
  return await db.collection('vacancies')
    .where('isFeatured', '==', true)
    .orderBy('createdAt', 'desc')
    .get();
};
```

### Пометить вакансию как особенную

```typescript
const markVacancyAsFeatured = async (vacancyId: string) => {
  await db.collection('vacancies')
    .doc(vacancyId)
    .update({
      isFeatured: true,
      featuredAt: FieldValue.serverTimestamp() // Время пометки
    });
};
```

## Мониторинг

1. **Dashboard метрики:**
   - Количество активных особенных вакансий
   - Средний CTR особенных vs обычных вакансий
   - Конверсия в заявки

2. **Алерты:**
   - Превышение лимита особенных вакансий
   - Отсутствие особенных вакансий более 3 дней
   - Низкая эффективность особенных вакансий
