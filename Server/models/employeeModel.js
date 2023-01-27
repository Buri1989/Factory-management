const mongoose = require('mongoose')


const employeeSchema = new mongoose.Schema(
    {
        firstName: String,
        lastName: String,
        startWorkYear: Number,
        //departmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Departments' }
    },
    { versionKey: false }
);

const Employee = mongoose.model('employees', employeeSchema);

module.exports = Employee;