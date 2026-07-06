# # --- production stage ---
# FROM node:20-slim AS runner
# WORKDIR /app
# # Копируем только необходимые файлы
# COPY --from=builder /app/package.json ./package.json
# COPY --from=builder /app/.next ./.next
# COPY --from=builder /app/public ./public

# # Устанавливаем только production-зависимости
# COPY --from=builder /app/node_modules ./node_modules

# EXPOSE 3000
# CMD ["npm", "start"]
