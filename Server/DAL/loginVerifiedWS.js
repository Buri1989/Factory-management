const axios = require('axios')



const getLoginData = () => {
    return axios.get('https://jsonplaceholder.typicode.com/users');
};

const getLoginDataById = (id) => {
    return axios.get('https://jsonplaceholder.typicode.com/users/' + id)
}

module.exports = { getLoginData, getLoginDataById };