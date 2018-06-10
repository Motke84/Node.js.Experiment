const request = require('request');
const argumentor = require('./weatherArgumentor');


var args = argumentor.argv;

request({
  url: 'https://maps.googleapis.com/maps/api/geocode/json?address=natan%2012%20ramat-gan&key=AIzaSyBj4wjXiR-ikJos173OXGnBQKzEsdzOxcU',
  json: true
}, (error, response, body) => {
  const first = body.results[0];

  console.log(first.formatted_address);
  const loc = first.geometry.location;
 console.log(loc.lat, loc.lng);
});
