const employee = require('../models/Model')
const departmentsBLL = require('./departmentsBLL');


/*Get - Get All - Read */
const getAllEmployees = () => {
    return employee.find({});
};

/*Get - Get by ID - Read */
const getEmployeeById = (id) => {
    return employee.findById({ _id: id })
};

/*Post - Create  */
const addEmployee = async (obj) => {
    const employee = new employee(obj);
    await employee.save();
    return 'Created!';
};

/*PUT - Update */
const updateEmployee = async (id, obj) => {
    await employee.findByIdAndUpdate(id, obj);
    return 'Updated!';
};

/*DELETE - Delete */
const deleteEmployee = async (id) => {
    await employee.findByIdAndDelete(id);
    return 'Deleted!';
};


module.exports = { getAllEmployees, getEmployeeById, addEmployee, updateEmployee, deleteEmployee }