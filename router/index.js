const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

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

router.get('/api/', cors({origin: 'http://localhost:8080'}), (req, res) => {
  fs.readFile(path.join(__dirname, '../api/data.json'),
    (_, data) => {
      res.write(data);
      res.end();
    })
});

module.exports = router;