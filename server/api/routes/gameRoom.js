const express = require('express');
const router = express.Router();
const roomUtils = require('../../game/rooms');

router.get('/', (req, res) => {
  const roomCode = roomUtils.getUniqueRoomCode();
  res.status(200).json(roomCode);
});

module.exports = router;