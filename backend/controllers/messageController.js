const mongoose = require('mongoose'); 
const CommunicationLog = require('../models/CommunicationLog');
const pubSub = require('../utils/pubSub');

// Send personalized messages to the audience
exports.sendMessage = async (req, res) => {
    const { audience, messageTemplate, campaignId } = req.body;
    if (!campaignId) {
        return res.status(400).json({ success: false, error: 'Campaign ID is required' });
    }
    try {
        const messages = [];

        for (const customer of audience) {
            const personalizedMessage = messageTemplate.replace('{name}', customer.name);

            // Simulate delivery status
            const deliveryStatus = Math.random() < 0.9 ? 'SENT' : 'FAILED';

            // Create log
            const log = await CommunicationLog.create({
                campaignId: new mongoose.Types.ObjectId(campaignId), // Use 'new' here
                customerId: new mongoose.Types.ObjectId(customer._id),
                message: personalizedMessage,
                status: 'PENDING', // Default status
            });
            
            

            // Add to Pub-Sub messages
            messages.push({ logId: log._id, status: deliveryStatus });
        }

        // Publish the messages to the delivery-receipts topic
        pubSub.publish('delivery-receipts', messages);

        res.status(200).json({
            success: true,
            message: 'Messages sent to Pub-Sub for processing',
            logs: messages,
        });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};
exports.updateReceipt = async (req, res) => {
    const { logId, status } = req.body;

    try {
        await CommunicationLog.findByIdAndUpdate(
            logId,
            { status },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: 'Delivery receipt updated successfully',
        });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

// Subscriber for batch updating delivery statuses
pubSub.subscribe('delivery-receipts', async (messages) => {
    try {
        for (const message of messages) {
            await CommunicationLog.findByIdAndUpdate(
                message.logId,
                { status: message.status },
                { new: true }
            );
        }
        console.log('Batch processing completed');
    } catch (err) {
        console.error('Error processing messages:', err);
    }
});
