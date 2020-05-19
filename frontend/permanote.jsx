import React from 'react';
import ReactDOM from 'react-dom';

import configureStore from './store/store';
import Root from './components/root';

import 'react-quill/dist/quill.snow.css';

// IMPORT TESTING FUNCTIONS
// import { loginUser, createUser, logoutUser } from './actions/session_actions';
// import { fetchNotes, fetchNote, createNote, updateNote, deleteNote } from './actions/notes/notes_actions';
// import { getAllNotes } from './reducers/selectors';
// import { fetchNotebooks, fetchNotebook, createNotebook, updateNotebook, deleteNotebook } from './util/notebook_api_util';
// import { createNoteTag } from './actions/tags/tag_actions';

document.addEventListener('DOMContentLoaded', () => {
    let store;
    if (window.currentUser) {
        const preloadedState = { //if there's a currentUser set by backend, pass to store via preloadedState
            entities: {
                users: { [window.currentUser.id]: window.currentUser }
            },
            session: { id: window.currentUser.id }
        };
        store = configureStore(preloadedState);
        delete window.currentUser;
    } else { //if there isn't a currentUser, create store normally
        store = configureStore();
    }

    // TESTING FUNCTIONS
    // window.getState = store.getState;
    // window.dispatch = store.dispatch;
    // window.createNoteTag = createNoteTag;
    // END TESTING

    const root = document.getElementById('root');
    ReactDOM.render(<Root store={store} />, root);
});

