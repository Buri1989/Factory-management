const express = require('express');
const jwt = require('jsonwebtoken')
const shiftsBLL = require('../BLL/shiftsBLL');
const employeesBll = require('../BLL/employeesBll');
const authBLL = require('../BLL/authBLL');

const router = express.Router();


/*Entry Point 'http://localhost:8000/shifts'*/
router.route('/').get(async (req, res) => {
    const token = req.headers['x-access-token']
    if (!token) {
        res.status(401).json("No Token Provided");
    }
    const RSA_PRIVATE_KEY = req.socket.remoteAddress;
    jwt.verify(token, RSA_PRIVATE_KEY, async (err, data) => {
        if (err) {
            res.status(500).json("Failed to authenticate token")
        }
        try {
            const shifts = await shiftsBLL.getShifts();
            res.json({
                shifts,
                currentUserFullName: data.name,
                userId: data.userId,
            });
        } catch (err) {
            res.status(500).json(`The error is: ${err.errmsg}`);
        }
    })
});

/*Entry Point 'http://localhost:8000/shifts/employees'*/
router.route('/employees').get(async (req, res) => {
    const token = req.headers['x-access-token']
    if (!token) {
        res.status(401).json("No Token Provided");
    }
    const RSA_PRIVATE_KEY = req.socket.remoteAddress;
    jwt.verify(token, RSA_PRIVATE_KEY, async (err, data) => {
        if (err) {
            res.status(500).json("Failed to authenticate token")
        }
        try {
            const shifts = await shiftsBLL.getShifts();
            const usersAuthValidation = await authBLL.isUserHasCredit(data.userId)
            const employees = await employeesBll.getAllEmployees();

            res.json({
                shifts,
                employees,
                currentUserFullName: data.name,
                userId: data.userId,
                creditNum: usersAuthValidation.creditNum
            });
        } catch (err) {
            res.status(500).json(`The error is: ${err.errmsg}`);
        }
    })
});

/*Entry Point 'http://localhost:8000/shifts/id'*/
router.route('/').get(async (req, res) => {
    const token = req.headers['x-access-token']
    if (!token) {
        res.status(401).json("No Token Provided");
    }
    const RSA_PRIVATE_KEY = req.socket.remoteAddress;
    jwt.verify(token, RSA_PRIVATE_KEY, async (err, data) => {
        if (err) {
            res.status(500).json("Failed to authenticate token")
        }
        try {
            const shifts = await shiftsBLL.getShiftById(shiftId);
            res.json({
                shifts,
                currentUserFullName: data.name,
                userId: data.userId,
            });
        } catch (err) {
            res.status(500).json(`The error is: ${err.errmsg}`);
        }
    })
});

/*Entry Point 'http://localhost:8000/shifts/id'*/
router.route('/').post(async (req, res) => {
    const token = req.headers['x-access-token']
    if (!token) {
        res.status(401).json("No Token Provided");
    }
    const RSA_PRIVATE_KEY = req.socket.remoteAddress;
    jwt.verify(token, RSA_PRIVATE_KEY, async (err, data) => {
        if (err) {
            res.status(500).json("Failed to authenticate token")
        }
        try {
            const usersAuthValidation = await authBLL.isUserHasCredit(data.userId)
            /*Get the shift by id,
            extract employees array and add to is the employee and send is as a field */
            const shiftToUpdate = await shiftsBLL.getShiftById(obj.shift_id);
            let newEmployeeShift = shiftToUpdate.employees;
            newEmployeeShift.push(obj.employee_id);

            const updateDocument = await shiftsBLL.updateSingleField(
                obj.shift_id,
                obj.employee_id,
                newEmployeeShift
            )
            res.json({
                updateDocument,
                currentUserFullName: data.name,
                userId: data.userId,
                creditNum: usersAuthValidation.creditNum
            });
        } catch (err) {
            res.status(500).json(`The error is: ${err.errmsg}`);
        }
    })
});

/*Entry Point 'http://localhost:8000/shifts/update/id'*/
router.route('/').post(async (req, res) => {
    const token = req.headers['x-access-token']
    if (!token) {
        res.status(401).json("No Token Provided");
    }
    const RSA_PRIVATE_KEY = req.socket.remoteAddress;
    jwt.verify(token, RSA_PRIVATE_KEY, async (err, data) => {
        if (err) {
            res.status(500).json("Failed to authenticate token")
        }
        try {
            const usersAuthValidation = await authBLL.isUserHasCredit(data.userId)

            const updateShift = await shiftsBLL.updateShift(
                objData._id,
                objData.obj
            );
            res.json({
                updateShift,
                currentUserFullName: data.name,
                userId: data.userId,
                creditNum: usersAuthValidation.creditNum
            });
        } catch (err) {
            res.status(500).json(`The error is: ${err.errmsg}`);
        }
    })
});

/*Entry Point 'http://localhost:8000/shifts'*/
router.route('/').post(async (req, res) => {
    const token = req.headers['x-access-token']
    if (!token) {
        res.status(401).json("No Token Provided");
    }
    const RSA_PRIVATE_KEY = req.socket.remoteAddress;
    jwt.verify(token, RSA_PRIVATE_KEY, async (err, data) => {
        if (err) {
            res.status(500).json("Failed to authenticate token")
        }
        try {
            const usersAuthValidation = await authBLL.isUserHasCredit(data.userId)
            const result = await shiftsBLL.addNewShift(obj);

            res.json({
                result,
                currentUserFullName: data.name,
                userId: data.userId,
                creditNum: usersAuthValidation.creditNum
            });
        } catch (err) {
            res.status(500).json(`The error is: ${err.errmsg}`);
        }
    })
});



module.exports = router;