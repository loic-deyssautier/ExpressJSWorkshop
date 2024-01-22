const express = require('express');
const { helloWorldGet  } = require('../controllers/hello-world');

const router = express.Router();

router.get('/helloworld', helloWorldGet);

module.exports = router;