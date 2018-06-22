require('dotenv').config()
const argumentor = require('./weatherArgumentor');
const goeocode = require('./goeocode/goeocode');
const forecast = require('./forecast/forecast');
const weatherApi = require('./weatherApi/weatherApi');



var args = argumentor.argv;

if (args && args.address)
  weatherApi.getWeather(args.address);
else
  weatherApi.getWethersByIp();


/*
goeocode.goeocodeAddress(args.address, (error, results) => {
  if (error)
    console.log(error);
  if (results) { 
    forecast.forecastByCoordinates(results, (weatherError, weatherResult) => {
      if (weatherError)
        console.log(weatherError);
      if (weatherResult)
        console.log(JSON.stringify(weatherResult, undefined, 2));
    });
  }
});*/

/*
goeocode.goeocodeAddressAync(args.address).
  then((results) => {
    forecast.forecastByCoordinatesAsync(results).then((results) => {
      console.log(JSON.stringify(results, undefined, 2));
    }).catch((errorMessage) => {
      console.log(errorMessage);
    });
  }).catch((errorMessage) => {
    console.log(errorMessage);
  })
*/



