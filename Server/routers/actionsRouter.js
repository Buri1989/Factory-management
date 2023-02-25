const express = require('express');
const actionsFileBLL = require('../BLL/actionsFileBLL');

const router = express.Router();

// Entry Point 'http://localhost:8000/systemUsers'

router.route('/').get(async (req, res) => {
    try {
        const actions = await actionsFileBLL.getAllUsersDataFromFile();
        res.json(actions);
    } catch (error) {
        res.status(500).json(`The error is: ${error.errmsg}`);
    }
});

/*Adding user data to file */
router.route('/').post(async (req, res) => {
    try {
        const obj = req.body;
        const result = await actionsFileBLL.addUserDataToFile(obj);
        res.json(result);
    } catch (error) {
        res.status(500).json(`The error is: ${error.errmsg}`);
    }
});

/*Update user data */
router.route('/:id').put(async (req, res) => {
    try {
        const { id } = req.params;
        const obj = req.body;
        const result = await actionsFileBLL.updateUserDataFromFile(id, obj);
        res.json(result);
    } catch (error) {
        res.status(500).json(`The error is: ${error.errmsg}`);
    }
});


router.route('/:id').delete(async (req, res) => {
    try {
        const { id } = req.params;
        const result = await actionsFileBLL.deleteUserDataFromFile(id);
        res.json(result);
    } catch (error) {
        res.status(500).json(`The error is: ${error.errmsg}`);
    }
});

module.exports = router;