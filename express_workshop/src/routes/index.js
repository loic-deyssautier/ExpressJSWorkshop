const express = require('express');
const { helloWorldGet  } = require('../controllers/hello-world');
const { authenticate } = require('../middlewares/auth');
const { register, login, logout } = require('../controllers/auth');

const router = express.Router();

//auth route
router.post('/auth/signup', register);
router.post('/auth/login', login);
router.post('/auth/logout', logout);


router.get('/helloworld', [authenticate], helloWorldGet);

module.exports = router;