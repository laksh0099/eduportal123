const mongoose = require('mongoose');

const classSchema = new mongoose.Schema({
    roomNumber: { type: Number, required: true },
    monday: [{ type: mongoose.Schema.Types.ObjectId, ref: 'StudentLec' }],
    tuesday: [{ type: mongoose.Schema.Types.ObjectId, ref: 'StudentLec' }],
    wednesday: [{ type: mongoose.Schema.Types.ObjectId, ref: 'StudentLec' }],
    thursday: [{ type: mongoose.Schema.Types.ObjectId, ref: 'StudentLec' }],
    friday: [{ type: mongoose.Schema.Types.ObjectId, ref: 'StudentLec' }],
    saturday: [{ type: mongoose.Schema.Types.ObjectId, ref: 'StudentLec' }]
}, { timestamps: true });

const ClassModel = mongoose.model('Class', classSchema);
module.exports = ClassModel;
