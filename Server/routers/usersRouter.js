const express = require('express');
const usersBLL = require('../BLL/usersBLL');

const router = express.Router();

/*Entry Point 'http://localhost:8000/users'*/

router.route('/').get(async (req, res) => {
    try {
        const users = await usersBLL.getAllUsers();
        res.json(users)
    } catch (error) {
        res.status(500).json(`The error is: ${error.errmsg}`);
    }
});

module.exports = router;