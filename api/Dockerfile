FROM node:lts
RUN apt install python3 make g++
WORKDIR /usr/src/app/api
COPY package*.json .
RUN npm install --quiet
EXPOSE 3000

CMD ["npm", "run", "docker-dev"]