require('dotenv').config();
const expect = require('expect');
const weatherApi = require('../weatherApi/weatherApi');


describe('weatherApi-tests', () => {

  it('should return object with weather and address', (done) => {
    var res = weatherApi.getWeather("Natan 12 Ramat-Gan").payload
      .then(data => {

        expect(data).toHaveProperty('address');
        expect(data).toHaveProperty('ip');
        expect(data).toHaveProperty('feelsLike');
        expect(data).toHaveProperty('temperature');
        done();
      }).catch(e => {

        done();
      });
  }).timeout(3000);

  it('should return object with error', (done) => {

    var res = weatherApi.getWeather("Martian 1112 Mars").payload
      .then(data => {

        done();
      }).catch(e => {

        expect(e.message)
          .toEqual(expect.stringContaining(weatherApi.error_messages.ZERO_RESULTS));

        done();
      });
  }).timeout(3000);

});
