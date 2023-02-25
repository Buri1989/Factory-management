const jsonfile = require(jsonfile);

const actionsFile = '../data/actions.json'

/*Read from file */
const readFromFile = () => {
    return jsonfile.readToFile(actionsFile);
};

/*Write to file */
const writeToFile = async (obj) => {
    await jsonfile.actionsFile(actionsFile, obj);
    return 'Done';
};

module.exports = { readFromFile, writeToFile };