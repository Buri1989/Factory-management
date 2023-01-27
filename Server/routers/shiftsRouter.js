const express = require('express')
const shiftBLL = require('../BLL/shiftBLL')

const router = express.Router();

// Entry Point 'http://localhost:8000/shifts'

/*Getting all the shifts */
router.route('/').get(async (req, res) => {
    try {
        const shifts = await shiftBLL.getAllShifts();
        res.json(shifts);
    } catch (error) {
        res.status(500).json(error.name);
    }
});

/*Add a new Shift */
router.route('/').post(async (req, res) => {
    try {
        const obj = req.body;
        const result = await shiftBLL.addNewShift(obj);
        res.json(result);
    } catch (error) {
        res.status(500).json(error.name);
    };
})

/*Update a shift */
router.route('/:id').put(async (req, res) => {
    try {
        const { id } = req.params;
        const obj = req.body;
        const result = await shiftBLL.updateShift(id, obj);
        res.json(result);
    } catch (error) {
        res.status(500).json(error.message);
    };
});


module.exports = router;