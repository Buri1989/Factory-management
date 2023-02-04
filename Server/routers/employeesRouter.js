const express = require('express');
const employeesBLL = require('../BLL/employeesBll');

const router = express.Router();

/*Entry Point 'http://localhost:8000/employees' */

/*Get all employees */
router.route('/').get(async (req, res) => {
    try {
        const employees = await employeesBLL.getAllEmployees();
        res.json(employees);
    } catch (error) {
        res.status(500).json(error.name)
    };
});

/*Get employee by id */
router.route('/:id').get(async (req, res) => {
    try {
        const { id } = req.params;
        const emp = await employeesBLL.getEmployeeById(id);
        res.json(emp);
    } catch (error) {
        res.status(500).json(error.name);
    };
});

/*Add new employee */
router.route('/').post(async (req, res) => {
    try {
        const obj = req.body;
        const result = await employeesBLL.addEmployee(obj);
        res.json(result);
    } catch (error) {
        res.status(500).json(error.name);
    };
});

/*Update employee */
router.route('/:id').put(async (req, res) => {
    try {
        const { id } = req.params;
        const obj = req.body;
        const result = await employeesBLL.updateEmployee(id, obj);
        res.json(result);
    } catch (error) {
        res.status(500).json(error.name);
    };
});

/*Delete employee */
router.route('/:id').delete(async (req, res) => {
    try {
        const { id } = req.params;
        const result = await employeesBLL.deleteEmployee(id);
        res.json(result);
    } catch (error) {
        res.status(500).json(error.name);
    };
});

module.exports = router;