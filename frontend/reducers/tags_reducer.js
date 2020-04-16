import { RECEIVE_TAGS, RECEIVE_TAG, REMOVE_TAG, 
        RECEIVE_NOTE_TAG, REMOVE_NOTE_TAG } from '../actions/tags/tag_actions';


const tagsReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState = Object.assign({}, state);
    const { noteId, tagId } = action;
    const tag = state[tagId];
    switch (action.type) {
        case RECEIVE_TAGS:
            Object.values(action.tags).forEach(tag => {
                newState[tag.id] = tag
            });
            return newState;
        case RECEIVE_TAG:
            return Object.assign({}, state, { [action.tag.id]: action.tag });
        case REMOVE_TAG:
            delete newState[action.tagId];
            return newState;
        case RECEIVE_NOTE_TAG:
            return Object.assign({}, state,
                { [tagId]: Object.assign({}, tag, { note_ids: tag.note_ids.concat(noteId) }) }
            )
        case REMOVE_NOTE_TAG:
            const noteIndex = tag.note_ids.indexOf(noteId);
            newState[tagId].note_ids.splice(noteIndex, 1);
            return newState;
        default:
            return state;
    }
}

export default tagsReducer;