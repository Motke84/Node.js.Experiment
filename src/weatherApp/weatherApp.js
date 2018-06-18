
const argumentor = require('./weatherArgumentor');
const goeocode = require('./goeocode/goeocode');

var args = argumentor.argv;

goeocode.goeocodeAddress(args.address, (error, results) => {
  if (error)
    console.log(error);
  if (results)
    console.log(JSON.stringify(results, undefined, 2));
});
