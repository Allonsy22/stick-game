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
  "/signup",
  [
    verifySignUp.checkDuplicateEmail,
    verifySignUp.checkForEmailValidation,
  ],
  auth.signup
);

router.post("/signin", auth.signin);

router.get('/', auth.getAll);

module.exports = router;