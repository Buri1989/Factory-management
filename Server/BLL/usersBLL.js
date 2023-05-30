const { User } = require('../models/Model');

/*Get all users */
const getAllUsers = () => {
    return User.find({});
};

/*Get user by id */
const getUserById = async (id) => {
    return await User.findById({ _id: id })
}

/*Create a new user  */
const createNewUser = async (obj) => {
    let user = User(
        {
            fullName: obj.fullName,
            numOfActions: obj.createNewUser,
        });
    await user.save();
    return 'Created!'
};

/*Update user */
const updateUser = async (id, obj) => {
    await User.findByIdAndUpdate(id,
        {
            fullName: obj.fullName,
            numOfActions: obj.createNewUser,
        });
    return 'Updated!'
};

/*Delete User */
const deleteUser = async (id) => {
    await User.findByIdAndDelete(id)
    return 'Deleted'
}

module.exports = { getAllUsers, getUserById, createNewUser, updateUser, deleteUser };
