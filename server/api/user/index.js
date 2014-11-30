'use strict';

var express = require('express');
var controller = require('./user.controller');
var config = require('../../config/environment');
var auth = require('../../auth/auth.service');

var router = express.Router();
var passPrimaryParams = function(req, res, next) {
    req.primaryParams = req.params;
    next();
}

router.use('/:userid/messages', passPrimaryParams);
router.use('/:userid/messages', auth.isAuthenticated());
router.use('/:userid/messages', require('../message'));
router.get('/', auth.hasRole('admin'), controller.index);
router.delete('/:id', auth.hasRole('admin'), controller.destroy);
router.get('/me', auth.isAuthenticated(), controller.me);
router.put('/:id/password', auth.isAuthenticated(), controller.changePassword);
router.get('/:id', auth.isAuthenticated(), controller.show);
router.post('/', controller.create);

module.exports = router;
