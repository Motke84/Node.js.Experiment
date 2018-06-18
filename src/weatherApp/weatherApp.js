const request = require('request');
const argumentor = require('./weatherArgumentor');


var args = argumentor.argv;

const address = encodeURIComponent(args.address)

request({
  url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyBj4wjXiR-ikJos173OXGnBQKzEsdzOxcU`,
  json: true
}, (error, response, body) => {

  if (error) {
    console.log("Unable to connect to Google Services")
  }
  else {
    switch (body.status) {
      case 'ZERO_RESULTS':
        console.log("address not right:", args.address);
        break;
      case 'OK':
        const first = body.results[0];
        console.log(first.formatted_address);
        const loc = first.geometry.location;
        console.log(loc.lat, loc.lng);
        break;
    }
  }
});
