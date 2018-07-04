require('dotenv').config();
const weatherApi = require('../weatherApi/weatherApi');


it('should return object with weather and address', () => {
    var res = weatherApi.getWeather("Natan 12 Ramat-Gan").payload
    .then(data => {
        if (!data.address || !data.weather) {
            throw new Error(`Expected full object , but got ${data}.`)
          }
    });  
  });

  it('should return object with error', () => {
    var res = weatherApi.getWeather("Martian 1112 Mars").payload
    .then(data => {
        if (!data.error) {
            throw new Error(`Expected object with error, but got ${error}.`)
          }
    });  
  });