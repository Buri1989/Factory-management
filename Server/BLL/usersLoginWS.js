const loginUsersVerified = require('../DAL/loginUsersVerifiedWS');

/*Filter the data received from the Ws and get only the username and email */
const validateUserameAndEmail = async (username, email) => {
    const response = await loginUsersVerified.getLoginData();
    const users = response.data;
    const result = users.filter(user => user.username === username && user.email === email);
    return result;
};

/*Get all the data from the users WS */
const getUsersDataFromWS = async () => {
    const response = await loginUsersVerified.getLoginData();
    const users = response.data;
    return users;
};

module.exports = { validateUserameAndEmail, getUsersDataFromWS };