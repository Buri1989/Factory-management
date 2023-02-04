const department = require('../models/Model');
const employeesBll = require('./employeesBll');


/*Get - Get All - Read */
const getAllDepartments = () => {
    return department.find({});
};

/*Get - Get by ID - Read */
const getDepartmentsById = (id) => {
    return department.findById({ _id: id })
};

/*Post - Create  */
const addDepartment = async (obj) => {
    const depart = new department(obj);
    await depart.save();
    return 'Created!';

};

/*PUT - Update */
const updateDepartment = async (id, obj) => {
    await department.findByIdAndUpdate(id, obj);
    return 'Updated!';
};

/*DELETE - Delete */
const deleteDepartment = async (id) => {

    await department.findByIdAndDelete(id);
    return 'Deleted';
};

module.exports = { getAllDepartments, getDepartmentsById, addDepartment, updateDepartment, deleteDepartment };