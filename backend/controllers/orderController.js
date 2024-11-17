const Order = require('../models/Order');

exports.addOrder = async (req, res) => {
    try {
        const order = new Order(req.body);
        await order.save();
        res.status(201).json({ success: true, data: order });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

exports.getOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('customerId');
        res.status(200).json({ success: true, data: orders });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};
