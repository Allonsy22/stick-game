const getRoomCode = () => {
  return Math.floor(Math.random() * (9999 - 1000) + 1000);
};

const isRoom = (props) => {
  const { roomId, rooms } = props;
  let isExistRoom = false;
  rooms.forEach( room => {
    if (room.id === roomId) isExistRoom = true;
  });
  return isExistRoom;
};

module.exports = {
  getRoomCode,
  isRoom,
};