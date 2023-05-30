const { Shift } = require('../models/Model');

/*Get Shifts */
const getShifts = async () => {
    return await Shift.find({});
};

/*Get Shift by id */
const getShiftById = async (id) => {
    return await Shift.findById({ _id: id });
};


/*Add new shift  */
const addNewShift = async (obj) => {
    let shift = Shift(
        {
            data: obj.data,
            startingHour: obj.startingHour,
            endingHour: obj.endingHour,
            employees: obj.employees,
        });
    await shift.save();
    return 'Created!';
};

/*Update shift */
const updateShift = async (id, obj) => {
    await Shift.findByIdAndUpdate(id,
        {
            data: obj.data,
            startingHour: obj.startingHour,
            endingHour: obj.endingHour,
            employees: obj.employees,
        });
    return 'Updated';
};

/*Update single shift */
const updateSingleShift = async (id, field, value) => {
    await Shift.findByIdAndUpdate(id, { [field]: value })
    return 'Updated';
};

/*Delete Shift */
const deleteShift = async (id) => {
    await Shift.findByIdAndDelete(id);
    return 'Deleted!';
}


module.exports = { getShifts, getShiftById, addNewShift, updateShift, updateSingleShift, deleteShift };