const { Department } = require('../models/Model');
const mongoose = require('mongoose');


const getAllDepartments = () => {
    const pipeline = [{ $lookup: { from: "employees", localField: "manager", foreignField: "_id", as: "departmentManger" } },
    { $lookup: { from: "employees", localField: "_id", foreignField: "departmentId", as: "departmentEmployee" } }];
    return Department.aggregate(pipeline);
}


const getDepartmentById = (id) => {
    return Department.findById({ _id: id });
};

const addDepartment = async (obj) => {
    const Departments = new Department(obj);
    await Departments.save();
    return 'Created!';
};

const updateDepartment = async (id, obj) => {
    await Department.findByIdAndUpdate(id, obj);
    return 'Updated!';
};


const deleteDepartment = async (id) => {
    await Department.findByIdAndDelete(id);
    return 'Deleted!';
};

//Todo:add employee to department

module.exports = { getAllDepartments, getDepartmentById, addDepartment, updateDepartment, deleteDepartment };

