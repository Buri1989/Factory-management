const axios = require('axios')

const url = 'https://jsonplaceholder.typicode.com/users';

const getLoginData = () => {
    return axios.get(url);
};

module.exports = { getLoginData };