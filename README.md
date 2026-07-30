# Victoria Landing

Лендинг: FastAPI-бэкенд + Next.js-фронтенд + PostgreSQL, за общим nginx. Всё поднимается через Docker Compose.

## Стек

- **backend** — FastAPI (async), SQLAlchemy 2.0 (async, `asyncpg`), Alembic, JWT-авторизация (`python-jose` + `passlib[bcrypt]`)
- **frontend** — Next.js (отдельный репо-каталог `frontend/`)
- **db** — PostgreSQL 16 (только для локальной разработки, см. ниже)
- **nginx** — общий реверс-прокси: `/api/*` → backend, всё остальное → frontend
- **portainer** — веб-UI для управления контейнерами

## Запуск проекта

**Windows / PowerShell** (рекомендуется — см. примечание про `make` ниже) Для более удобного запуска написан скрипт. Запускатеся из корня проетка:

```powershell
.\scripts\up.ps1      # собрать образы, поднять контейнеры, накатить миграции (печатает ссылки на Swagger и фронт)
```

Этот скрипт собирает проект и после выдает ссылки на фронт и бэк

**Linux/macOS/CI** (через `make`, аналогичные таргеты в `Makefile`):

```bash
make up
make down
make logs
make build
make lint
```

> На Windows системный `make` может резолвиться не в GNU Make, а в другой `make.exe` (например, от Delphi/Borland), который падает с ошибкой `Fatal: Command arguments too long` на любой команде. Поэтому на Windows используйте `.ps1`-скрипты из `scripts/`, а не `make`.

## Линтинг бэкенда (ruff)

Бэкенд линтуется [ruff](https://docs.astral.sh/ruff/) (конфиг — `backend/pyproject.toml`). Включены pycodestyle, pyflakes, isort, bugbear, pyupgrade, comprehensions, simplify.

```bash
# внутри контейнера (ruff уже в backend/requirements.txt)
docker compose exec backend ruff check app

# автофикс того, что чинится автоматически (сортировка импортов, pyupgrade и т.п.)
docker compose exec backend ruff check app --fix
```

Локально (без Docker), если в `backend/.venv` установлены зависимости из `requirements.txt`:

```bash
cd backend
ruff check app
```

## Документация API (Swagger)

После запуска бэкенда документация доступна:

- напрямую: [http://127.0.0.1:8001/docs](http://127.0.0.1:8001/docs)
- через nginx: `http://<host>/api/docs`

## Конфигурация окружения

Настройки подключения к БД и секреты лежат в двух файлах (оба в `.gitignore`, шаблон — `backend/.env.example`):

- `backend/.env.local` — локальная PostgreSQL в контейнере (`DB_HOST=db`)
- `backend/.env.server` — боевая база на сервере (`DB_HOST=161.104.17.173`)

Переключает их переменная `APP_ENV` — она подставляется в `env_file` сервиса `backend` в `docker-compose.yml`:

```yaml
backend:
  build: ./backend
  ports:
    - "8001:8000"
  env_file:
    - ./backend/.env.${APP_ENV:-server} # ← переключение базы происходит здесь
```

Docker Compose подставляет значение `APP_ENV` в имя файла и загружает его как `env_file`. `:-server`. Если хотите запустить локальную базу замените server в `docker-compose.yml` на local.

```bash
docker compose up -d --build
```

`.\scripts\up.ps1` не выставляет `APP_ENV`, поэтому по умолчанию тоже целится в прод-базу — задайте в `docker-compose.yml` перед запуском, если нужна локальная разработка.

## База данных для локальной разработки

Сервис `db` в `docker-compose.yml` находится за Compose-профилем `postgres` и **не поднимается** обычным `docker compose up` без явного указания. Варианты:

```bash
# Явно по имени сервиса — поднимет db, даже если профиль не активирован
docker compose up -d db

# Или через профиль — поднимет весь стек, включая db
docker compose --profile postgres up -d --build
```

Не забудьте `APP_ENV=local`, иначе backend всё равно будет ходить в боевую базу, даже если локальный контейнер `db` запущен.

## Миграции

Миграции применяются через Alembic внутри Docker-контейнера.

### Первый запуск (чистая база)

```bash
docker compose up -d --build
```

Миграции применяются автоматически в `docker-compose.yml`. Поэтому после генерации миграции проверьте ее перед новым билдом

### Изменил модель — создай и примени миграцию

```bash
git pull

# Сгенерировать миграцию
docker compose exec backend alembic revision --autogenerate -m "описание_изменения"

# Просто накатить миграции на бд
docker compose exec backend alembic upgrade head

# Собрать проект и накатить миграции сразу можно через
docker compose up -d --build
```

Если autogenerate не находит изменений в моделях, файл миграции **не создаётся** — в лог пишется `No changes in schema detected.` (аналог `makemigrations` в Django). Это настроено в `backend/migrations/env.py` через хук `process_revision_directives`.

### Откатить последнюю миграцию

```bash
docker compose exec backend alembic downgrade -1
```

### База уже существует (таблицы созданы не через Alembic)

```bash
docker compose exec backend alembic stamp head
```

Это пометит текущее состояние как применённое без изменения схемы. Если после этого были добавлены новые поля — создай и примени миграцию как обычно.

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

В интерфейсе: **Local → Containers → victoria_landing-backend-1 → Logs**

(имена контейнеров генерируются Compose как `<project>-<service>-<номер>`, кроме `frontend`, у которого явно задан `container_name: victoria_frontend`)

### Деплой/CI CD

docker-compose.prod.yml — предназначен для проверки уже собранных образов из GHCR.
Для разработки docker-compose.yml docker compose up --build
GitHub Actions собирает образы и пушит их в GHCR

Разработка:
docker compose up --build

Проверка прода:
docker compose -f docker-compose.prod.yml pull
docker compose -f docker-compose.prod.yml up -d !

Важно: Нужно дождаться выполнения action на Github. Команды для прода работают с созданными и проверенными образами.
