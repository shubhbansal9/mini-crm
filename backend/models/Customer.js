const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    totalSpending: { type: Number, default: 0 },
    visits: { type: Number, default: 0 },
    lastVisit: { type: Date },
});

module.exports = mongoose.model('Customer', customerSchema);
