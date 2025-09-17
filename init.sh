#!/bin/sh
echo "🚀 Запуск Yrgyz Taxi backend + Postgres..."

# 1. Поднимаем контейнеры
docker-compose up -d --build

# 2. Ждем, пока Postgres запустится
echo "⏳ Ждем запуск базы..."
sleep 5

# 3. Применяем миграции
echo "📦 Применяем миграции..."
docker-compose exec backend npx prisma migrate deploy

# 4. Генерируем Prisma Client
echo "⚙️ Генерируем Prisma client..."
docker-compose exec backend npx prisma generate

# 5. Запускаем Prisma Studio
echo "🌐 Запускаем Prisma Studio..."
docker-compose exec -d backend npx prisma studio

# 6. Готово
echo "✅ Yrgyz Taxi backend запущен на http://localhost:3000"
echo "✅ Prisma Studio доступен на http://localhost:5555"
