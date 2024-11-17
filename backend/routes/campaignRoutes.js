const express = require('express');
const { createCampaign, getCampaigns } = require('../controllers/campaignController');
const router = express.Router();
const { getCampaignStats } = require('../controllers/campaignController');
router.post('/', createCampaign);
router.get('/', getCampaigns);
router.get('/:campaignId/stats', getCampaignStats);
module.exports = router;
