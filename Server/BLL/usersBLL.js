const { User } = require('../models/Model');

/*Get all users */
const getAllUsers = () => {
    return User.find({});
};

module.exports = { getAllUsers };
