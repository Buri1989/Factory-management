const Shift = require('../models/shiftModel');


const getAllShifts = () => {
    return Shift.find({});
};

module.exports = { getAllShifts };