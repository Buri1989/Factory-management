const mongoose = require('mongoose')
const { Schema } = mongoose;

/*User Schema */
const userSchema = new Schema(
    {

        fullName: String,
        numOfActions: Number,
        password: String,
    },
    { versionKey: false }
);

/*Department Schema */
const departmentSchema = new Schema(
    {
        name: String,
        manager: String,

    },
    { versionKey: false }
);

/*Employee Schema */
const employeeSchema = new Schema(
    {
        firstName: String,
        lastName: String,
        startWorkYear: Number,
        departmentId: String,
    },
    { versionKey: false }
);

/**Shift Schema */
const shiftSchema = new Schema(
    {
        data: Date,
        startingHour: Number,
        endingHour: Number
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
