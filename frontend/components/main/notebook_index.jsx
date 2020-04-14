import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getAllNotebooks, getNotebookNotes } from '../../reducers/selectors';
import { fetchNotes } from '../../actions/notes/notes_actions';
import { fetchNotebooks } from '../../actions/notebooks/notebook_actions';
import { getDate, getDateRelative } from '../../util/date_parse_util';
import { openModal } from '../../actions/modal_actions';

class NotebookIndex extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notebookExpand: {},
            notebookActionsDropdown: {}
        };
    }

    componentDidMount () {
        this.props.fetchNotebooks().then(() => this.props.fetchNotes() );
    }

    getNotes(notebook) {
        const { notes } = this.props;
        if (!notebook.note_ids.length || !notes[notebook.id]) return null;
        const notebookNotes = notes[notebook.id];
        notebookNotes.sort(function (a, b) {
            return new Date(b.updated_at) - new Date(a.updated_at);
        });
        return (
            notebookNotes.map(note => {
                if (!note) return null;
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

    toggleNotebookActionsDropdown(notebookId) {
        this.state.notebookActionsDropdown[notebookId] === true ?
            this.setState({ notebookActionsDropdown: Object.assign({}, this.state.notebookActionsDropdown, { [notebookId]: false }) }) :
            this.setState({ notebookActionsDropdown: Object.assign({}, { [notebookId]: true }) })
    };

    render () {
        const { notebooks } = this.props;
        const notebookList = notebooks.map(notebook => {
            const notesList = this.getNotes(notebook);
            const notebookExpand = this.state.notebookExpand[notebook.id];
            const notebookActionsDropdown = this.state.notebookActionsDropdown[notebook.id];
            const date = getDateRelative(notebook.updated_at);
            return (
            <li key={notebook.id}>
                <div className="notebook-item-text">
                    <div>
                        <button onClick={() => this.toggleDropdown(notebook.id)} className="caret-dropdown-button">
                            <i className={`fas fa-caret-right nav-icon 
                            ${notebookExpand ? "open" : ""}`}></i>
                        </button> 
                            <Link to={`/notebooks/${notebook.id}`}>{notebook.name}</Link>
                    </div>
                    <div></div>
                    <div>{date}</div>
                    <div className="dropdown-anchor">
                        <button onClick={() => this.toggleNotebookActionsDropdown(notebook.id)} 
                        className="actions-dropdown-button">
                            <i className="fas fa-ellipsis-h"></i>
                        </button>
                        <ul className={`actions-dropdown dropdown 
                            ${notebookActionsDropdown ? "" : "hidden"}`}>
                            <li><button onClick={() => this.props.openModal("renameNotebook")}>Rename notebook</button></li>
                                <li><button onClick={() => {
                                    this.props.openModal("deleteNotebook", notebook.id);
                                    this.toggleNotebookActionsDropdown(notebook.id)
                                    }}>
                                Delete notebook
                                </button>
                            </li>
                        </ul>
                    </div>
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
        return (
            <div className="notebook-index-container">
                <div className="notebook-index-header"><h3>Notebooks</h3></div>
                <div className="notebook-index-header-2"><h4>My notebook list</h4></div>
                <div className="notebook-index-header-2 new-notebook">
                    <button className="new-notebook-button" onClick={() => this.props.openModal("newNotebook")}>
                        New Notebook
                    </button>
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
    notes: notes,
    }
};

const mapDispatchToProps = dispatch => ({
    fetchNotes: () => dispatch(fetchNotes()),
    fetchNotebooks: () => dispatch(fetchNotebooks()),
    openModal: (modal, actionId) => dispatch(openModal(modal, actionId))
});

export default connect(mapStateToProps, mapDispatchToProps)(NotebookIndex);