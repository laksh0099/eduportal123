const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    standard: { type: Number, required: true },
    division: { type: String, required: true },
    roomNo: { type: Number, required: true },
    rollNo: { type: Number, required: true, unique: true },
    password: { type: String, required: true },
    attendance: { type: Number, default: 0 },
    gender: { type: Boolean, required: true },
    year: { type: Number, required: true },
    studentId: { type: String, required: true, unique: true }
}, { timestamps: true });

studentSchema.virtual('fullName').get(function() {
    return `${this.firstName} ${this.lastName}`;
});

const StudentModel = mongoose.model('Student', studentSchema);
module.exports = StudentModel;
