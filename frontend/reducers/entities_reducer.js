import { combineReducers } from 'redux';

import usersReducer from './users_reducer';
import notesReducer from './notes_reducer';

const entitiesReducer = combineReducers({
    users: usersReducer,
    notes: notesReducer
});

export default entitiesReducer;