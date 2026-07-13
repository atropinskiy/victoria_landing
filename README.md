Лендинг
Бэк запускается командой docker compose up -d --build
После запуска документация появится по адресу http://localhost:8001/docs

## База данных

В файле `backend/.env` переключается через `USE_SQLITE`:
- `USE_SQLITE=true` — SQLite (файл `backend/app.db`, для локальной разработки)
- `USE_SQLITE=false` — PostgreSQL (настройки подключения там же в `.env`)

## Миграции

Миграции применяются через Alembic внутри Docker-контейнера.

### Первый запуск (чистая база)

```bash
docker compose up -d --build
docker compose exec app alembic upgrade head
```

### Изменил модель — создай и примени миграцию

```bash
# Сначала убедись, что у тебя актуальная ветка
git pull

# Сгенерировать миграцию
docker compose exec app alembic revision --autogenerate -m "описание_изменения"

# Применить
docker compose exec app alembic upgrade head
```

### Откатить последнюю миграцию

```bash
docker compose exec app alembic downgrade -1
```

### База уже существует (таблицы созданы не через Alembic)

```bash
docker compose exec app alembic stamp head
```

Это пометит текущее состояние как применённое без изменения схемы.
Если после этого были добавлены новые поля — создай и примени миграцию как обычно.
