const express = require('express');
const routes = express.Router();
const { makePost, findPost, findOnePost, likePost, dislikePost } = require('../controllers/post');
const verify = require('../middleware/verify');


routes.post('/post', verify,  makePost);
routes.get('/post', findPost);
routes.get('/post/:id', findOnePost);
routes.post('/like-post', verify, likePost);
routes.post('/dislike-post', verify, dislikePost);


module.exports = routes;