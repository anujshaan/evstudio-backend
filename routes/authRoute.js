const route = require('express').Router();
const authCtrl = require('../controllers/authCtrl');

route.post('/register', authCtrl.register);
route.post('/login', authCtrl.login);


module.exports = route;