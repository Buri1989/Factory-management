const user = require('../models/Model')


const getAllUsers = () => {
    return user.find({});
}

module.exports = { getAllUsers };