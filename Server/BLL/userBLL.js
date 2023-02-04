const { User } = require('../models/Model')


const getAllUsers = () => {
    try {
        return User.find({});
    } catch (error) {
        return error.name;
    };
};

module.exports = { getAllUsers };