const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');

router.post('/pay', customerController.makePayment);

module.exports = router;
