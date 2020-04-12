import { RECEIVE_NOTEBOOKS, RECEIVE_NOTEBOOK, REMOVE_NOTEBOOK } from '../actions/notebooks/notebook_actions';

const notebooksReducer = (state = {}, action) => {
    Object.freeze(state);
    let newState = Object.assign({}, state);

    switch (action.type) {
        case RECEIVE_NOTEBOOKS:
            Object.values(action.notebooks).forEach(notebook => {
                newState[notebook.id] = notebook
            });
            return newState;
        case RECEIVE_NOTEBOOK:
            return Object.assign({}, state, { [action.notebook.id]: action.notebook });
        case REMOVE_NOTEBOOK:
            delete newState[action.noteId];
            return newState;
        default:
            return state;
    }
}

export default notebooksReducer;