FROM node:23.11.0-slim AS development

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i -g pnpm && pnpm i

COPY . .

EXPOSE 3000

CMD ["pnpm", "start"]

FROM node:23.11.0-slim AS builder

WORKDIR /usr/src/app

COPY package*.json ./

COPY --from=development /usr/src/app/node_modules ./node_modules

RUN npm i -g pnpm && pnpm i --prod && pnpm i -D typescript

COPY . .

RUN pnpm build

FROM node:23.11.0-alpine3.21 AS production

WORKDIR /usr/src/app

COPY package*.json ./
COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/public ./public
COPY --from=builder /usr/src/app/.env ./.env

RUN npm i -g serve

EXPOSE 3000

CMD ["serve", "-s", "dist"]
