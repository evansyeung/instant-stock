FROM node:15.4.0-alpine3.12

ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

WORKDIR /app

RUN apk update && apk add --no-cache chromium

ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser \
  DOCKER=true

COPY package.json ./app

RUN npm install

COPY . /app

CMD ["npm", "run", "start:dev"]
