const express = require('express');
const authController = require('./auth.controller.js');

const router = express.Router(); // eslint-disable-line new-cap

// #TODO: Implement authentication routes.

router.route('/sign-up')
.get(authController.signUpGet)
.post(authController.signUpPost);

router.route('/login')
.get(authController.loginGet)
.post(authController.loginPost)
.put(authController.loginPut);

router.route('/logout')
.get(authController.logoutGet);

router.route('/')
.get(authController.rootGet)
.delete(authController.rootDelete);

// router.post('/sign-up', );
// router.post('/login', );
// router.put('/login', );

module.exports = router;
