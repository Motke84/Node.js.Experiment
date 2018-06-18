console.log('Starting app.js');

const fs = require('fs');
const _ = require('lodash');

const argumentor = require('./argumentor.js');
const notes = require('./notes.js');




const argv = argumentor.argv;
const command = argumentor.command;



//console.log('Command: ', command);
//console.log('Yargs', argv);

//debugger;

switch (command) {
  case 'add':
    {
      const note = notes.addNote(argv.title, argv.body);
      const msg = note ? `Adding new note ${notes.logNote(note)}` : `already exist ${argv.title}`;
      console.log(msg);
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
      const msg = note ? `Got note ${notes.logNote(note)}` : `Note not found ${argv.title}`;
      console.log(msg);
      break;
    }
  case 'remove':
    {
      const result = notes.removeNote(argv.title);
      console.log(result ? 'Note removed' : 'Note was not removed');
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

