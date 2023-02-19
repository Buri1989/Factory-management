const { Employee } = require('../models/Model')
const mongoose = require('mongoose0');

/*Get all employees */
const getAllEmployees = () => {
    const pipeline = [{ $lookup: { from: "departments", localField: "departmentId", foreignField: "_id", as: "employeeDepartment" } },
    { $lookup: { from: "shifts", localField: "shifts.shiftNumber", foreignField: "shiftNumber", as: "employeeShift" } }];

    return Employee.aggregate(pipeline);
}

/*Get employee by id */
const getEmployeeById = (id) => {
    const idObject = mongoose.Types.ObjectId(id);
    const pipeline = [{ $match: { _id: idObject } }, { $lookup: { from: "shifts", localField: "shifts.shiftNumber", foreignField: "shiftNumber", as: "employeeShift" } }];

    return Employee.aggregate(pipeline);
}

/*Add new employee */
const addEmployee = async (obj) => {
    const employee = new Employee(obj);
    await employee.save();
    return 'Created!';
}

/*Add new employee to a new shift */
const addEmployeeToShift = async (id, shiftNumber) => {
    const idObject = mongoose.Types.ObjectId(shiftNumber);
    await Employee.findByIdAndUpdate(id, { $addToSet: { shifts: { shiftNumber: idObject } } });
    return 'Added New Employee To Shift';
}

/*Update an employee */
const updateEmployee = async (id, obj) => {
    await Employee.findByIdAndUpdate(id, obj);
    return 'Updated';
}

/*Delete employee */
const deleteEmployee = async (id) => {
    await Employee.findByIdAndDelete(id)
    return 'Deleted'
}


module.exports = { getAllEmployees, getEmployeeById, addEmployee, addEmployeeToShift, updateEmployee, deleteEmployee }; v