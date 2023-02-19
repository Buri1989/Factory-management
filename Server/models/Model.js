const mongoose = require('mongoose')

/*User Schema */
const userSchema = new mongoose.Schema(
    {
        fullName: String,
        numOfActions: Number,
    },
    { versionKey: false }
);

/*Department Schema */
const departmentSchema = new mongoose.Schema(
    {
        name: String,
        manager: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee' },
    },
    { versionKey: false }
);

/*Employee Schema */
const employeeSchema = new mongoose.Schema(
    {
        firstName: String,
        lastName: String,
        startWorkYear: Number,
        departmentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Department' },
        shifts: [String],

    },
    { versionKey: false }
);

/**Shift Schema */
const shiftSchema = new mongoose.Schema(
    {
        data: Date,
        startingHour: Number,
        endingHour: Number,
        shiftNumber: String,

    },
    { versionKey: false }
);


/*Creating a model */
const User = mongoose.model('user', userSchema);
const Department = mongoose.model('department', departmentSchema);
const Employee = mongoose.model('employee', employeeSchema);
const Shift = mongoose.model('shift', shiftSchema);

/*exporting a model */
module.exports = User;
module.exports = Department;
module.exports = Employee;
module.exports = Shift;
