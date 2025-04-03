const mongoose = require('mongoose');

const facultyLecSchema = new mongoose.Schema({
    roomNumber: { type: Number, required: true },
    subject: { type: String, required: true },
    class: { type: String, required: true } // Refers to the class ID or name
}, { timestamps: true });

const FacultyLecModel = mongoose.model('FacultyLec', facultyLecSchema);
module.exports = FacultyLecModel;
