const newsletter = require('../controllers/newsletter');
const express = require('express');
const router = express.Router();

router.post('/', newsletter.subscribe);

module.exports = router;