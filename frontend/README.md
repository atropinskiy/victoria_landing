Next.js-проект (App Router) с TypeScript, Tailwind CSS и архитектурой Feature-Sliced Design (FSD).

## Стек

- Next.js (App Router), TypeScript, Tailwind CSS
- shadcn/ui + Radix
- next-intl (локализация)
- Feature-Sliced Design + steiger (линтер FSD)

## Установка

```bash
npm install
```

## Запуск

```bash
npm run dev
```

Приложение будет доступно на [http://localhost:3001](http://localhost:3001).

## Скрипты

| Команда | Назначение |
| --- | --- |
| `npm run dev` | Запуск дев-сервера |
| `npm run build` | Продакшн-сборка |
| `npm run start` | Запуск собранного проекта |
| `npm run lint` | ESLint |
| `npm run lint:fix` | ESLint с автофиксом |
| `npm run lint:fsd` | Проверка структуры проекта на соответствие FSD (steiger) |
| `npm run typecheck` | Проверка типов TypeScript |
| `npm run format` | Форматирование Prettier |
| `npm run format:check` | Проверка форматирования без изменений |

## Линтер FSD (steiger)

Проверяет, что слои, сегменты и импорты в `src` соответствуют правилам Feature-Sliced Design. Конфиг — [steiger.config.ts](steiger.config.ts).

Запуск проверки:

```bash
npm run lint:fsd
```

При нарушениях команда выведет список проблем с указанием файла и правила FSD, которое нарушено.
