const keys = require("../config/keys");
const jwt = require('jsonwebtoken');

module.exports = authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  secretOrKey = keys.secretOrKey;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, secretOrKey, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }

      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};
