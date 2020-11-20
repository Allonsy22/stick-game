const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const rooms = require('./game/rooms');

const Game = require('./game/Game');
const game = new Game();

const gameRoutes = require('./api/routes/gameRoom');
const authRoutes = require('./api/routes/auth');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors({ origin: true }));

app.use('/gameRoom', gameRoutes);
app.use('/auth', authRoutes);

const port = process.env.PORT || 3333;

app.get('/', (req, res) => {
  res.status(200).json(rooms);
});

app.post('/', (req, res) => {
  res.status(200).json(req.body);
});

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const io = require('socket.io')(server, { origins: '*' });

io.on('connection', (socket) => {
  console.log('a user connected');
  const type = socket.request._query['type'];
  const room = socket.request._query['room'];

  socket.join('game');

  socket.on('create-game', (size) => {
    createGame(size);
    socket.emit('get-available-moves', game.getAvailableMoves());
  });
  socket.on('make-move', (coords) => {
    const response = game.makeMove(coords);
    if (response.isNextTurn === true) {
      socket.emit('get-player-owned-square', response.ownedSquareCoords);
      socket.broadcast.to('game').emit('get-opponent-owned-square', response.ownedSquareCoords);
    } else if (response.isNextTurn === false) {
      io.to('game').emit('nextTurn');
    }
    io.to('game').emit('get-available-moves', response.availableMoves);
    socket.broadcast.to('game').emit('opponent-move', coords);
    if (game.isGameOver()) {
      io.to('game').emit('game-over');
    }
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

function createGame(size) {
  game.newGame({ size });
}