console.log('Starting app.js');

const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes.js');

const argv = yargs.argv;
var command = argv._[0];
console.log('Command: ', command);
console.log('Yargs', argv);


switch (command) {
  case 'add':
    {
      const note = notes.addNote(argv.title, argv.body);
      console.log(note ? `Added note ${JSON.stringify(note)}` : `Note already exists ${argv.title}`);
      break;
    }
  case 'list':
    {
      const allNotes = notes.getAll();
      console.log('All notes', allNotes);
      break;
    }
  case 'read':
    {
      const note = notes.getNote(argv.title);
      console.log(note ? `Got note ${JSON.stringify(note)}` : `Note not found ${argv.title}`);
      break;
    }
  case 'remove':
    {
      notes.removeNote(argv.title);
      console.log('Note removed', argv.title);
      break;
    }
  case 'update':
    {
      const note = notes.updateNote(argv.title, argv.body);
      console.log('Note updated', note);
      break;
    }
  default:
    {
      console.log('Command not recognized');
    }

}

