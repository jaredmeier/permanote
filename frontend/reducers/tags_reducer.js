import { RECEIVE_TAGS, RECEIVE_TAG, REMOVE_TAG } from '../actions/tags/tag_actions';

const tagsReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState = Object.assign({}, state);

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
        default:
            return state;
    }
}

export default tagsReducer;