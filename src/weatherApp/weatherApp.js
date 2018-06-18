
const argumentor = require('./weatherArgumentor');
const goeocode = require('./goeocode/goeocode');
const forecast = require('./forecast/forecast');

var args = argumentor.argv;

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
});


