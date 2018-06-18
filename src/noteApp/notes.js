//console.log('Starting notes.js');

const fs = require('fs');

const fetchNotes = () => {
  try {
    const notesString = fs.readFileSync('notes-data.json');
    return JSON.parse(notesString);
  } catch (e) {
    return [];
  }
};

const saveNotes = (notes) => {
  fs.writeFileSync('notes-data.json', JSON.stringify(notes));
};

const findNoteIndex = (notes, title) => {
  return notes.findIndex((note) => note.title === title);
}

const addNote = (title, body) => {
  console.log('Adding note', title, body);
  const notes = fetchNotes();
  const note = {
    title,
    body
  };

  const index = findNoteIndex(notes, title);

  if (index < 0) {
    notes.push(note);
    saveNotes(notes);
    return note;
  }
};


const updateNote = (title, body) => {
  console.log('Updating note', title, body);
  const notes = fetchNotes();

  const index = findNoteIndex(notes, title);

  if (index > 0) {
    notes[index].body = body;
    saveNotes(notes);
    return notes[index];
  }
};


const getAll = () => {
  console.log('Getting all notes');

  const notes = fetchNotes();

  return notes;
};

const getNote = (title) => {
  console.log('Getting note', title);
  const notes = fetchNotes();
  const note = {
    title
  };

  const index = findNoteIndex(notes, title);

  return index > 0 ? notes[index] : undefined;
};

const removeNote = (title) => {
  console.log('Removing note', title);

  const notes = fetchNotes();

  const index = findNoteIndex(notes, title);

  if (index > 0) {
    notes.splice(index);
    saveNotes(notes);
  }

  return index > 0;


  //var filteredNotes= notes.filter((note) => note.title === title);
  //saveNotes(filteredNotes);
  //return filteredNotes.length !== notes.length;
};

const logNote = note => JSON.stringify(note);


module.exports = {
  addNote,
  getAll,
  getNote,
  removeNote,
  updateNote,
  logNote
};
