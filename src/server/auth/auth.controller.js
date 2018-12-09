// #TODO: Implement authentication controller.
const jwt = require('jsonwebtoken');
const Auth = require('./auth.model.js');

const authController = {};

authController.signUpGet = (req, res) => {
  // console.log('res locals are: ');
  // console.log(res.locals);
  const result = {
    message: '/api/auth/sign-up username password'
  };
  res.json(result);
};

authController.signUpPost = (req, res) => {
  const auth = new Auth(req.body);
  auth.save()
      .then((user) => {
        const token = jwt.sign({ _id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '60 days' });
        res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
        res.send(`${user.username} you are now signed up`);
      })
      .catch((err) => {
        res.send(err.message);
      });
};

authController.loginGet = (req, res) => {
  const result = {
    message: '/api/auth/login username password'
  };
  res.json(result);
};

authController.loginPost = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  Auth.findOne({ username }, 'username password')
      .then((user) => {
        if (!user) {
          return res.status(401).json({ message: 'Wrong Username or Password' });
        }

        user.comparePassword(password, (err, isMatch) => {
          if (!isMatch) {
            return res.status(401).json({ message: 'Wrong Username or Password' });
          }
          const token = jwt.sign({ _id: user._id, username }, process.env.JWT_SECRET, { expiresIn: '60 days' });
          res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
          return res.send(`${user.username} you are now logged in.`);
        });
        return 0;
      })
      .catch((err) => {
        res.send(err.message);
      });
};

authController.loginPut = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  if (!res.locals.currentUser) {
    res.send('You must be logged in');
  }
  if (username === res.locals.currentUser.username) {
    Auth.findOne({ username })
        .then((auth) => {
          auth.password = password;
          const newAuth = new Auth(auth);
          newAuth.save()
                 .then((user) => {
                   const token = jwt.sign({ _id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '60 days' });
                   res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
                   res.send(`${user.username} password updated`);
                 })
                 .catch((err) => {
                   res.send(err.message);
                 });
        });
  } else {
    res.status(403).send('You have to login to the account you wish to modify.');
  }
};

authController.logoutGet = (req, res) => {
  res.clearCookie('nToken');
  res.send('you are now logged out');
};

authController.rootGet = (req, res) => {
  if (res.locals.currentUser) {
    res.send(`You are logged in as ${res.locals.currentUser.username}`);
  } else {
    res.send('You are not logged in');
  }
};

authController.rootDelete = (req, res) => {
  res.send('things work');
};

module.exports = authController;
