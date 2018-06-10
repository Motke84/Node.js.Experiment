const yargs = require('yargs');


const addressOptions = {
    describe: 'address to get weather for',
    demand: true,
    alias: 'address',
    string: true
};


const argv = yargs
    .options('add', 'Add a new note', {
        a: addressOptions
    })
    .help()
    .alias('help','h')
    .argv;





module.exports = {
    argv
};
