FROM node:23.11.0-slim

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm i -g pnpm && pnpm i

COPY . .

EXPOSE 3000

CMD ["pnpm", "start"]
