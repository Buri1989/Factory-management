const express = require('express');
const shiftsBLL = require('../BLL/shiftsBLL');

const router = express.Router();

/*Entry Point 'http://localhost:8000/shifts'*/

/*Add new shift */
router.route('/').post(async (req, res) => {
    try {
        const obj = req.body;
        const result = await shiftsBLL.addNewShift(obj);
        res.json(result);
    } catch (error) {
        res.status(500).json(`The error is: ${error.errmsg}`);
    }
});

/*Update shift */
router.route('/:id').put(async (req, res) => {
    try {
        const { id } = req.params;
        const obj = req.body;
        const result = await shiftsBLL.updateShift(id, obj);
        res.json(result);
    } catch (error) {
        res.status(500).json(`The error is: ${error.errmsg}`);
    }
});

module.exports = router;