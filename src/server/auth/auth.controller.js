// #TODO: Implement authentication controller.
const jwt = require('jsonwebtoken');
const Auth = require('./auth.model.js');

const authController = {};

authController.signUpGet = (req, res) => {
  const result = {
    message: '/api/auth/sign-up username password'
  };
  res.json(result);
};

authController.signUpPost = (req, res) => {
  const auth = new Auth(req.body);
  auth.save()
      .then((user) => {
        const token = jwt.sign({ _id: user._id, username: user.username }, process.env.SECRET, { expiresIn: '60 days' });
        res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
        res.send(`${user.username} you are now signed up`);
      });
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
