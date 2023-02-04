const { Employee } = require('../models/Model')
const departmentsBLL = require('./departmentsBLL');


/*Get - Get All - Read */
const getAllEmployees = () => {
    try {
        return Employee.find({});
    } catch (error) {
        return error.name;
    };
};

/*Get - Get by ID - Read */
const getEmployeeById = (id) => {
    try {
        return Employee.findById({ _id: id })
    } catch (error) {
        return error.name;
    };
};

/*Post - Create  */
const addEmployee = async (obj) => {
    try {
        const employee = new Employee(obj);
        await employee.save();
        return 'Created!';
    } catch (error) {
        return error.name;
    };
};

/*PUT - Update */
const updateEmployee = async (id, obj) => {
    try {
        await Employee.findByIdAndUpdate(id, obj);
        return 'Updated!';
    } catch (error) {
        return error.name;
    };
};

/*DELETE - Delete */
const deleteEmployee = async (id) => {
    try {
        await Employee.findByIdAndDelete(id);
        return 'Deleted!';
    } catch (error) {
        return error.name;
    };
};


module.exports = { getAllEmployees, getEmployeeById, addEmployee, updateEmployee, deleteEmployee }