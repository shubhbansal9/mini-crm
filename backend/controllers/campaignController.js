const Campaign = require('../models/Campaign');
const CommunicationLog = require('../models/CommunicationLog');

exports.createCampaign = async (req, res) => {
    try {
        const { name, message, audienceSize } = req.body;

        const campaign = new Campaign({ name, message, audienceSize });
        await campaign.save();
        res.status(201).json({ success: true, data: campaign });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

exports.getCampaigns = async (req, res) => {
    try {
        const campaigns = await Campaign.find();
        res.status(200).json({ success: true, data: campaigns });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

exports.getCampaignStats = async (req, res) => {
    const { campaignId } = req.params;

    try {
        const logs = await CommunicationLog.find({ campaignId });

        const total = logs.length;
        const sent = logs.filter(log => log.status === 'SENT').length;
        const failed = logs.filter(log => log.status === 'FAILED').length;

        res.status(200).json({
            success: true,
            stats: {
                total,
                sent,
                failed,
            },
        });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};
