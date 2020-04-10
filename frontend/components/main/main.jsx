import React from 'react';
import { Route } from 'react-router-dom';

import NotesIndexContainer from './sidebar/notes_index_container';
import EditorContainer from './editor/editor_container';
import NavContainer from './nav/nav_container';

export default () => (
    <div className="main-container">
        <NavContainer />
        <Route path="/notes" component={NotesIndexContainer} />
        <Route exact path="/notes/" component={EditorContainer} />
        <Route path="/notes/:noteId" component={EditorContainer} />
    </div>
);

//render EditorContainer for both paths so it has access to :noteId params if specified