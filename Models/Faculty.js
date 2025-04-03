const mongoose = require('mongoose');

const facultySchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    subject1: { type: String, required: true },
    subject2: { type: String, required: false }, 
    gender: { type: Boolean, required: true },
    hod: { type: Boolean, required: true },
    roomNo: { type: Number, required: true },
    monday: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FacultyLec' }],
    tuesday: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FacultyLec' }],
    wednesday: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FacultyLec' }],
    thursday: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FacultyLec' }],
    friday: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FacultyLec' }],
    saturday: [{ type: mongoose.Schema.Types.ObjectId, ref: 'FacultyLec' }],
    password: { type: String, required: true }
}, { timestamps: true });

facultySchema.virtual('fullName').get(function() {
    return `${this.firstName} ${this.lastName}`;
});

const FacultyModel = mongoose.model('Faculty', facultySchema);
module.exports = FacultyModel;
