import {RECEIVE_TAG_ERRORS, RECEIVE_NOTE_TAG_ERRORS} from '../actions/tags/tag_actions';

const tagErrorsReducer = (state = [], action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_TAG_ERRORS:
            return action.errors;
        case RECEIVE_NOTE_TAG_ERRORS:
            return action.errors;
        case RECEIVE_TAGS:
        case RECEIVE_TAG:
        case REMOVE_TAG:
            return [];
        default:
            return state;
    }
}

export default noteErrorsReducer;