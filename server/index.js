const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const port = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.status(200).json('It works');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});