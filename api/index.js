const express = require('express')
const cors = require("cors");
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const port = 3000

const app = express()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const corsOptions = {
  origin: "http://localhost:8080"
};

app.use(cors(corsOptions));

const sessions = {};
const adminList = ['niccord'];
const requestList = [];

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

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  jwt.verify(token, 'thisismyveryspecialsecretkey', (err, user) => {
    if (err) return res.sendStatus(401)
    req.user = user
    next()
  })
}

app.get('/requests', authenticateToken, (req, res) => {
  const username = req.params.username;
  const list = requestList.filter(request => request.username === username);
  return res.json(list);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})