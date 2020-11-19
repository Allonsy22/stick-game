const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const Game = require('./game/Game');
const game = new Game();

const app = express();
app.use(bodyParser.json());
app.use(cors({ origin: true }));

const port = process.env.PORT || 3333;

app.get('/', (req, res) => {
  console.log(game.getAvailableMoves());
  res.status(200).json(game.getAvailableMoves());
});

app.post('/', (req, res) => {
  const i = req.body.i;
  const j = req.body.j;
  res.status(200).json(game.makeMove(i, j));
})

const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const rooms = [];

const io = require('socket.io')(server, { origins: '*' });

io.on('connection', (socket) => {
  console.log('a user connected');
  const type = socket.request._query['type'];
  const room = socket.request._query['room'];

  if (rooms.includes(room) && type === 'Create') {

  }
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
    } else if(response.isNextTurn === false) {
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
  game.newGame({size});
}