const rooms = require('../game/rooms');

const getUniqueRoomCode = () => {
  let roomCode = Math.floor(Math.random() * (9999 - 1000) + 1000);
  while(true) {
    if (isRoomExist(roomCode)) {
      roomCode = Math.floor(Math.random() * (9999 - 1000) + 1000);
    } else return roomCode;
  }
};

const isRoomAvailable = (roomCode) => {
  return rooms[roomCode] && rooms[roomCode]['join'] === false;
};

const isRoomExist = (roomCode) => {
  return rooms[roomCode];
};

module.exports = {
  getUniqueRoomCode,
  isRoomAvailable,
};