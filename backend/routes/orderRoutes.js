const express = require('express');
const { addOrder, getOrders } = require('../controllers/orderController');
const router = express.Router();

router.post('/', addOrder);
router.get('/', getOrders);

module.exports = router;
