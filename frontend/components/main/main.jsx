import React from 'react';
import { Route } from 'react-router-dom';

import NotesIndexContainer from './sidebar/notes_index_container';
import NavContainer from './nav/nav_container';
import NotebookIndex from './notebook_index';
import Modal from '../modal/modal';

export default () => (
    <div className="main-container">
        <Modal />
        <NavContainer />
        <Route exact path="/notebooks" component={NotebookIndex} />
        <Route exact path="/notes" component={NotesIndexContainer} />
        <Route path="/notes/:noteId" component={NotesIndexContainer} />
    </div>
);

//render EditorContainer for both paths so it has access to :noteId params if specified