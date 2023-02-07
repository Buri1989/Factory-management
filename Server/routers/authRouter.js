const express = require('express')
const jwt = require('jsonwebtoken')

const loginVerDAL = ('../DAL/loginVerifiedWS.js');

const router = express.Router();

/*Entry Point 'http://localhost:8000/auth */

router.route('/login').post(async (req, res) => {
    const { username, email } = req.body;


    /*if 'username' and 'email' are exist in https://jsonplaceholder.typicode.com/users*/

    try {
        const response = await loginVerDAL.getLoginData();
        const ACCESS_SECRET_TOKEN = response.data.find(user => user.username === username && user.email === email);

        /*If a match is found, sign and return the JWT*/
        if (ACCESS_SECRET_TOKEN) {
            const accessToken = jwt.sign({
                id: user.id,
                username: user.username
            },
                secret, {
                expiresIn: '1h'
            },
                ACCESS_SECRET_TOKEN
            );
            res.json(accessToken);
        } else {
            res.status(401).json({ error: 'Incorrect username or emil' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Could not retrieve user data' });
    }
});

module.exports = router