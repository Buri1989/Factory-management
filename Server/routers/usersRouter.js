const express = require('express');
const jwt = require('jwt');
const usersBLL = require('../BLL/usersBLL');
const userLoginWS = require('../BLL/usersLoginWS');
const actionFileBLL = require('../BLL/actionsFileBLL');
const authBLL = require('../BLL/authBLL');

const router = express.Router();

/*Entry Point 'http://localhost:8000/users'*/
router.route('/').get(async (req, res) => {
    const token = req.headers['x-access-token']
    if (!token) {
        res.status(401).json("No Token Provided");
    }
    const RSA_PRIVATE_KEY = req.socket.remoteAddress;
    jwt.verify(token, RSA_PRIVATE_KEY, async (err, data) => {
        if (err) {
            res.status(500).json("Failed to authenticate token")
        }
        try {
            const usersAuthValidation = await authBLL.isUserHasCredit(data.userId)
            const users = await usersBLL.getAllUsers();
            const usersLoginWs = await userLoginWS.getUsersDataFromWS();
            const allActionUsersFromFile = await actionFileBLL.getAllUsersDataFromFile();
            res.json({
                users,
                usersLoginWs,
                allActionUsersFromFile,
                currentUserFullName: data.name,
                userId: data.userId,
                creditNum: usersAuthValidation.creditNum
            })
        } catch (err) {
            res.status(500).json(`The error is: ${err.errmsg}`);
        }
    })
});

module.exports = router;