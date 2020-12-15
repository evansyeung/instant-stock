FROM node:15.4.0

# ENV NODE_ENV=dev

WORKDIR /app

COPY package.json ./app

RUN npm install

COPY . /app

EXPOSE 8080

CMD ["npm", "run", "start:dev"]
# CMD ["npm","start"]
