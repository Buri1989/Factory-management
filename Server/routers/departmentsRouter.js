const express = require('express');
const departmentsBLL = require('../BLL/departmentsBLL');
const jwt = require('jsonwebtoken');
const employeesBLL = require('../BLL/employeesBll');
const authBLL = require('../BLL/authBLL');

const router = express.Router();

/*Entry Point 'http://localhost:8000/departments'*/
router.route('/').get(async (req, res) => {
    const token = req.headers["x-access-token"];
    if (!token) {
        res.status(401).json("No Token Provided");
    }
    const RSA_PRIVATE_KEY = req.socket.remoteAddress;
    jwt.verify(token, RSA_PRIVATE_KEY, async (err, data) => {
        if (err) {
            res.status(500).json("Failed to authenticate token");
        }
        try {
            const departments = await departmentsBLL.getAllDepartments();
            const userValidation = await authBLL.isUserHasCredit(data.userId)
            res.json({
                departments,
                currentUserFullName: data.name,
                userId: data.userId,
                creditNum: userValidation.creditNum
            });
        }
        catch (err) {
            res.status(500).json(`The error is: ${err.errmsg}`);
        }
    })
});

/*Entry Point: "http://localhost:8888/departments/employees" */
router.route('/employees').get(async (req, res) => {
    const token = req.headers["x-access-token"];
    if (!token) {
        res.status(401).json("No Token Provided");
    }
    const RSA_PRIVATE_KEY = req.socket.remoteAddress;
    jwt.verify(token, RSA_PRIVATE_KEY, async (err, data) => {
        if (err) {
            res.status(500).json("Failed to authenticate token");
        }
        try {
            const departments = await departmentsBLL.getAllDepartments();
            const userValidation = await authBLL.isUserHasCredit(data.userId)
            const employees = await employeesBLL.getAllEmployees();
            res.json({
                departments,
                employees,
                currentUserFullName: data.name,
                userId: data.userId,
                creditNum: userValidation.creditNum
            });
        }
        catch (err) {
            res.status(500).json(`The error is: ${err.errmsg}`);
        }
    })
});

/*Entry Point: 'http://localhost:8888/departments/id' */
router.route('/:id').get(async (req, res) => {
    const token = req.headers["x-access-token"];
    const departmentId = req.headers["department-id"];
    if (!token) {
        res.status(401).json("No Token Provided");
    }
    const RSA_PRIVATE_KEY = req.socket.remoteAddress;
    jwt.verify(token, RSA_PRIVATE_KEY, async (err, data) => {
        if (err) {
            res.status(500).json("Failed to authenticate token");
        }
        try {
            const departmentData = await departmentsBLL.getDepartmentById(departmentId);
            const userValidation = await authBLL.isUserHasCredit(data.userId)
            const employees = await employeesBLL.getAllEmployees();
            res.json({
                departmentData,
                employees,
                currentUserFullName: data.name,
                userId: data.userId,
                creditNum: userValidation.creditNum
            });
        }
        catch (err) {
            res.status(500).json(`The error is: ${err.errmsg}`);
        }
    })
});

/*Entry Point: 'http://localhost:8888/departments' */
router.route('/:id').put(async (req, res) => {
    const token = req.headers["x-access-token"];
    const obj = req.body
    if (!token) {
        res.status(401).json("No Token Provided");
    }
    const RSA_PRIVATE_KEY = req.socket.remoteAddress;
    jwt.verify(token, RSA_PRIVATE_KEY, async (err, data) => {
        if (err) {
            res.status(500).json("Failed to authenticate token");
        }
        try {
            const newDepartmentId = await departmentsBLL.addDepartment(obj);
            const userValidation = await authBLL.isUserHasCredit(data.userId)

            res.json({
                newDepartmentId,
                currentUserFullName: data.name,
                userId: data.userId,
                creditNum: userValidation.creditNum
            });
        }
        catch (err) {
            res.status(500).json(`The error is: ${err.errmsg}`);
        }
    })
});

/*Entry Point: 'http://localhost:8888/departments/id' */
router.route('/:id').put(async (req, res) => {
    const token = req.headers["x-access-token"];
    const bodyObj = req.body;
    if (!token) {
        res.status(401).json("No Token Provided");
    }
    const RSA_PRIVATE_KEY = req.socket.remoteAddress;
    jwt.verify(token, RSA_PRIVATE_KEY, async (err, data) => {
        if (err) {
            res.status(500).json("Failed to authenticate token");
        }
        try {
            const result = await departmentsBLL.updateDepartment(bodyObj._id, bodyObj.obj);
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

/*Entry Point: 'http://localhost:8888/departments/id' */
router.route('/:id').delete(async (req, res) => {
    const token = req.headers["x-access-token"];
    const departmentId = req.headers["department-id"];
    const departmentManagerId = req.headers["department-manager-id"];
    if (!token) {
        res.status(401).json("No Token Provided");
    }
    const RSA_PRIVATE_KEY = req.socket.remoteAddress;
    jwt.verify(token, RSA_PRIVATE_KEY, async (err, data) => {
        if (err) {
            res.status(500).json("Failed to authenticate token");
        }
        try {
            /*Go to departmentManagerId employee and put "" (empty), in his departmentID field */
            const updateDocument = await employeesBLL.updateSingleField(departmentManagerId, " departmentManagerId", "")
            const result = await departmentsBLL.deleteDepartment(departmentId);
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


module.exports = router;