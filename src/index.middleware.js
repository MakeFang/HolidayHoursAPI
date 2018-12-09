const jwt = require('jsonwebtoken');

const checkAuthStatus = (req, res, next) => {
  if (typeof req.cookies.nToken === 'undefined' || req.cookies.nToken === null) {
    req.user = null;
  } else {
    const token = req.cookies.nToken;
    const decodedToken = jwt.decode(token, { complete: true }) || {};
    req.user = decodedToken.payload;
  }
  res.locals.currentUser = req.user;
  return next();
};

module.exports = checkAuthStatus;
