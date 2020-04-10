import React from 'react';
import { Link } from 'react-router-dom';

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchNotes();
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

        return (
            <div className="sidebar-container">
                <div className="sidebar-header">
                    <h3 className="row-1 col-1">{this.props.header}</h3>
                    <h5 className="row-2 col-1">{noteList.length} notes</h5>
                </div> 
                <div className="sidebar-scroll">
                    {noteList}
                </div>
            </div>
        )
    }
};

export default Sidebar;

