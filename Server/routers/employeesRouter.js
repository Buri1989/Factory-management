const express = require('express')
const employeeBLL = require('../BLL/employeesBll');

const router = express.Router();

/*Entry Point 'http://localhost:8000/employees'*/

/*Get all employees */
router.route('/').get(async (req, res) => {
    try {
        const employees = await employeeBLL.getAllEmployees();
        res.json(employees);
    }
    catch (error) {
        res.status(500).json(`The error is: ${error.name}`);
    }
});

/*Get employee by id */
router.route('/:id').get(async (req, res) => {
    try {
        const { id } = req.params;
        const employee = await employeeBLL.getEmployeeById(id);
        res.json(employee);
    }
    catch (error) {
        res.status(500).json(`The error is: ${error.name}`);
    }
});

/*Add new employee */
router.route('/').post(async (req, res) => {
    try {
        const obj = req.body;
        const result = await employeeBLL.addEmployee(obj);
        res.json(result);
    }
    catch (error) {
        res.status(500).json(`The error is: ${error.name}`);
    }
});

/*Add new employee to shift */
router.route('/:id').post(async (req, res) => {
    try {
        const { id } = req.params;
        const shiftObj = req.body;
        const result = await employeeBLL.addEmployeeToShift(id, shiftObj);
        res.json(result);
    }
    catch (error) {
        res.status(500).json(`The error is: ${error.name}`);
    }
});

/*Update employee */
router.route('/:id').put(async (req, res) => {
    try {
        const { id } = req.params;
        const obj = req.body;
        const result = await employeeBLL.updateEmployee(id, obj);
        res.json(result);
    }
    catch (error) {
        res.status(500).json(`The error is: ${error.name}`);
    }
});

router.route('/:id').delete(async (req, res) => {
    try {
        const { id } = req.params;
        const result = await employeeBLL.deleteEmployee(id);
        res.json(result);
    }
    catch (error) {
        res.json(500).json(`The error is: ${error.name}`);
    }
})

module.exports = router;