import React from 'react';
import { Link, Route } from 'react-router-dom';

import EditorContainer from '../editor/editor_container';
import NoteList from './note_list';

class NotesIndex extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        if (this.props.search && !this.props.notes.length) {
            return;
        } else if (!this.props.search && (!this.props.match.params.noteId || !this.props.notes.length)) {
            this.props.fetchNotes().then((action) =>
                this.props.history.push(`/notes/${action.notes[0].id}`)
            );
        } else if (this.props.notes.length && !this.props.match.params.noteId) {
            this.props.history.push(`/notes/${this.props.notes[0].id}`);
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.search && !this.props.search) {
            this.props.history.push(`/notes/${this.props.notes[0].id}`);
        }
    }

    removeTagFilter(tagId) {
        this.props.removeTagFilter(tagId);
    }
    
    render () {
        if (!this.props.notes) return null;
        const selectedNote = this.props.match.params.noteId;

        let tagFilterItem = (<div></div>);
        const tagFilter = this.props.tagFilter;
        if (tagFilter) tagFilterItem = (
            <li className="tag-filter-button" key={tagFilter.id}>
                <div><i className={`fas fa-tag nav-icon`}></i></div>
                <div>{tagFilter.name}</div>
                <div>
                    <button className="tag-filter-close-button"
                        onClick={() => this.removeTagFilter(tagFilter.id)}>
                        <i className="fas fa-times"></i>
                    </button>
                </div>
            </li>
            )

        const { editorExpand } = this.props;

        let header;
        if (!this.props.search) {
            header = (
                <h3 className="row-1">{this.props.header}</h3>
            )
        } else {
            header = (
                <h3 className="row-1">
                    <i className="fas fa-search"></i>
                    {this.props.header}
                </h3>
            )
        }
        const noteCount = this.props.notes.length;
        const noteCountText = noteCount ? `${noteCount} notes` : `No notes found`

        return (
        <>
            <div className={`sidebar-container ${editorExpand ? "collapse" : ""}`}>
                <div className="sidebar-header">
                    {header}
                    <h5 className="row-2 col-1">{noteCountText}</h5>  
                </div> 
                <div className={`sidebar-tag-filters ${tagFilter ? "" : "hidden"}`}>
                    <ul>
                        {tagFilterItem}
                    </ul>
                </div>
                <div className={`sidebar-scroll ${tagFilter ? "shifted" : "" }`}>                
                    <NoteList notes={this.props.notes} selectedNote={selectedNote} />
                </div>
            </div>
            <Route path={["/notes/:noteId"]} component={EditorContainer} />
        </>
        )
    }
};

export default NotesIndex;
