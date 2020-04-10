import { RECEIVE_NOTES, RECEIVE_NOTE, REMOVE_NOTE } from '../actions/notes/notes_actions';

const notesReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState = Object.assign({}, state);

    switch (action.type) {
        case RECEIVE_NOTES:
            Object.values(action.notes).forEach( note => {
                newState[note.id] = note
            });
            return newState;
        case RECEIVE_NOTE:
            return Object.assign({}, state, { [action.note.id]: action.note });
        case REMOVE_NOTE:
            delete newState[action.noteId];
            return newState;
        default:
            return state;
    }
}

export default notesReducer;