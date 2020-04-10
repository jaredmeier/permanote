import React from 'react';

class Editor extends React.Component {
    constructor(props) {
        super(props);

        this.setEmptyState = this.setEmptyState.bind(this);
        this.setEmptyState();

        this.getNote = this.getNote.bind(this);
        this.deleteNote = this.deleteNote.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    setEmptyState() {
        this.state = {
            id: null,
            title: '',
            body: '',
            ellDropdown: "hidden",
            navAndSidebar: ""
        };
    }

    componentDidMount() {
        if (this.props.match.params.noteId) {
            this.props.fetchNote(this.props.match.params.noteId).then( () => this.getNote() );
        } else {
            this.getNote();
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.noteId && this.props.match.params.noteId != prevProps.match.params.noteId) {
            this.props.fetchNote(this.props.match.params.noteId).then( () => this.getNote() );
        } else if (this.props.defaultNote != prevProps.defaultNote) {
            this.getNote();
        }
    }

    updateForm(field) {
        return (e) => {
            this.setState({ [field]: e.target.value });
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.updateNote(this.state);
    }

    getNote() { //sets rendered note to actually selected note, or default note stored in UI state, or empty
        if (this.props.note) {
            this.setState(this.props.note);
        } else if (this.props.defaultNote) {
            this.setState(this.props.defaultNote);
        } else {
            this.setEmptyState();
        };
    }

    deleteNote() {
        this.props.deleteNote(this.state.id).then(() => this.props.history.push('/notes'));
        this.toggleHidden("ellDropdown");
    }

    toggleHidden(dropdown) {
        this.state[dropdown] === "hidden" ? 
            this.setState({ [dropdown]: "" }) : this.setState({ [dropdown]: "hidden" });
    }


    render() {
        const { title, body, updated_at } = this.state;
        const d = new Date(updated_at);
        const dateString = ( 
            "".concat(d.toLocaleString('default', { month: 'short' }), " ", 
            d.getDate(), ",", " ", d.getFullYear())
        );

        return (
            <div className="editor-container">
                <div className="editor-header">
                    <div className="col-1 row-1">
                        <button className="expand-button" onClick={() => this.toggleHidden("navAndSidebar")}>
                            <i className="fas fa-expand-alt"></i>
                        </button>
                        <h5>Notebook name</h5>
                    </div>
                    <div className="col-2 row-1">
                        <button className="ell-dropdown-button" onClick={() => this.toggleHidden("ellDropdown")}>
                            <i className="fas fa-ellipsis-v ellipsis-icon"></i>
                        </button>
                            <ul className={`ell-dropdown ${this.state.ellDropdown}`}>
                                <li><button onClick={this.deleteNote}>Delete note</button></li>
                                <li><button>Other option</button></li>
                                <li><button>Other option</button></li>
                            </ul>
                    </div>
                    <div className="col-1 row-2">
                        <h5>Last edited on {dateString}</h5>
                    </div>
                </div>

                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="title">
                        <input name="title" type="text" className="note-title-edit"
                        onChange={this.updateForm('title')} 
                        value={title}>
                        </input>
                    </label>
                    <label htmlFor="body">
                        <textarea name="body" className="note-body-edit"
                        onChange={this.updateForm('body')} 
                        value={body}
                        placeholder="Start writing">
                        </textarea>
                    </label>
                    <button>Save</button>
                </form>

                <div className="editor-footer">Tags go here</div>
            </div>
        )
    }
}

export default Editor;