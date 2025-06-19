# Todos: Исправление карточек вакансий

## Задачи
- [x] ✅ Добавить поле paymentPeriodDays в компонент VacancyListItem
- [x] ✅ Уменьшить вертикальный размер карточек вакансий
- [ ] Заменить VacancyListItem на VacancyCard в VacanciesClient.tsx (опционально)
- [ ] **in_progress** Протестировать изменения
- [ ] Сделать push в git с токеном

## Детали проблемы
- В VacanciesClient.tsx используется VacancyListItem компонент, а не VacancyCard
- VacancyListItem не использует поле paymentPeriodDays для отображения "За X дней"
- VacancyCard корректно показывает это поле
- Нужно сделать карточки более компактными по вертикали

## План исправления
1. Добавить поле paymentPeriodDays в VacancyListItem компонент
2. Уменьшить paddings и margins для более компактного вида
3. Обновить git репозиторий
