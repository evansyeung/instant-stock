FROM node:15.4.0
# FROM node:15.4.0-alpine3.12

# ENV NODE_ENV=dev
# ENV PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true

WORKDIR /app

COPY package.json ./app

RUN npm install

COPY . /app

# RUN apk add --no-cache chromium

# ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser \
#   DOCKER=true

# EXPOSE 8080

CMD ["npm", "run", "start:dev"]
# CMD ["npm","start"]
