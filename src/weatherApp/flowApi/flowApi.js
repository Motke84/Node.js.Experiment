const axios = require('axios');
const net = require('net');
var fs = require('fs');


const getFlow = () => {

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const data = fs.readFileSync('./src/weatherApp/flow.json');
            const obj = JSON.parse(data);
            resolve(obj);
        }, 300);
    });
};

const saveFlow = (flowItems) => {

    return new Promise((resolve, reject) => {
        setTimeout(() => {

            fs.writeFileSync('./src/weatherApp/flow.json', JSON.stringify(flowItems));
            resolve(true);
        }, 300);
    });
};

module.exports = {
    getFlow,
    saveFlow
}
