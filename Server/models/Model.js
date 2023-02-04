const mongoose = require('mongoose')
const { Schema } = mongoose;

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
        shifts: Array,
        previousShifts: Array
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
const User = mongoose.model('users', userSchema);
const Department = mongoose.model('department', departmentSchema);
const Employee = mongoose.model('employees', employeeSchema);
const Shift = mongoose.model('shifts', shiftSchema);

/*exporting a model */
module.exports = User;
module.exports = Department;
module.exports = Employee;
module.exports = Shift;
