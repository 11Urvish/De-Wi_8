"use strict";

var express = require('express');
var router = express.Router();

require('./assignDevice')(router);

module.exports = router;
