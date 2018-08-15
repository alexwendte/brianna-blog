/* eslint-disable no-console */
const dotenv = require('dotenv');

const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const cors = require('cors');

const PORT = 3333;
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env') });
dotenv.load();

// initialize the application and create the routes
const app = express();

// allow cors so my site can communicate with my back-end.
app.use(cors());

const router = express.Router();

// so that I can look at the body of post requests
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve any static files
router.use(express.static(path.resolve(__dirname, '../build'), { maxAge: '30d' }));

// tell the app to use the above rules
app.use(router);

require('./routes')(app, nodemailer);

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'), err => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

// start the app
app.listen(PORT, error => {
  if (error) {
    return console.error('something bad happened', error);
  }

  console.log(`Backend listening on port ${PORT}... \n go to http://localhost:${PORT} to view the server-rendered app`);
});
