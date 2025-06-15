FROM node:22.14.0-alpine AS builder

WORKDIR /app
COPY package.json .
RUN npm i
COPY . .
RUN npm run build

#Prod
FROM node:22.14.0-alpine

WORKDIR /app
COPY --from=builder /app/package*.json .
RUN npm ci --omit=dev
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/.env .env
COPY --from=builder /app/doc ./doc

CMD ["node", "dist/main"]