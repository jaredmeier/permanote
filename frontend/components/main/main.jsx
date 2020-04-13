import React from 'react';
import { Route, Switch } from 'react-router-dom';

import NotesIndexContainer from './sidebar/notes_index_container';
import NavContainer from './nav/nav_container';
import NotebookIndex from './notebook_index';
import NotebookShowContainer from './sidebar/notebook_show_container';
import Modal from '../modal/modal';

export default () => (
    <div className="main-container">
        <Modal />
        <Switch>
            <Route path="/notebooks/:notebookId?" component={NavContainer} />
            <Route component={NavContainer} />
        </Switch> 
        <Route exact path="/notebooks" component={NotebookIndex} />
        <Route path="/notebooks/:notebookId/:noteId?" component={NotebookShowContainer} />
        <Route exact path="/notes" component={NotesIndexContainer} />
        <Route path={["/notes/:noteId"]} component={NotesIndexContainer} />
    </div>
);

//render EditorContainer for both paths so it has access to :noteId params if specified