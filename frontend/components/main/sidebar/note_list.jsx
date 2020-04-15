import React from 'react';
import { Link } from 'react-router-dom';
import { getDateRelative } from '../../../util/date_parse_util';

class NoteList extends React.Component {
    constructor(props) {
        super(props);
    }

    render () {
        if (!this.props.notes.length) return null;
        const { notes, view, notebook } = this.props;
        notes.sort(function (a, b) {
            return new Date(b.updated_at) - new Date(a.updated_at);
        });

        let noteUrl = "";
        if (view === "notebook") {
            noteUrl = `/notebooks/${notebook.id}/`;
        } else {
            noteUrl = "/notes/";
        }

        const noteList = notes.map(note => {
            if (!note) return null;
            let date = getDateRelative(note.updated_at);
            let body = note.body.slice(0, 100).replace(/<[^>]*>?/gm, '');
            return (
                <div className="sidebar-note-container" key={note.id}>
                    <Link to={`${noteUrl}${note.id}`}>
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

        return noteList;
    }
}

export default NoteList;