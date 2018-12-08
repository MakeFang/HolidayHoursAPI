// #TODO: Implement authentication controller.

// const Auth = require('./auth.model.js');

const authController = {};

authController.signUpGet = (req, res) => {
  const result = {
    message: '/api/auth/sign-up username password'
  };
  res.json(result);
};

authController.signUpPost = (req, res) => {
  res.send('things work');
};

authController.loginGet = (req, res) => {
  res.send('things work');
};

authController.loginPost = (req, res) => {
  res.send('things work');
};

authController.loginPut = (req, res) => {
  res.send('things work');
};

authController.logoutGet = (req, res) => {
  res.send('things work');
};

authController.rootDelete = (req, res) => {
  res.send('things work');
};

module.exports = authController;
