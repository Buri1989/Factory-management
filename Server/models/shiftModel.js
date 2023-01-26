const mongoose = require('mongoose');

const shiftSchema = new mongoose.Schema(
    {
        date: Date,
        startingHour: Number,
        endingHour: Number,
    },
    { versionKey: false },

);

const Shift = mongoose.model('shifts', shiftSchema);

module.exports = Shift;