# --- base ---
FROM node:22.14.0-alpine AS base
WORKDIR /ath-backend
ADD package*.json ./

# --- dev ---
FROM base AS dev
RUN npm install
ADD . .
RUN npx prisma generate
CMD ["sh", "-c", "npx prisma migrate deploy && npm run start:dev"]

# --- build ---
FROM base AS build
RUN npm ci
ADD . .
RUN npm run build

# --- prod ---
FROM node:22.14.0-alpine AS prod
WORKDIR /ath-backend
COPY --from=build /ath-backend/dist ./dist
ADD package*.json ./
RUN npm ci --omit=dev
RUN npx prisma generate
CMD ["sh", "-c", "npx prisma migrate deploy && npm run start:prod"]

EXPOSE 3000