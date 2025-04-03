const mongoose = require('mongoose');

const studentLecSchema = new mongoose.Schema({
    subject: { type: String, required: true },
    teacher: { type: String, required: true }  // Can be ObjectId if referring to a Faculty model
}, { timestamps: true });

const StudentLecModel = mongoose.model('StudentLec', studentLecSchema);
module.exports = StudentLecModel;
