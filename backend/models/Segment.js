const mongoose = require('mongoose');

const SegmentSchema = new mongoose.Schema({
    name: { type: String, required: true }, // Name of the segment
    conditions: { type: Object, required: true }, // Dynamic filter conditions
    audienceSize: { type: Number, required: true }, // Size of the matched audience
});

module.exports = mongoose.model('Segment', SegmentSchema);
