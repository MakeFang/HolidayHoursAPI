const express = require('express');

const router = express.Router(); // eslint-disable-line new-cap
const thingsController = require('./thing.controller.js');

router.route('/')
.get(thingsController.rootget);

// #TODO: Implement thing.route.js.

router.route('/holiday-hours')
.all()
.get()
.post();

router.route('/holiday-hours/:hoursId')
.all()
.get()
.put()
.delete();

module.exports = router;
