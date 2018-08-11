require('dotenv').config()
const request = require('supertest');
const expect = require('expect');
const weatherApi = require('../weatherApi/weatherApi');
const app = require('../server').app;

//https://jestjs.io/docs/en/23.2/expect#tobedefined

describe('server-test', () => {

  describe('#common', () => {
    it('should return Page not found response', (done) => {
      request(app)
        .get('/PageNotFound')
        .expect(404)
        .expect((res) => {
          expect(res.body).toHaveProperty(
            'error', 'Page not found.');
        })
        .end(done);
    });
  });

  describe('#weather-api', () => {
    it('should return address not found response', (done) => {
      request(app)
        .get('/getWeather?address=Martian 1112 Mars')
        .expect(200)
        .expect((res) => {
          expect(res.body).toHaveProperty(['result', 'error']);
          
          expect(res.body.result.error)
          .toEqual(expect.stringContaining(weatherApi.error_messages.ZERO_RESULTS));

        })
        .end(done);
    }).timeout(3000);

    it('should return address found response', (done) => {
      const addressToCheck = 'Natan St 12, Ramat Gan';

      request(app)
        .get(`/getWeather?address=${addressToCheck}`)
        .expect(200)
        .expect((res) => {
          
          expect(res.body).toHaveProperty(['result', 'address']);
          expect(res.body.result.address)
            .toEqual(expect.stringContaining(addressToCheck));

          expect(res.body).toHaveProperty(['result', 'weather']);

        

        })
        .end(done);
    }).timeout(3000);

  });

});

