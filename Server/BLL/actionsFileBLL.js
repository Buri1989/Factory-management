const actionsFile = require('../DAL/actionsFile');


const getAllUsersDataFromFile = async () => {
    const actions = await actionsFile.readFromFile();
    return actions;
};



/*Update user data */
const updateUserDataFromFile = async (obj) => {
    const actions = await actionsFile.writeToFile(obj);
    return actions;
};



module.exports = { getAllUsersDataFromFile, updateUserDataFromFile, };