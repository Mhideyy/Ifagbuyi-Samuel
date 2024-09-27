const express = require('express');
const routes = express.Router();
const verify = require('../middleware/verify')
const { createUser, loginUser, deleteUser, oauthRegister, logoutUser} = require('../controllers/user');

routes.post('/user', createUser);
routes.post('/oauth-user', oauthRegister);
routes.post('/login-user', loginUser);
routes.post('/logout-user', verify, logoutUser);
routes.delete('/delete-user', verify, deleteUser);

module.exports = routes;