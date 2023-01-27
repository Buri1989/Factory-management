const mongoose = require('mongoose')

const departmentSchema = new mongoose.Schema(
    {
        name: String,
        //manager: { type: mongoose.Schema.Types.ObjectId, ref: 'employees' }
    },
    { versionKey: false }
);

const Department = mongoose.model('Departments', departmentSchema);

module.exports = Department;

/* const Employee = mongoose.model('employees', employeeSchema);

Department.find().populate('manger').exec((err, departments) => {
    if (err) return handleError(err);
    console.log(departments)
}); */

