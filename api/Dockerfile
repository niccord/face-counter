FROM node:lts-alpine
WORKDIR /usr/src/app/api
COPY package*.json .
RUN npm install --quiet
EXPOSE 3000

CMD ["npm", "run", "dev"]