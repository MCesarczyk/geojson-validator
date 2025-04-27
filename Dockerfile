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

RUN groupadd --gid 1003 gvuser \
  && useradd --uid 1003 --gid gvuser --shell /bin/bash --create-home gvuser

COPY --chown=gvuser:gvuser --from=development /usr/src/app/node_modules ./node_modules

RUN npm i -g pnpm && pnpm i --prod && pnpm i -D typescript

COPY --chown=gvuser:gvuser . .

RUN pnpm build

FROM node:23.11.0-alpine3.21 AS production

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/dist ./dist

RUN npm i -g serve

RUN addgroup -S gvuser \
  && adduser -S gvuser -G gvuser \
  && chown -R gvuser:gvuser /usr/src/app

EXPOSE 3000

USER gvuser

CMD ["serve", "-s", "dist"]
