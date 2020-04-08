import * as NotesAPI from '../../util/note_api_util';

export const RECEIVE_NOTES = "RECEIVE_NOTES";
export const RECEIVE_NOTE = "RECEIVE_NOTE";
export const REMOVE_NOTE = "REMOVE_NOTE";
export const RECEIVE_NOTE_ERRORS = "RECEIVE_NOTE_ERRORS";

export const receiveNotes = (notes) => ({
    type: RECEIVE_NOTES,
    notes
});

export const receiveNote = (note) => ({
    type: RECEIVE_NOTE,
    note
});

export const removeNote = (noteId) => ({
    type: REMOVE_NOTE,
    noteId
});

export const receiveNoteErrors = (errors) => ({
    type: RECEIVE_NOTE_ERRORS,
    errors
});

export const fetchNotes = () => dispatch => (
    NotesAPI.fetchNotes().then( (notes) => dispatch(receiveNotes(notes)),
        errors => dispatch(receiveNoteErrors(errors.responseJSON)))
);

export const fetchNote = (noteId) => dispatch => (
    NotesAPI.fetchNote(noteId).then( (note) => dispatch(receiveNote(note)),
        errors => dispatch(receiveNoteErrors(errors.responseJSON)))
);

export const createNote = (note) => dispatch => (
    NotesAPI.createNote(note).then( (note) => dispatch(receiveNote(note)),
        errors => dispatch(receiveNoteErrors(errors.responseJSON)))
);

export const updateNote = (note) => dispatch => (
    NotesAPI.updateNote(note).then( (note) => dispatch(receiveNote(note)),
        errors => dispatch(receiveNoteErrors(errors.responseJSON)))
);

export const deleteNote = (noteId) => dispatch => (
    NotesAPI.deleteNote(noteId).then( (note) => dispatch(removeNote(note.id)),
        errors => dispatch(receiveNoteErrors(errors.responseJSON)))
);

