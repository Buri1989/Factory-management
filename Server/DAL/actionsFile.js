const jsonfile = require(jsonfile);
const path = require('path')
const actionFile = path.join(__dirname, '..', '/Factory-management/Factory-management/Server/data/actions.json')


/*Read from file */
const readFromFile = async () => {
    return await jsonfile.readToFile(actionFile)

};

/*Write to file */
const writeToFile = (obj) => {
    readFromFile().then((data) => {
        data.actions.push(data);
        jsonfile.writeToFile(actionFile, data, (err) => {
            if (err) {
                console.log(err);
            }
        });
    }).catch((err) => {
        console.log(err.message)
    })
}


module.exports = { readFromFile, writeToFile };