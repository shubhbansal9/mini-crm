const express = require('express');
const { sendMessage, updateReceipt } = require('../controllers/messageController');
const router = express.Router();
console.log('sendMessage:', sendMessage);

// Send personalized messages
router.post('/send', sendMessage);

// Update delivery receipt
router.post('/receipt', updateReceipt);

module.exports = router;
