const express = require('express');
const router = express.Router();
const orderController = require('../controller/ordercontroller');


router.post('/placeorder', orderController.placeOrder);

module.exports = router;