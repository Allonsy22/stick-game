const express = require('express');
const router = express.Router();
const getRandRoom = require('../../utils/utils').getRoomCode;
const rooms = require('../../game/rooms');

router.post('/', (req, res) => {
  const owner = req.body.owner;
  const room = createNewRoom(owner);
  res.status(200).json(room);
});

// isSameRoom = (room) => {
//   if (rooms.includes(room)) return true;
//   return false;
// };

createNewRoom = (owner) => {
  let room = getRandRoom();
  rooms.push({room, owner});
  return room;
};

module.exports = router;