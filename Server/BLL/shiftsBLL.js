const { Shift } = require('../models/Model');


/*Add new shift + adding a shift number */
const addNewShift = async (obj) => {
    const shift = new Shift(obj);
    await shift.save();
    return 'Created!';
};

/*Update shift */
const updateShift = async (id, obj) => {
    await Shift.findByIdAndUpdate(id, obj);
    return 'Updated';
}


module.exports = { addNewShift, updateShift };