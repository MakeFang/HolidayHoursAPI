const jwt = require('jsonwebtoken');

const checkAuthStatus = (req, res, next) => {
  // console.log('Here are the cookies');
  // console.log(req.cookies);
  if (typeof req.cookies.nToken === 'undefined' || req.cookies.nToken === null) {
    req.user = null;
  } else {
    const token = req.cookies.nToken;
    const decodedToken = jwt.decode(token, { complete: true }) || {};
    req.user = decodedToken.payload;
  }
  res.locals.currentUser = req.user;
  // console.log('current user is:');
  // console.log(res.locals.currentUser);
  return next();
};

module.exports = checkAuthStatus;
