const yargs = require('yargs');


const titleOptions = {
    describe: 'Title of note',
    demand: true,
    alias: 't'
};
const bodyOptions = {
    describe: 'Body of note',
    demand: true,
    alias: 'b'
};


const argv = yargs
    .command('add', 'Add a new note', {
        title: titleOptions,
        body: bodyOptions
    })
    .command('list', 'List all notes')
    .command('read', 'Read a note', {
        title: titleOptions,
    })
    .command('remove', 'Remove a note', {
        title: titleOptions
    })
    .command('update', 'Update a note', {
        title: titleOptions,
        body: bodyOptions
    })
    .help()
    .argv;

const command = argv._[0];



module.exports = {
    argv,
    command
};
