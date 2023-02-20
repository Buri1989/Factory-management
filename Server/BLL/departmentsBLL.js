const { Department } = require('../models/Model');
const mongoose = require('mongoose');

/*Get all */
const getAllDepartments = () => {
    const pipeline = [{ $lookup: { from: "employees", localField: "manager", foreignField: "_id", as: "departmentManger" } },
    { $lookup: { from: "employees", localField: "_id", foreignField: "departmentId", as: "departmentEmployee" } }];
    return Department.aggregate(pipeline);
}

/*Get department by id */
const getDepartmentById = (id) => {
    const idObject = mongoose.Types.ObjectId(id);
    const pipeline = [{ $match: { _id: idObject } }, { $lookup: { from: "employees", localField: "_id", foreignField: "departmentId", as: "departmentEmployee" } }]
    //return Department.findById({ _id: id });
    return Department.aggregate(pipeline);
};

/*Add new department */
const addDepartment = async (obj) => {
    const Departments = new Department(obj);
    await Departments.save();
    return 'Created!';
};

/*Add new employee to department */
const addEmployeeToDepartment = async (id, name) => {
    const idObject = mongoose.Types.ObjectId(name);
    await Department.findByIdAndUpdate(id, { $set: { employees: { name: idObject } } });
    return 'Added New Employee To A Department';
}

/*Update department */
const updateDepartment = async (id, obj) => {
    await Department.findByIdAndUpdate(id, obj);
    return 'Updated!';
};

/*delete department */
const deleteDepartment = async (id) => {
    await Department.findByIdAndDelete(id);
    return 'Deleted!';
};


module.exports = { getAllDepartments, getDepartmentById, addDepartment, addEmployeeToDepartment, updateDepartment, deleteDepartment };

