# face-counter
Upload an image and let an AI count the faces

## How to start the app

``` sh
$ docker-compose up
```
The command above starts two docker machines:
- one with the api backend written in Node.js and Express, available at port 3000;
- the other with the Vue.js frontend, available at port 8080.

Both of these machines are in dev mode.

After the compose command have terminated download and start the docker machines, reach the application at http://localhost:8080