"use strict";

var express = require('express');
var router = express.Router();

require('./device')(router);

module.exports = router;
