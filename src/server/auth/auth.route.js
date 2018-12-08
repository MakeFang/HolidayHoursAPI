const express = require('express');

const router = express.Router(); // eslint-disable-line new-cap

// #TODO: Implement authentication routes.

router.route('/sign-up')
.all()
.get()
.post();

router.route('/login')
.all()
.get()
.post()
.put();

router.get('/logout');

router.delete('/');

// router.post('/sign-up', );
// router.post('/login', );
// router.put('/login', );

module.exports = router;
