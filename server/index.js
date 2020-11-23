const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const gameRoutes = require('./api/routes/gameRoom');
const authRoutes = require('./api/routes/auth');

const socket = require('./api/socket');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: true }));

app.use('/gameRoom', gameRoutes);
app.use('/auth', authRoutes);

const port = process.env.PORT || 3333;

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

socket.startSocket(server, { origins: '*' });