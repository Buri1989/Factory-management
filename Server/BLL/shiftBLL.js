const Shift = require('../models/Model')

/*Get all the shifts */
const getAllShifts = () => {
    try {
        return Shift.find({});
    } catch (error) {
        return error.name;
    }
};

/*Add new shift */
const addNewShift = async (obj) => {
    try {
        const newShift = new Shift(obj)
        await newShift.save();
        return 'Created!';
    } catch (error) {
        return error.name;
    }
};

/*Updating a shift */
const updateShift = async (id, obj) => {
    try {
        await Shift.findByIdAndUpdate(id, obj);
        return 'Updated!';
    } catch (error) {
        return error.name;
    }
};


module.exports = { getAllShifts, addNewShift, updateShift };