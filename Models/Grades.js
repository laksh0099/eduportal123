const mongoose = require('mongoose');

const gradesSchema = new mongoose.Schema({
    studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student', required: true },
    maths: { type: Number, required: true },
    science: { type: Number, required: true },
    english: { type: Number, required: true },
    ss: { type: Number, required: true },
    hindi: { type: Number, required: true },
    gujarati: { type: Number, required: true },
    pe: { type: Number, required: true },
    extra: { type: Number, required: true },
    standard: { type: Number, required: true }
}, { timestamps: true });

const GradesModel = mongoose.model('Grades', gradesSchema);
module.exports = GradesModel;
