const router = require('express').Router();
const userCtrl = require('../controllers/userCtrl');

router.get('/user', userCtrl.findUser);


module.exports = router