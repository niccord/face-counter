FROM node:lts-alpine
WORKDIR /usr/app
COPY package.json .
RUN npm install --quiet
EXPOSE 3000

CMD ["npm", "run", "dev"]