import { RECEIVE_TAG_FILTER, REMOVE_TAG_FILTER } from '../actions/tags/tag_filter_actions';

const tagFiltersReducer = (state = null, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_TAG_FILTER:
            return action.tagId;
        case REMOVE_TAG_FILTER:
            return null;
        default:
            return state;
    }
}

export default tagFiltersReducer;