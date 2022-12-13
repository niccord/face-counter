const express = require('express')
const cors = require("cors");
const bodyParser = require('body-parser');
const port = 3000

const app = express()

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const corsOptions = {
  origin: "http://localhost:8080"
};

app.use(cors(corsOptions));

app.get('/', (req, res) => {
  return res.send('Hello World!')
})

// app.post('/post-test', (req, res) => {
//   console.log('Got body:', req.body);
//   res.sendStatus(200);
// });

app.post('/login', (req, res) => {
  // check username is in request
  if (!req.body.username) return res.send('no, thank you');
  const username = req.body.username;
  // check if user already have a session

  // is the user an admin?

  // create a session an give the user a key
  res.send({message: 'Welcome ' + username})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})