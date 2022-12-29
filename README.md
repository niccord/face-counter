# face-counter
Upload an image and let an AI count the faces

## How to start the app

``` sh
$ docker-compose up
```
The command above starts two docker machines:
- one with the API backend written in Node.js and Express, available at port 3000;
- the other with the Vue.js frontend, available at port 8080.

Both of these machines are in dev mode.

After the compose command has terminated the download and started the docker machines, reach the application at http://localhost:8080

### Troubleshooting
If something odd happens, you might want to:
- reload the page, of course;
- CTRL-C on the `docker-compose up` command;
- rebuild the docker images with `docker build .` inside the `doc` or the `client` folder.

## Work on your computer
If you have Node.js v.18.12.1 installed on your computer, you can start both the frontend and the backend via the command line. \
You will need two sessions of the terminal. \
In the first terminal, launch the backend server:
``` sh
$ cd api/
$ npm install
$ npm run dev
```
In the second one, launch the frontend server:
``` sh
$ cd client/
$ npm install
$ npm run serve
```

Both servers are set to reload every time there is a change in your code.
