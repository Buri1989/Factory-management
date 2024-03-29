const express = require('express')
const jwt = require('jsonwebtoken')
const userLoginWS = require('../BLL/usersLoginWS');
const authBLL = require('../BLL/authBLL');

const router = express.Router();

/*Entry Point 'http://localhost:8000/auth/login */
router.route('/login').post(async (req, res) => {
    const { username, email } = req.body;
    const ipAddress = req.socket.remoteAddress;
    const RSA_PRIVATE_KEY = ipAddress;

    try {
        const objResult = await userLoginWS.validateUserameAndEmail(username, email);

        /*Check if user exist */
        if (Object.keys(objResult).length > 0) {
            const userId = objResult[0].id;
            const name = objResult[0].name;

            const payload = {
                userId,
                name,
                iat: Math.floor(Date.now() / 1000) - 30,
            };

            /*JWT Sigh - will use name and the id later when verify the token */
            const tokenData = jwt.sign(payload, RSA_PRIVATE_KEY, { expiresIn: "24h" });

            const isUserAllowed = await authBLL.loginAuthCheck(userId);
            res.status(200).send({ token: tokenData, isUserAllowed });
        }
        else {
            res.status(401).send('Invalid username or email');
        }
    }
    catch (err) {
        consol.log(`The error is: ${err.errmsg}`)
    }
});

/*Entry Point: 'http://localhost:8888/auth/userstatus */
router.route('/userstatus').get(async (req, res) => {
    const token = req.headers["x-access-token"];
    if (!token) {
        res.status(401).json("No Token Provided")
    }

    const RSA_PRIVATE_KEY = req.socket.remoteAddress;

    jwt.verify(token, RSA_PRIVATE_KEY, async (err, data) => {
        if (err) {
            res.status(500).json("Failed to authenticate token");
        }
        try {
            const userValidation = await authBLL.getUserCreditStatus(data.userId);

            res.json({
                currentUserFullName: data.name,
                userId: data.userId,
                creditNumber: userValidation.creditNum,
            });
        } catch (err) {
            consol.log(`The error is: ${err.errmsg}`)
        }
    })
});

/*Entry Point: 'http://localhost:8888/auth/chargecredit' */
router.route('/chargecredit').get(async (req, res) => {
    const token = req.headers["x-access-token"];
    if (!token) {
        res.status(401).json("No Token Provided");
    }

    const RSA_PRIVATE_KEY = req.socket.remoteAddress;

    jwt.verify(token, RSA_PRIVATE_KEY, async (err, data) => {
        if (err) {
            res.status(500).json("Failed to authenticate token");
        }
        try {
            const userValidation = await authBLL.isUserHasCredit(data.userId);

            res.json({
                currentUserFullName: data.name,
                userId: data.userId,
                creditNumber: userValidation.creditNum,
            });
        } catch (err) {
            consol.log(`The error is: ${err.errmsg}`)
        }
    })

});

module.exports = router