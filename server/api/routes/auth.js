const express = require('express');
const router = express.Router();

const { verifySignUp } = require('../../middleware');
const auth = require('../../utils/auth');

router.use(function(req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.post(
  "/api/auth/signup",
  [
    verifySignUp.checkDuplicateEmail,
  ],
  auth.signup
);

router.post("/api/auth/signin", auth.signin);

router.get('/', (req, res) => {
  res.status(200).json('Hello');
});

module.exports = router;