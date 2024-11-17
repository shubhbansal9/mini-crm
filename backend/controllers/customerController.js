const Customer = require('../models/Customer');

exports.addCustomer = async (req, res) => {
    try {
        const customer = new Customer(req.body);
        await customer.save();
        res.status(201).json({ success: true, data: customer });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};

exports.getCustomers = async (req, res) => {
    try {
        const customers = await Customer.find();
        res.status(200).json({ success: true, data: customers });
    } catch (err) {
        res.status(400).json({ success: false, error: err.message });
    }
};
