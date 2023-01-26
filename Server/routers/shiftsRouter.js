const express = require('express')
const shiftBLL = require('../BLL/shiftBLL')

const router = express.Router();

// Entry Point 'http://localhost:8000/shifts'

router.route('/').get(async (req, res) => {
    try {
        const shifts = await shiftBLL.getAllShifts();
        res.json(shifts);
    } catch (error) {
        res.status(500).json(error.name);
    }
});


module.exports = router;