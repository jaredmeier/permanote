import { RECEIVE_NOTES } from '../actions/notes/notes_actions';

const uiReducer = (state = {}, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_NOTES:
            // debugger
            return Object.assign({}, { default_note: action.notes[0].id })
        default:
            return state;
    }
}

export default uiReducer;