const Shift = require('../models/shiftModel');

/*Get all the shifts */
const getAllShifts = () => {
    return Shift.find({});
};

/*Add new shift */
const addNewShift = async (obj) => {
    const newShift = new Shift(obj)
    await newShift.save();
    return 'Created!';
};

module.exports = { getAllShifts, addNewShift };