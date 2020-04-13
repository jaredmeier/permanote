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
            debugger
            if (!this.match.params.noteId)
            this.props.history.push(`/notebooks/${this.props.match.params.notebookId}/${action.notes[0].id}`)
        });
    }

    // compnentDidUpdate(prevProps) {
        
    // }

    render() {
        const { notes, notebook } = this.props;
        if (!notes) return (
            <div>Didn't render</div>
        );
        return (
            <>
                <div className="sidebar-container">
                    <div className="sidebar-header">
                        <h3 className="row-1">{notebook.name}</h3>
                        <h5 className="row-2 col-1">{this.props.notes.length} notes</h5>
                    </div>
                    <div className="sidebar-scroll">
                        <NoteList notes={this.props.notes} view="notebook" notebook={notebook}/>
                    </div>
                </div>
                <Route path={["/notebooks/:notebookId/:noteId"]} component={EditorContainer} />
            </>
        )
    }
};

export default NotebookShow;