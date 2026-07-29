docker compose up -d --build
docker compose exec backend alembic revision --autogenerate 
docker compose exec backend alembic upgrade head
Write-Output "Swagger docs: http://127.0.0.1:8001/docs"
Write-Output "Front: http://localhost:3001/ru"
