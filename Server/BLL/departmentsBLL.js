const { Department } = require('../models/Model');


/*Get all */
const getAllDepartments = async () => {
    return await Department.find({});
};

/*Get department by id */
const getDepartmentById = async (id) => {
    return await Department.findById({ _id: id });
};

/*Add new department */
const addDepartment = async (obj) => {
    let Departments = new Department(
        {
            name: obj.name,
            manager: obj.manager,
        });
    await Departments.save();
    return 'Created!';
};

/*Add new employee to department */
const updateSingleField = async (id, field, value) => {
    await Department.findByIdAndUpdate(id, { [field]: value })
    return 'Updated!';
};

/*Update department */
const updateDepartment = async (id, obj) => {
    await Department.findByIdAndUpdate(id,
        {
            name: obj.name,
            manager: obj.manager,
        });
    return 'Updated!';
};

/*delete department */
const deleteDepartment = async (id) => {
    await Department.findByIdAndDelete(id);
    return 'Deleted!';
};


module.exports = { getAllDepartments, getDepartmentById, addDepartment, updateSingleField, updateDepartment, deleteDepartment };

