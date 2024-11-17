const express = require('express');
const { getAudience } = require('../controllers/audienceController');
const router = express.Router();

// Get audience based on conditions
router.post('/', getAudience);

module.exports = router;
