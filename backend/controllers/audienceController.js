const Customer = require('../models/Customer');

// Define audience segments based on customer data
exports.getAudience = async (req, res) => {
    const { conditions } = req.body; // e.g., { totalSpending: { $gt: 10000 } }
    try {
        const audience = await Customer.find(conditions);
        res.status(200).json({
            success: true,
            audienceSize: audience.length,
            data: audience,
        });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};
