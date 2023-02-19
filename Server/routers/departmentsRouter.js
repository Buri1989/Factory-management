const express = require('express');
const departmentsBLL = require('../BLL/departmentsBLL');

const router = express.Router();

/*Entry Point 'http://localhost:8000/departments'*/

/*Get all departments */
router.route('/').get(async (req, res) => {
    try {
        const departments = await departmentsBLL.getAllDepartments();
        res.json(departments);
    }
    catch (error) {
        res.status(500).json(`The error is: ${error.name}`)
    };
});

/*Get departments by id */
router.route('/:id').get(async (req, res) => {
    try {
        const { id } = req.params;
        const depart = await departmentsBLL.getDepartmentsById(id);
        res.json(depart);
    }
    catch (error) {
        res.status(500).json(`The error is: ${error.name}`);
    };
});

/*Add new department */
router.route('/').post(async (req, res) => {
    try {
        const obj = req.body;
        const result = await departmentsBLL.addDepartment(obj);
        res.json(result);
    }
    catch (error) {
        res.status(500).json(`The error is: ${error.name}`);
    };
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
        res.status(500).json(`The error is: ${error.name}`);
    };
});

/*Delete department */
router.route('/:id').delete(async (req, res) => {
    try {
        const { id } = req.params;
        const result = await departmentsBLL.deleteDepartment(id);
        res.json(result);
    } catch (error) {
        res.status(500).json(`The error is: ${error.name}`);
    };
});

//Todo:Router for adding employee to department

module.exports = router;