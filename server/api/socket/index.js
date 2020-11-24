const socket = require('socket.io');

const Game = require('../../game/Game');
const roomUtils = require('../../game/rooms');

module.exports = {
  startSocket: (server, props) => {
    const io = socket(server, props);

    io.sockets.on('connection', (socket) => {
      console.log('a user connected');
    });

    const workspaces = io.of(/^\/\w+$/);
    workspaces.on('connection', socket => {
      const workspace = socket.nsp;
      const type = socket.handshake.query['type'];
      const roomCode = socket.handshake.query['room'];
      
      console.log(`socket ${type} connected to room ${roomCode}`);

      let game;
      if (type === 'create') {
        game = new Game();
        socket.on('create-game', (size) => {
          game.newGame({size});
          socket.emit('get-available-moves', game.getAvailableMoves());
          roomUtils.createRoom(roomCode, game);
        });
      }
      if (type === 'join') {
        if (roomUtils.isRoomAvailable(roomCode)) {
          roomUtils.joinRoom(roomCode);
          game = roomUtils.getRoomGame(roomCode);
          socket.on('join-game', () => {
            socket.emit('get-game-size', game.getSize());
          });
          workspace.emit('game-is-ready');
        }
      }
      connectToNamespace(workspace, socket, game, roomCode);
    });
  }
};

function connectToNamespace(nsp, socket, game, roomCode) {
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
    nsp.emit('opponent-disconected');
    console.log('user disconnected', roomCode);
  });
}