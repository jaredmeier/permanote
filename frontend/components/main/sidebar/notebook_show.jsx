import React from 'react';
import { Link, Route } from 'react-router-dom';

import EditorContainer from '../editor/editor_container';
import NoteList from './note_list';

class NotebookShow extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.fetchNotebook(this.props.match.params.notebookId).then( (action) => {
            if (!this.props.match.params.noteId && action.notes.length) {
                this.props.history.push(`/notebooks/${this.props.match.params.notebookId}/${action.notes[0].id}`)
            }
        });
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.notebookId !== prevProps.match.params.notebookId) {
            this.props.fetchNotebook(this.props.match.params.notebookId).then((action) => {
                if (action.notes.length) {
                    this.props.history.push(`/notebooks/${this.props.match.params.notebookId}/${action.notes[0].id}`);
                }
            });
        }

        if (JSON.stringify(this.props.checkNotes) === JSON.stringify(prevProps.checkNotes)) return null; //meant to prevent fetching if the props haven't changed, but this never triggers a fetch when creating a new note
        if (this.props.match.params.noteId && !prevProps.match.params.noteId) {
            this.props.fetchNotebook(this.props.match.params.notebookId);
        } else if (this.props.match.params.noteId !== prevProps.match.params.noteId) {
            this.props.fetchNotebook(this.props.match.params.notebookId);
        } else {
            this.props.fetchNotebook(this.props.match.params.notebookId).then((action) => {
                if (action.notes.length) {
                    this.props.history.push(`/notebooks/${this.props.match.params.notebookId}/${action.notes[0].id}`);
                }
            });
        }
        //may be empty notebook with empty list of notes
        //noteId param may change from selecting a different note in list or creating a new note
        //if creating a new note, need to fetch, otherwise do not
        //noteid may disappear (ie go to /notebooks) if deleting a note
    }

    removeTagFilter(tagId) {
        this.props.removeTagFilter(tagId);
    }


    render() {
        const { notes, notebook } = this.props;
        if (!notebook) return (
            <div>Loading</div>
        )
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
        return (
            <>
                <div className={`sidebar-container ${editorExpand ? "collapse" : ""}`}>
                    <div className="sidebar-header">
                        <h3 className="row-1">{notebook.name}</h3>
                        <h5 className="row-2 col-1">{notes.length} notes</h5>
                    </div>
                    <div className={`sidebar-tag-filters ${tagFilter ? "" : "hidden"}`}>
                        <ul>
                            {tagFilterItem}
                        </ul>
                    </div>
                    <div className={`sidebar-scroll ${tagFilter ? "shifted" : ""}`}>
                        <NoteList notes={notes} view="notebook" notebook={notebook} selectedNote={selectedNote}/>
                    </div>
                </div>
                <Route path={["/notebooks/:notebookId/:noteId"]} component={EditorContainer} />
            </>
        )
    }
};

export default NotebookShow;