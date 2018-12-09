const express = require('express');
const thingRoutes = require('./server/thing/thing.route');
const authRoutes = require('./server/auth/auth.route');
const authMiddleware = require('./index.route.middleware');

const router = express.Router(); // eslint-disable-line new-cap

// #TODO: Change to your model.
router.use('/auth', authRoutes);

router.use(authMiddleware);

router.use('/holiday-hours', thingRoutes);

module.exports = router;
