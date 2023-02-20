const express = require('express');
const departmentsBLL = require('../BLL/departmentsBLL');

const router = express.Router();

/*Entry Point 'http://localhost:8000/departments'*/

/*Get All */
router.route('/').get(async (req, res) => {
    try {
        const departments = await departmentsBLL.getAllDepartments();
        res.json(departments);
    }
    catch (error) {
        res.status(500).json(`The error is: ${error.errmsg}`);
    }
});

/*Get department by id */
router.route('/:id').get(async (req, res) => {
    try {
        const { id } = req.params;
        const department = await departmentsBLL.getDepartmentById(id);
        res.json(department);
    }
    catch (error) {
        res.status(500).json(`The error is: ${error.errmsg}`);
    }
});

/*Add new department */
router.route('/').post(async (req, res) => {
    try {
        const obj = req.body;
        const result = await departmentsBLL.addDepartment(obj);
        res.json(result);
    }
    catch (error) {
        res.status(500).json(`The error is: ${error.errmsg}`);
    }
});

/*Add new employee to a department */
router.route('/:id').post(async (req, res) => {
    try {
        const { id } = req.params;
        const employeeObj = req.body;
        const result = await departmentsBLL.addEmployeeToDepartment(id, employeeObj);
        res.json(result);
    }
    catch (error) {
        res.status(500).json(`The error is: ${error.errmsg}`);
    }
});

/*Update department */
router.route('/:id').put(async (req, res) => {
    try {
        const { id } = req.params;
        const obj = req.body;
        const result = await departmentsBLL.updateDepartment(id, obj);
        res.json(result);
    }
    catch (error) {
        res.status(500).json(`The error is: ${error.errmsg}`);
    }
});

/*delete department*/
router.route('/:id').delete(async (req, res) => {
    try {
        const { id } = req.params;
        const result = await departmentsBLL.deleteDepartment(id);
        res.json(result);
    }
    catch (error) {
        res.status(500).json(`The error is: ${error.errmsg}`);
    }
});


module.exports = router;