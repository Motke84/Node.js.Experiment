const yargs = require('yargs');


const addressOptions = {
    describe: 'address to get weather for',
    // demand: true,
    alias: 'address',
    default: '',
    string: true
};

const argv = yargs
    .options({
        a: addressOptions
    })
    .help()
    .alias('h', 'help')
    .argv;





module.exports = {
    argv
};
