const express = require('express');
const path = require('path');
const router = require('./router/index');

const app = express();
const port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, 'client/build')));
app.use('/', router);

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});