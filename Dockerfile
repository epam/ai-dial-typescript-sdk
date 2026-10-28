FROM node:24-alpine

RUN apk update && apk upgrade --no-cache

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

RUN npm run gen
RUN npm run build
RUN npm run lint

# npm is only needed for the build steps above; drop it so its bundled deps (e.g. undici) don't ship in the image
RUN rm -rf /usr/local/lib/node_modules/npm /usr/local/bin/npm /usr/local/bin/npx
