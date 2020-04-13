import React from 'react';
import { Link, Route } from 'react-router-dom';

import EditorContainer from '../editor/editor_container';
import NoteList from './note_list';

class NotesIndex extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (!this.props.match.params.noteId || !this.props.notes.length ) {
            this.props.fetchNotes().then((action) =>
                this.props.history.push(`/notes/${action.notes[0].id}`)
            );
        }
    }

    compnentDidUpdate(prevProps) {
        if (this.props.match.params.noteId != prevProps.match.params.noteId) {
            this.props.fetchNotes().then((action) =>
                this.props.history.push(`/notes/${action.notes[0].id}`)
            );
        }
    }

    render () {
        if (!this.props.notes) return null;

        return (
        <>
            <div className="sidebar-container">
                <div className="sidebar-header">
                    <h3 className="row-1 col-1">{this.props.header}</h3>
                    <h5 className="row-2 col-1">{this.props.notes.length} notes</h5>
                </div> 
                <div className="sidebar-scroll">
                    <NoteList notes={this.props.notes} />
                </div>
            </div>
            <Route exact path="/notes/" component={EditorContainer} />
            <Route path={["/notes/:noteId"]} component={EditorContainer} />
        </>
        )
    }
};

export default NotesIndex;
