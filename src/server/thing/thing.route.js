const express = require('express');

const router = express.Router(); // eslint-disable-line new-cap
const hoursController = require('./thing.controller.js');

// #TODO: Implement thing.route.js.

router.route('/')
.get(hoursController.rootGet)
.post(hoursController.rootPost);

router.route('/:hoursId')
.get(hoursController.idGet)
.put(hoursController.idPut)
.delete(hoursController.idDelete);

module.exports = router;
