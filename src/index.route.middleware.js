const _ = require('underscore');

const authentication = (req, res, next) => {
  const insecurePath = ['/api/auth/', '/api/auth/sign-up/', '/api/auth/login/', '/api/auth/logout/'];
  if (req.user || _.contains(insecurePath, req.path)) {
    return next();
  }
  return res.status(401).send('UNAUTHENTICATED');
};

module.exports = authentication;
