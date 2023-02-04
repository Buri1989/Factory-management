const { Department } = require('../models/Model');
const employeesBll = require('./employeesBll');


/*Get - Get All - Read */
const getAllDepartments = () => {
    try {
        return Department.find({});
    } catch (error) {
        return error.name;
    };
};

/*Get - Get by ID - Read */
const getDepartmentsById = (id) => {
    try {
        return Department.findById({ _id: id })
    } catch (error) {
        return error.name;
    };
};

/*Post - Create  */
const addDepartment = async (obj) => {
    try {
        const depart = new Department(obj);
        await depart.save();
        return 'Created!';
    } catch (error) {

    }
}

/*PUT - Update */
const updateDepartment = async (id, obj) => {
    try {
        await Department.findByIdAndUpdate(id, obj);
        return 'Updated!';
    } catch (error) {
        return error.name;
    };
};

/*DELETE - Delete */
const deleteDepartment = async (id) => {
    try {
        await Department.findByIdAndDelete(id);
        return 'Deleted';
    } catch (error) {
        return error.name;
    };
};

module.exports = { getAllDepartments, getDepartmentsById, addDepartment, updateDepartment, deleteDepartment };