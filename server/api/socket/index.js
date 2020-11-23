const socket = require('socket.io');

const Game = require('../../game/Game');
const game = new Game();

module.exports = {
  startSocket: (server, props) => {
    const io = socket(server, props);

    io.on('connection', (socket) => {
      console.log('a user connected');
    });

    const nsp = io.of('/test');
    connectToNamespace(nsp);
  }
};

function createGame(size) {
  game.newGame({ size });
}

function connectToNamespace(nsp) {
  nsp.on('connection', (socket) => {
    console.log('a user connected to test room');

    socket.on('create-game', (size) => {
      createGame(size);
      socket.emit('get-available-moves', game.getAvailableMoves());
    });
    socket.on('make-move', (coords) => {
      const response = game.makeMove(coords);
      if (response.isNextTurn === true) {
        socket.emit('get-player-owned-square', response.ownedSquareCoords);
        socket.broadcast.emit('get-opponent-owned-square', response.ownedSquareCoords);
      } else if (response.isNextTurn === false) {
        nsp.emit('nextTurn');
      }
      nsp.emit('get-available-moves', response.availableMoves);
      socket.broadcast.emit('opponent-move', coords);
      if (game.isGameOver()) {
        nsp.emit('game-over');
      }
    });
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });
}
