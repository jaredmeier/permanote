import { RECEIVE_NOTES, RECEIVE_NOTE, REMOVE_NOTE, RECEIVE_NOTE_ERRORS } from '../actions/notes/notes_actions';

const noteErrorsReducer = (state = [], action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_NOTE_ERRORS:
            return action.errors;
        case RECEIVE_NOTES:
        case RECEIVE_NOTE:
        case REMOVE_NOTE:
            return [];
        default:
            return state;
    }
}

export default noteErrorsReducer;