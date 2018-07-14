require('dotenv').config()
const request = require('supertest');
const expect = require('expect');
const weatherApi = require('../weatherApi/weatherApi');
const app = require('../server').app;

it('server.test - should return Page not found response', (done) => {
  request(app)
    .get('/PageNotFound')
    .expect(404)
    .expect((res) => {
      expect(res.body).toHaveProperty(
        'error', 'Page not found.');
    })
    .end(done);
});


it('server.test - should return address not found response', (done) => {

  request(app)
    .get('/getWeather?address=Martian 1112 Mars')
    .expect(200)
    .expect((res) => {
      expect(res.body).toHaveProperty('result', {
        error: {
          error_message: weatherApi.error_messages.ZERO_RESULTS
        }
      });
    })
    .end(done);
}).timeout(3000);

