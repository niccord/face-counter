const express = require('express')
const cors = require("cors");
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const fileUpload = require("express-fileupload");
const port = 3000

const { authenticateToken, formatdate } = require('./utilities'); 
const faceapiService = require('./faceapiService');

const app = express()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(fileUpload());

const corsOptions = {
  origin: "http://localhost:8080"
};

app.use(cors(corsOptions));
app.use(express.static('out'));

const sessions = {};
const adminList = ['niccord'];
let requestNextId = 1;
const requestList = [];

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

app.post('/login', (req, res) => {
  // check username is in request
  if (!req.body.username) return res.sendStatus(400); // bad request

  const username = req.body.username;

  // check if user already have a session
  if (sessions[username]) return res.json(sessions[username]);

  // is the user an admin?
  if (adminList.includes(username)) {

  }

  // create a session an give the user a key
  jwt.sign({username}, 'thisismyveryspecialsecretkey', { expiresIn: '30m' }, (err,token)=>{
    res.json({ token });
  });
});

app.get('/requests', authenticateToken, (req, res) => {
  const username = req.user.username;
  const list = requestList.filter(request => request.username === username);
  return res.json(list);
});

app.post('/newRequest', authenticateToken, async (req, res) => {
  const { name } = req.body;
  const { file } = req.files;
  if (!file || !name) return res.sendStatus(400);

  const request = {
    id: requestNextId,
    username: req.user.username,
    name: name,
    status: 'enqueued',
  };
  requestList.push(request);
  requestNextId += 1;

  const filename = formatdate(new Date()) + '-' + file.name;
  sleep(5_000).then(() => {
    request.status = 'progress';

    // face api process file
    return faceapiService.detect(file.data, filename);
  }).then((detections) => {
    request.status = 'ready';

    // save it to the array
    request.faceDetected = detections.length;
    request.thumbnail =  `http://localhost:3000/${filename}`;
  }).catch((err) => {
    console.error(`error counting faces on image ${request.id}`, err);
    request.status = 'error'
  });

  res.sendStatus(201);
});

app.listen(port, () => {
  console.log(`Face-counter API app listening on port ${port}`)
});