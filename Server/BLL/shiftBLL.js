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

/*Updating a shift */
const updateShift = async (id, obj) => {
    await Shift.findByIdAndUpdate(id, obj);
    return 'Updated!';
};


module.exports = { getAllShifts, addNewShift, updateShift };