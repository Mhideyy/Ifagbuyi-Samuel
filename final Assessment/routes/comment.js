const express = require('express');
const route = express.Router();
const { makeComment, getComment } = require('../controllers/comment');
const verify = require('../middleware/verify');


route.post('/comment', verify, makeComment);
route.get('/comment', verify, getComment);

module.exports = route;