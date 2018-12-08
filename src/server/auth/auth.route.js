const express = require('express');
const authController = require('./auth.controller.js');

const router = express.Router(); // eslint-disable-line new-cap

// #TODO: Implement authentication routes.

router.route('/sign-up')
.get(authController.signUpGet)
.post();

router.route('/login')
.get()
.post()
.put();

router.route('/logout')
.get();

router.route('/')
.delete();

// router.post('/sign-up', );
// router.post('/login', );
// router.put('/login', );

module.exports = router;
