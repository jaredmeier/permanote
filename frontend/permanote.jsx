import React from 'react';
import ReactDOM from 'react-dom';

import configureStore from './store/store';
import Root from './components/root';

// IMPORT TESTING FUNCTIONS
import { loginUser, createUser, logoutUser } from './actions/session_actions';

document.addEventListener('DOMContentLoaded', () => {
    const store = configureStore();

    // TESTING FUNCTIONS
    window.loginUser = loginUser;
    window.createUser = createUser;
    window.logoutUser = logoutUser;
    window.getState = store.getState;
    window.dispatch = store.dispatch;
    // END TESTING
    // debugger
    const root = document.getElementById('root');
    ReactDOM.render(<Root store={store} />, root);
});

