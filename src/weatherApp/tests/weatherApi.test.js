require('dotenv').config();
const expect = require('expect');
const weatherApi = require('../weatherApi/weatherApi');


describe('weatherApi-tests', () => {

  it('should return object with weather and address', (done) => {
    var res = weatherApi.getWeather("Natan 12 Ramat-Gan").payload
      .then(data => {

        expect(data).toHaveProperty('address');
        expect(data).toHaveProperty('weather');

        done();
      });
  });

  it('should return object with error', (done) => {

    var res = weatherApi.getWeather("Martian 1112 Mars").payload
      .then(data => {
        expect(data).toHaveProperty('error', {
          error_message: weatherApi.error_messages.ZERO_RESULTS
        });

        done();
      })
  }).timeout(3000);

});
