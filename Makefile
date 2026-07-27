SHELL := powershell.exe

lint:
	cd frontend; npm run lint

build:
	docker compose build

up:
	docker compose up -d

down:
	docker compose down

logs:
	docker compose logs -f
