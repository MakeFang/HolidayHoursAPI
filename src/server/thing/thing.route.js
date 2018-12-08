const express = require('express');

const router = express.Router(); // eslint-disable-line new-cap
const hoursController = require('./thing.controller.js');

// #TODO: Implement thing.route.js.

router.route('/')
.all()
.get(hoursController.rootget)
.post();

router.route('/:hoursId')
.all()
.get()
.put()
.delete();

module.exports = router;
