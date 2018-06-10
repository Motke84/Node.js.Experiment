console.log('Starting notes.js');

const fs = require('fs');

var fetchNotes = () => {
  try {
    var notesString = fs.readFileSync('notes-data.json');
    return JSON.parse(notesString);
  } catch (e) {
    return [];
  }
};

var saveNotes = (notes) => {
  fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

var findNoteIndex = (notes, title) => {
  return notes.findIndex((note) => note.title === title);
}

var addNote = (title, body) => {
  console.log('Adding note', title, body);
  var notes = fetchNotes();
  var note = {
    title,
    body
  };

  var index = findNoteIndex(notes, title);

  if (index < 0) {
    notes.push(note);
    saveNotes(notes);
    return note;
  }
};


var updateNote = (title, body) => {
  console.log('Updating note', title, body);
  var notes = fetchNotes();
  var note = {
    title,
    body
  };

  var index = findNoteIndex(notes, title);

  if (index > 0) {
    notes[index].body = body;
    saveNotes(notes);
    return note;
  }
};



var getAll = () => {
  console.log('Getting all notes');

  var notes = fetchNotes();

  return notes;
};

var getNote = (title) => {
  console.log('Getting note', title);
  var notes = fetchNotes();
  var note = {
    title
  };

  var index = findNoteIndex(notes, title);

  return index > 0 ? notes[index] : undefined;
};

var removeNote = (title) => {
  console.log('Removing note', title);

  var notes = fetchNotes();
  var note = {
    title
  };

  var index = findNoteIndex(notes, title);

  if (index > 0) {
    notes.splice(index);
    saveNotes(notes);
  }

};



module.exports = {
  addNote,
  getAll,
  getNote,
  removeNote,
  updateNote
};
