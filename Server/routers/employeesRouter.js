const express = require('express');
const jwt = require('jsonwebtoken');
const shiftBLL = require('../BLL/shiftsBLL');
const departmentsBLL = require('../BLL/departmentsBLL');
const employeesBLL = require('../BLL/employeesBll');
const authBLL = require('../BLL/authBLL');
const { Shift } = require('../models/Model');

const router = express.Router();

/*Entry Point 'http://localhost:8000/employees'*/
router.route('/').get(async (req, res) => {
    const token = req.headers["x-access-token"];
    if (!token) {
        res.status(401).json("No Token Provided");
    }

    const RSA_PRIVATE_KEY = req.socket.remoteAddress;
    jwt.verify(token, RSA_PRIVATE_KEY, async (err, data) => {
        if (err) {
            res.status(500).json('Failed to authenticate token');
        }
        try {
            const employees = await employeesBLL.getAllEmployees();
            res.json({
                employees,
                currentUserFullName: data.name,
                userId: data.userId,
            });
        }
        catch (err) {
            res.status(500).json(`The error is: ${err.errmsg}`);
        }
    })
});

/* Entry Point: 'http://localhost:8888/employees/shiftsanddepartments'*/
router.route('/shiftsanddepartments').get(async (req, res) => {
    const token = req.headers["x-access-token"];
    if (!token) {
        res.status(401).json("No Token Provided");
    }

    const RSA_PRIVATE_KEY = req.socket.remoteAddress;
    jwt.verify(token, RSA_PRIVATE_KEY, async (err, data) => {
        if (err) {
            res.status(500).json('Failed to authenticate token');
        }
        try {
            const userValidation = await authBLL.isUserHasCredit(data.userId);
            const employees = await employeesBLL.getEmployeeById();
            const shifts = await shiftBLL.getShifts();
            const departments = await departmentsBLL.getAllDepartments();
            res.json({
                employees,
                shifts,
                departments,
                currentUserFullName: data.name,
                userId: data.userId,
                creditNum: userValidation.creditNum,
            });
        }
        catch (err) {
            res.status(500).json(`The error is: ${err.errmsg}`);
        }
    })
});

/*Entry Point: 'http://localhost:8888/employees */
router.route('/').post(async (req, res) => {
    const token = req.headers["x-access-token"];
    if (!token) {
        res.status(401).json("No Token Provided");
    }

    const RSA_PRIVATE_KEY = req.socket.remoteAddress;
    jwt.verify(token, RSA_PRIVATE_KEY, async (err, data) => {
        if (err) {
            res.status(500).json('Failed to authenticate token');
        }
        try {
            const obj = req.body;
            const result = await employeesBLL.addEmployee(obj);
            res.json({
                result,
                currentUserFullName: data.name,
                userId: data.userId,
            });
        }
        catch (err) {
            res.status(500).json(`The error is: ${err.errmsg}`);
        }
    })

});

/*Entry Point: 'http://localhost:8888/employees/id */
router.route('/:id').get(async (req, res) => {
    const token = req.headers["x-access-token"];
    const employeeId = req.headers["employee-id"];
    if (!token) {
        res.status(401).json("No Token Provided");
    }

    const RSA_PRIVATE_KEY = req.socket.remoteAddress;
    jwt.verify(token, RSA_PRIVATE_KEY, async (err, data) => {
        if (err) {
            res.status(500).json('Failed to authenticate token');
        }
        try {
            const userValidation = await authBLL.isUserHasCredit(data.userId)
            const employees = await employeesBLL.getAllEmployees(employeeId);
            res.json({
                employees,
                currentUserFullName: data.name,
                userId: data.userId,
                creditNum: userValidation.creditNum,
            });
        }
        catch (err) {
            res.status(500).json(`The error is: ${err.errmsg}`);
        }
    })
});

/*Entry Point: 'http://localhost:8888/employees/shiftsanddepartments/id */
router.route('/shiftsanddepartments/:id').get(async (req, res) => {
    const token = req.headers["x-access-token"];
    const employeeId = req.headers["employee-id"];

    if (!token) {
        res.status(401).json("No Token Provided");
    }
    const RSA_PRIVATE_KEY = req.socket.remoteAddress;

    jwt.verify(token, RSA_PRIVATE_KEY, async (err, data) => {
        if (err) {
            res.status(500).json('Failed to authenticate token');
        }
        try {
            const userValidation = await authBLL.isUserHasCredit(data.userId);
            const employees = await employeesBLL.updateEmployee(employeeId);
            const shifts = await shiftBLL.getShifts();
            const departments = await departmentsBLL.getAllDepartments();
            res.json({
                employees,
                shifts,
                departments,
                currentUserFullName: data.name,
                userId: data.userId,
                creditNum: userValidation.creditNum,
            });
        }
        catch (err) {
            res.status(500).json(`The error is: ${err.errmsg}`);
        }
    })
});

/*Entry Point: 'http://localhost:8888/employees/id */
router.route('/:id').put(async (req, res) => {
    const token = req.headers["x-access-token"];
    const employeeId = req.headers["employee-id"];
    const chosenDepartmentId = req.headers["chosen-department-id"];
    const obj = req.body;

    if (!token) {
        res.status(401).json("No Token Provided");
    }

    const RSA_PRIVATE_KEY = req.socket.remoteAddress;
    jwt.verify(token, RSA_PRIVATE_KEY, async (err, data) => {
        if (err) {
            res.status(500).json('Failed to authenticate token');
        }
        try {
            const userValidation = await authBLL.isUserHasCredit(data.userId)
            const result = await employeesBLL.getAllEmployees(employeeId, obj);
            /* Needs to Update the field Manager in the chosen department With employeeId */
            const status = await departmentsBLL.updateSingleField(chosenDepartmentId, "Manager", employeeId)
            res.json({
                result,
                currentUserFullName: data.name,
                creditNum: userValidation.creditNum,
            });
        }
        catch (err) {
            res.status(500).json(`The error is: ${err.errmsg}`);
        }
    })
});

/*Entry Point: 'http://localhost:8888/employees/id */
router.route('/:id').delete(async (req, res) => {
    const token = req.headers["x-access-token"];
    const employeeId = req.headers["employee-id"];
    if (!token) {
        res.status(401).json("No Token Provided");
    }

    const RSA_PRIVATE_KEY = req.socket.remoteAddress;
    jwt.verify(token, RSA_PRIVATE_KEY, async (err, data) => {
        try {
            const userValidation = await authBLL.isUserHasCredit(data.userId);
            const result = await employeesBLL.deleteEmployee(employeeId);
            /*Delete all employee shifts (run on shifts, in every shift if shift.Employees == employeeId),
            Delete the employeeId from this shift.*/
            const shifts = await shiftBLL.getShifts();
            shifts.map(async (shift) => {
                let shiftPetEmployee = [];
                shift.employees.forEach((empId) => {
                    if (empId !== employeeId) {
                        shiftPetEmployee.push(empId);
                    }
                })
                /*Update the current shift._id and give the new employee arr shiftPerEmployee */
                const resultUpdateShiftEmployees = await shiftBLL.updateShift(shift._id, {
                    date: shift.date,
                    endingHour: shift.endingHour,
                    startingHour: shift.startingHour,
                    employees: shiftPetEmployee,
                    creditNum: userValidation.creditNum
                })
            });
            res.json({
                result,
                currentUserFullName: data.name
            });
        }
        catch (err) {
            res.json(500).json(`The error is: ${err.errmsg}`);
        }
    })
});

module.exports = router;