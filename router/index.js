const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

router.get('/', (req, res) => {
  fs.readFile(
    path.join(__dirname, '../client/build/index.html'),
    (_, data) => {
      res.write(data);
      res.end();
    }
  )
});

router.get('/api/', (req, res) => {
  const allowedOrigins = ['http://localhost:8080', 'https://gren-javascript-calendar.herokuapp.com'];
  const origin = req.headers.origin;
  if(allowedOrigins.indexOf(origin) > -1) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  fs.readFile(path.join(__dirname, '../api/data.json'),
    (_, data) => {
      res.write(data);
      res.end();
    })
});

module.exports = router;