FROM node:lts-alpine
WORKDIR /usr/src/app/client
COPY package*.json ./
RUN npm ci
COPY . .
COPY .env-example .env
EXPOSE 8080

CMD ["npm", "run", "serve"]