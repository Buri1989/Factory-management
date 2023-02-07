const express = require('express')
const jwt = require('jsonwebtoken')

const router = express.Router();

/*Entry Point 'http://localhost:8000/welcome */

router.route('/').get(async (req, res) => {
    const token = req.headers['x-access-token'] /*{ 'x-access-token' : accessToken}*/

    if (!token) {
        res.status(401).json('No Token Provided!');
    }

    const ACCESS_SECRET_TOKEN = response.data.find(user => user.username === username && user.email === email);

    /*Checking if the received token is the same as the secret token */
    jwt.verify(token, ACCESS_SECRET_TOKEN, (err, data) => {
        if (err) {
            res.status(5000).json('Failed to authenticate token')
        }
        /* Get data from WS and send to the user*/
        data = [{ username: 'username' }, { email: 'email' }]
        res.json(data);
    })
})

module.exports = router;