const { Employee } = require('../models/Model')


/*Get all employees */
const getAllEmployees = async () => {
    return await Employee.find({});
};

/*Get employee by id */
const getEmployeeById = async (id) => {
    return await Employee.findById({ _id: id });
};

/*Add new employee */
const addEmployee = async (obj) => {
    let employee = Employee(
        {
            firstName: obj.firstName,
            lastName: obj.lastName,
            startWorkYear: obj.startWorkYear,
            departmentId: obj.departmentId,
        });
    await employee.save();
    return 'Created!';
}

/*Add new employee to a new shift */
const updateSingleEmployee = async (id, field, value) => {
    await Employee.findByIdAndUpdate(id, { [field]: value });
    return 'Added New Employee To Shift';
}

/*Update an employee */
const updateEmployee = async (id, obj) => {
    await Employee.findByIdAndUpdate(id,
        {
            firstName: obj.firstName,
            lastName: obj.lastName,
            startWorkYear: obj.startWorkYear,
            departmentId: obj.departmentId,
        });
    return 'Updated';
}

/*Delete employee */
const deleteEmployee = async (id) => {
    await Employee.findByIdAndDelete(id)
    return 'Deleted'
}


module.exports = { getAllEmployees, getEmployeeById, addEmployee, updateSingleEmployee, updateEmployee, deleteEmployee }; 