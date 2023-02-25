const actionsFile = require('../DAL/actionsFile');


const getAllUsersDataFromFile = async () => {
    const { actions } = await actionsFile.readFromFile();
    return actions;
};

/*Adding user data to file */
const addUserDataToFile = async (obj) => {
    const actions = await getAllUsersDataFromFile();
    actions.push(obj);
    const data = { actions };
    const result = await actionsFile.writeToFile(data);
    return result;
};

/*Update user data */
const updateUserDataFromFile = async (id, obj) => {
    const actions = await getAllUsersDataFromFile();
    const index = actions.findIndex((action) => action.id === +id);
    if (index !== -1) {
        actions[index] = obj;
        const data = { actions };
        const result = await actionsFile.writeToFile(data);
        return result;
    }
    return 'Wrong ID!';
};

/*Delete user data */
const deleteUserDataFromFile = async (id) => {
    const actions = await getAllUsersDataFromFile();
    const index = actions.findIndex((action) => action.id === +id);
    if (index !== -1) {
        actions.splice(index, 1);
        const data = { actions };
        const result = await actionsFile.writeToFile(data);
        return result;
    }
    return 'Wrong ID!';
};

module.exports = { getAllUsersDataFromFile, addUserDataToFile, updateUserDataFromFile, deleteUserDataFromFile };