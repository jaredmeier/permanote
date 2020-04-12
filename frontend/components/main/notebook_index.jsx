import React from 'react';
import { connect } from 'react-redux';
import { getAllNotebooks, getNotebookNotes } from '../../reducers/selectors';
import { fetchNotes } from '../../actions/notes/notes_actions';
import { fetchNotebooks } from '../../actions/notebooks/notebook_actions';

class NotebookIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notebookExpand: {}
        }
    }

    componentDidMount () {
        this.props.fetchNotes().then( () => this.props.fetchNotebooks() );
    }

    getNotes(notebook) {
        if (!notebook.note_ids.length) return null;
        const { notes } = this.props;
        return (
            notes[notebook.id].map(note => (
            <li key={note.id}>
                {note.title}
            </li>
        )));
    }

    toggleDropdown(notebookId) {
        this.state.notebookExpand[notebookId] === "hidden" ?
            this.setState({ notebookExpand: Object.assign({}, this.state.notebookExpand, { [notebookId]: "" } )})  :
            this.setState({ notebookExpand: Object.assign({}, this.state.notebookExpand, { [notebookId]: "hidden" }) })
    };

    render () {
        const { notebooks } = this.props;
        const notebookList = notebooks.map(notebook => {
            const notesList = this.getNotes(notebook);
            return (
            <li key={notebook.id}>
                <button onClick={() => this.toggleDropdown(notebook.id)}>
                    <i className="fas fa-caret-right nav-icon"></i>
                </button> 
                {notebook.name}
                <ul className={`notebook-index-note-list 
                ${this.state.notebookExpand[notebook.id]}`}>
                    {notesList}
                </ul>
            </li>
            )
        })

        return (
            <div className="notebook-index-container">
                <div className="notebook-index-header"><h3>Notebooks</h3></div>
                <div className="notebook-index-header-2"><h4>My notebook list</h4></div>
                <div className="notebook-index-col-header col-title"><h5>TITLE</h5></div>
                <div className="notebook-index-col-header col-author"><h5>CREATED BY</h5></div>
                <div className="notebook-index-col-header col-updated"><h5>UPDATED</h5></div>
                <div className="notebook-index-col-header col-actions"><h5>ACTIONS</h5></div>

                <ul className="notebook-index-notebooks-list">{notebookList}</ul>
            </div>
        )
    }
};

const mapStateToProps = state => {
    const notebooks = getAllNotebooks(state);
    const notes = {};
    notebooks.forEach(notebook => {
        notes[notebook.id] = getNotebookNotes(state, notebook.id);
    });

    return {
    notebooks: notebooks,
    notes: notes
    }
};

const mapDispatchToProps = dispatch => ({
    fetchNotes: () => dispatch(fetchNotes()),
    fetchNotebooks: () => dispatch(fetchNotebooks())
});

export default connect(mapStateToProps, mapDispatchToProps)(NotebookIndex);