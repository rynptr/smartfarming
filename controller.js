'use strict';

var response = require('./res');
var connection = require('./conn');

exports.index = function(req, res) {
    response.ok("Hello from the Node JS RESTful side!", res)
};

