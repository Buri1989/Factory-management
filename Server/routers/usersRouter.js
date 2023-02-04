const express = require('express')
const userBLL = require('../BLL/userBLL')

const router = express.Router();

/*Entry Point 'http://localhost:8000/users' */

/*Getting all the users */
router.route('/').get(async (req, res) => {
    try {
        const users = await userBLL.getAllUsers();
        res.json(users);
    } catch (error) {
        res.status(500).json(error.name);
    }
});

module.exports = router;