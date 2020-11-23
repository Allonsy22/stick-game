const socket = require('socket.io');

const Game = require('../../game/Game');
game = new Game();
const roomUtils = require('../../game/rooms');

module.exports = {
  startSocket: (server, props) => {
    const io = socket(server, props);

    io.sockets.on('connection', (socket) => {
      console.log('the user connected');
    });

    const workspaces = io.of(/^\/\w+$/);
    workspaces.on('connection', socket => {
      const workspace = socket.nsp;
      const type = socket.handshake.query['type'];
      const roomCode = socket.handshake.query['room'];
      
      connectToNamespace(workspace, socket, game);
      
      console.log(roomUtils.getRooms());
    });
  }
};

function connectToNamespace(nsp, socket, game) {
  socket.on('create-game', (size) => {
    game.newGame(size);
    socket.emit('get-available-moves', game.getAvailableMoves());
  });
  socket.on('join-game', () => {
    socket.emit('get-game-size', game.getSize());
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
}
