"use strict";

var express = require('express');
var router = express.Router();

require('./department')(router);

module.exports = router;
