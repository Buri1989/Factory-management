const { Employee } = require('../models/Model')
const mongoose = require('mongoose0');


const getAllEmployees = () => {
    const pipeline = [{ $lookup: { from: "departments", localField: "departmentId", foreignField: "_id", as: "employeeDepartment" } },
    { $lookup: { from: "shifts", localField: "shifts.shiftNumber", foreignField: "shiftNumber", as: "employeeShift" } }];

    return Employee.aggregate(pipeline);
}

const getEmployeeById = (id) => {
    const idObject = mongoose.Types.ObjectId(id);
    const pipeline = [{ $match: { _id: idObject } }, { $lookup: { from: "shifts", localField: "shifts.shiftNumber", foreignField: "shiftNumber", as: "employeeShift" } }];

    return Employee.aggregate(pipeline);
}

const addEmployee = async (obj) => {
    const employee = new Employee(obj);
    await employee.save();
    return 'Created!';
}

const addEmployeeToShift = async (id, shiftNumber) => {
    const idObject = mongoose.Types.ObjectId(shiftNumber);
    await Employee.findByIdAndUpdate(id, { $addToSet: { shifts: { shiftNumber: idObject } } });
    return 'Added New Employee To Shift';
}

const updateEmployee = async (id, obj) => {
    await Employee.findByIdAndUpdate(id, obj);
    return 'Updated';
}

const deleteEmployee = async (id) => {
    await Employee.findByIdAndDelete(id)
    return 'Deleted'
}


module.exports = { getAllEmployees, getEmployeeById, addEmployee, addEmployeeToShift, updateEmployee, deleteEmployee }; v