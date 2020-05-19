import { RECEIVE_SEARCH, CLEAR_SEARCH } from '../actions/search_actions';

const searchReducer = (state = null, action) => {
    Object.freeze(state);
    switch (action.type) {
        case RECEIVE_SEARCH:
            return action.search;
        case CLEAR_SEARCH:
            return null;
        default:
            return state;
    }
}

export default searchReducer;