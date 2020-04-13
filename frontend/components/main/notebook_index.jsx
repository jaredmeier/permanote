import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllNotebooks, getNotebookNotes } from '../../reducers/selectors';
import { fetchNotes } from '../../actions/notes/notes_actions';
import { fetchNotebooks } from '../../actions/notebooks/notebook_actions';
import { getDate, getDateRelative } from '../../util/date_parse_util';

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
        const { notes } = this.props;
        if (!notebook.note_ids.length || !notes) return null;
        debugger
        return (
            notes[notebook.id].map(note => {
                const date = getDateRelative(note.updated_at);
                return (
                    <li key={note.id}>
                        <div>
                            <Link to={`/notebooks/${notebook.id}/${note.id}`}>
                                <i className="fas fa-sticky-note nav-icon"></i>
                                {note.title}
                            </Link>
                        </div>
                        <div></div>
                        <div>{date}</div>
                        <div>Actions</div>
                    </li>
                )
        }));
    }

    toggleDropdown(notebookId) {
        this.state.notebookExpand[notebookId] === true ?
            this.setState({ notebookExpand: Object.assign({}, this.state.notebookExpand, { [notebookId]: false } )})  :
            this.setState({ notebookExpand: Object.assign({}, this.state.notebookExpand, { [notebookId]: true }) })
    };

    render () {
        const { notebooks } = this.props;
        const notebookList = notebooks.map(notebook => {
            const notesList = this.getNotes(notebook);
            const notebookExpand = this.state.notebookExpand[notebook.id];
            const date = getDateRelative(notebook.updated_at);
            return (
            <li key={notebook.id}>
                <div className="notebook-item-text">
                    <div>
                        <button onClick={() => this.toggleDropdown(notebook.id)}>
                            <i className={`fas fa-caret-right nav-icon 
                            ${notebookExpand ? "open" : ""}`}></i>
                        </button> 
                            <Link to={`/notebooks/${notebook.id}`}>{notebook.name}</Link>
                    </div>
                    <div></div>
                    <div>{date}</div>
                    <div>Actions</div>
                </div>
                <ul className={`notebook-index-note-list 
                ${notebookExpand ? "" : "hidden"}`}>
                    <div className="notebook-index-notes-list-container">
                        {notesList}
                    </div>
                </ul>
            </li>
            )
        });
        // debugger
        return (
            <div className="notebook-index-container">
                <div className="notebook-index-header"><h3>Notebooks</h3></div>
                <div className="notebook-index-header-2"><h4>My notebook list</h4></div>
                <div className="notebook-index-header-2 new-notebook">
                    <Link to="/"><button className="new-notebook-button">New Notebook</button></Link>
                </div>
                <div className="notebook-index-col-header col-title"><h5>TITLE</h5></div>
                <div className="notebook-index-col-header col-author"><h5></h5></div>
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