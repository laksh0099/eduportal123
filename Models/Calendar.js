const mongoose = require('mongoose');

const calendarSchema = new mongoose.Schema({
    title: { type: String, required: true },
    dateAndTime: { type: Date, required: true },
    type: { type: String, required: true }
}, { timestamps: true });

const Calendar = mongoose.model('Calendar', calendarSchema);
module.exports = Calendar;
