require('dotenv').config();
const expect = require('expect');
const weatherApi = require('../weatherApi/weatherApi');


it('should return object with weather and address', (done) => {
  var res = weatherApi.getWeather("Natan 12 Ramat-Gan").payload
    .then(data => {
      if (!data.address || !data.weather) {
        throw new Error(`Expected full object , but got ${data}.`)
      }
      done();
    });
});

it('should return object with error', (done) => {

  var res = weatherApi.getWeather("Martian 1112 Mars").payload
    .then(data => {

      const json = JSON.stringify(data);
      console.log('Data:',json);
      
      expect(data)
        .toEqual({
          error: {
            error_message: weatherApi.error_messages.ZERO_RESULTS
          }
        });

      done();
    })
});
