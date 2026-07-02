FROM node:24-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run gen
RUN npm run build
RUN npm run lint
