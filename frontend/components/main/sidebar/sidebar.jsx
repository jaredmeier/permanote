import React from 'react';
import { Link, Route } from 'react-router-dom';

import EditorContainer from '../editor/editor_container';

class Sidebar extends React.Component {
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

        const noteList = this.props.notes.map( note => {
            let date = note.updated_at.slice(0, 10);
            let body = note.body.slice(0, 70);
            return (
                <div className="sidebar-note-container" key={note.id}>
                    <Link to={`/notes/${note.id}`}>
                        <button className="sidebar-note">
                            <div className="sidebar-note-grid">
                                <h4>{note.title}</h4>
                                <p>{body}</p>
                                <div className="sidebar-note-date"><h5>{date}</h5></div>
                            </div>
                        </button>
                    </Link>
                </div>
            )
        });

        noteList.reverse(); // sort descending by updated

        return (
        <>
            <div className="sidebar-container">
                <div className="sidebar-header">
                    <h3 className="row-1 col-1">{this.props.header}</h3>
                    <h5 className="row-2 col-1">{noteList.length} notes</h5>
                </div> 
                <div className="sidebar-scroll">
                    {noteList}
                </div>
            </div>
            <Route exact path="/notes/" component={EditorContainer} />
            <Route path="/notes/:noteId" component={EditorContainer} />
        </>
        )
    }
};

export default Sidebar;

