const rooms = {};

const getUniqueRoomCode = () => {
  let roomCode = Math.floor(Math.random() * (9999 - 1000) + 1000);
  while (true) {
    if (isRoomExist(roomCode)) {
      roomCode = Math.floor(Math.random() * (9999 - 1000) + 1000);
    } else return roomCode;
  }
};

const createRoom = (roomCode, game) => {
  rooms[roomCode] = { 'create': true, game, 'join': false };
};

const joinRoom = (roomCode) => {
  rooms[roomCode]['join'] = true;
};

const getRoomGame = (roomCode) => {
  return rooms[roomCode]['game'];
};

const deleteRoom = (roomCode) => {
  delete rooms[roomCode];
};

const isRoomAvailable = (roomCode) => {
  return rooms[roomCode] && rooms[roomCode]['join'] === false;
};

const isRoomExist = (roomCode) => {
  return rooms[roomCode];
};

const roomUtils = {
  getUniqueRoomCode,
  isRoomAvailable,
  deleteRoom,
  createRoom,
  joinRoom,
  getRoomGame,
};

module.exports = roomUtils;