const socket = require('socket.io');

const Game = require('../../game/Game');
const game = new Game();

module.exports = {
  startSocket: (server, props) => {
    const io = socket(server, props);

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
  }
};

