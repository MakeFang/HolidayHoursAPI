const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const routes = require('../index.route');
const authMiddleware = require('../index.middleware');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Enable CORS - Cross Origin Resource Sharing.
app.use(cors());
app.use(cookieParser());

app.use(authMiddleware);

// Mount all routes on /api path.
app.use('/api', routes);

// #TODO: Additional non-API routes go here.

module.exports = app;
