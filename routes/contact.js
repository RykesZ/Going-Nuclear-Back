const contact = require('../controllers/contact');
const express = require('express');
const router = express.Router();

router.post('/', contact.send);

module.exports = router;