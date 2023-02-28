FROM node:lts
RUN apt install python3 make g++
WORKDIR /usr/src/app/api
COPY package*.json .
COPY .env-example .env
RUN npm ci
EXPOSE 3000

CMD ["npm", "run", "docker-dev"]