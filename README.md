Лендинг
Бэк запускается командой docker compose up -d --build
После запуска документация появится по адресу http://localhost:8001/docs

## База данных

По умолчанию `docker compose up` поднимает и `app`, и `db` (PostgreSQL 16 в контейнере) —
чтобы локально не ловить расхождения поведения между SQLite и PostgreSQL.

Настройки подключения лежат в двух файлах (оба в `.gitignore`, шаблон — `backend/.env.example`):

- `backend/.env.local` — локальная PostgreSQL в контейнере (`DB_HOST=db`)
- `backend/.env.server` — боевая база на сервере (`DB_HOST=161.104.17.173`)

Какой из них подключить, выбирает переменная `APP_ENV` (по умолчанию `local`):

```bash
# Локальная база в контейнере (по умолчанию)
docker compose up -d --build

# Подключиться к базе на сервере
APP_ENV=server docker compose up -d --build
```

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

## Portainer — управление контейнерами

Portainer — веб-интерфейс для мониторинга и управления Docker-контейнерами. Запускается вместе с проектом.

**Адрес:** `http://localhost:9000` (локально) или `http://адрес_сервера:9000` (на сервере)

Что можно делать:

- Смотреть логи любого контейнера в реальном времени
- Следить за статусом, CPU и памятью контейнеров
- Перезапускать / останавливать контейнеры
- Просматривать volumes, сети, образы

### Первый запуск

При первом открытии Portainer попросит создать администратора.  
**Важно:** на это даётся ~5 минут, иначе Portainer заблокируется по таймауту.

Если заблокировался — перезапусти и сразу открой страницу:

```bash
docker compose restart portainer
```

Токен для поля **Setup token** берётся из логов:

```bash
docker compose logs portainer
```

Найди в выводе строку вида:

```
token=5c09e1b20b8f6a4721c347...
```

### Просмотр логов конкретного контейнера

В интерфейсе: **Local → Containers → viktoria_landing_app-1 → Logs**
