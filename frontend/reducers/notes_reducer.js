import { RECEIVE_NOTES, RECEIVE_NOTE, REMOVE_NOTE } from '../actions/notes/notes_actions';
import { RECEIVE_NOTEBOOK } from '../actions/notebooks/notebook_actions';
import { RECEIVE_NOTE_TAG, REMOVE_NOTE_TAG } from '../actions/tags/tag_actions';

const notesReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState = Object.assign({}, state);
    const { noteId, tagId } = action;
    const note = state[noteId];
    switch (action.type) {
        case RECEIVE_NOTES:
        case RECEIVE_NOTEBOOK:
            Object.values(action.notes).forEach( note => {
                newState[note.id] = note
            });
            return newState;
        case RECEIVE_NOTE:
            return Object.assign({}, state, { [action.note.id]: action.note });
        case REMOVE_NOTE:
            delete newState[action.noteId];
            return newState;
        case RECEIVE_NOTE_TAG:
            return Object.assign({}, state, 
                { [noteId]: Object.assign({}, note, {tag_ids: note.tag_ids.concat(tagId) }) }
            )
        case REMOVE_NOTE_TAG:
            const tagIndex = note.tag_ids.indexOf(tagId);
            newState[noteId].tag_ids.splice(tagIndex, 1);
            return newState;
        default:
            return state;
    }
}

export default notesReducer;