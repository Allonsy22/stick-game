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

const io = require('socket.io')(server, { origins: 'http://localhost:3000/' });

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('create-game', (size) => {
    createGame(size);
    socket.emit('get-available-moves', game.getAvailableMoves());
  });
  socket.on('make-move', (coords) => {
    console.log(coords);
  });
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

function createGame(size) {
  game.newGame({size});
}