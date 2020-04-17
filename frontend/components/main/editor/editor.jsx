import React from 'react';
import ReactQuill, { Quill } from 'react-quill';
import { debounce } from "debounce";
import { getDate } from '../../../util/date_parse_util';

import Tags from './tags';

class Editor extends React.Component {
    constructor(props) {
        super(props);

        this.setEmptyState = this.setEmptyState.bind(this);
        this.setEmptyState();

        this.getNote = this.getNote.bind(this);
        this.deleteNote = this.deleteNote.bind(this);
        this.handleEditorChange = this.handleEditorChange.bind(this);   
        this.setToolbarStatus = this.setToolbarStatus.bind(this);
        
        this.saveNote = this.saveNote.bind(this);
        //return a debounced save function that only saves every x ms after user stops typing
        this.autosave = debounce(this.saveNote, 1000); 

        this.modules = {
            toolbar: {
                container: '#toolbar'
            }
        };  
    }

    setEmptyState() {
        this.state = {
            id: null,
            title: '',
            body: '',
            updated_at: new Date(),
            ellDropdown: "hidden",
            showToolbar: false,
        };
    }

    componentDidMount() {
        this.getNote();
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.noteId != prevProps.match.params.noteId || this.state.id === null) {
            this.getNote();
        }
    }

    updateForm(field) {
        return (e) => {
            this.setState({ [field]: e.target.value });
            this.autosave();
        }
    }

    handleEditorChange(text) {
        this.setState({ body: text});
        this.autosave();
    }

    saveNote() {
        const { id, title, body } = this.state;
        this.props.updateNote({id, title, body});
    }

    getNote() { //sets rendered note to actually selected note, or default empty note
        if (this.props.note) {
            this.setState(this.props.note);
        }  else {
            this.setEmptyState();
        };
    }

    deleteNote() {
        this.props.openModal("deleteNote", this.state.id);
        this.toggleHidden("ellDropdown");
    }

    toggleHidden(element) {
        this.state[element] === "hidden" ? 
            this.setState({ [element]: "" }) : this.setState({ [element]: "hidden" });
    }

    setToolbarStatus(status) {
        this.setState({ showToolbar: status});
    }

    toggleEditorExpand() {
        const { editorExpand } = this.props;
        if (editorExpand) {
            this.props.closeEditor();
        } else {
            this.props.expandEditor();
        }
    }

    render() {
        const { title, body, updated_at, showToolbar } = this.state;
        const dateString = getDate(updated_at);
        const { editorExpand } = this.props;
        return (
            <div className={`editor-container ${editorExpand ? "expand" : ""}`}>
                <div className="editor-header">
                    <div className="col-1 row-1">
                        <button className="expand-button" onClick={() => this.toggleEditorExpand()}>
                            <i className="fas fa-expand-alt"></i>
                        </button>
                        <i className="fas fa-book-open nav-icon"></i>
                        <h5>{this.props.notebook.name}</h5>
                    </div>
                    <div className="col-2 row-1">
                        <button className="ell-dropdown-button" onClick={() => this.toggleHidden("ellDropdown")}>
                            <i className="fas fa-ellipsis-v ellipsis-icon"></i>
                        </button>
                            <ul className={`ell-dropdown dropdown ${this.state.ellDropdown}`}>
                                <li><button onClick={this.deleteNote}>Delete note</button></li>
                                <li><button>Other option</button></li>
                                <li><button>Other option</button></li>
                            </ul>
                    </div>
                    <div className="col-1 row-2">
                        <h5 className={showToolbar ? "hidden" : ""}>Last edited on {dateString}</h5>
                    </div>
                    <Toolbar showToolbar={showToolbar}/>
                </div>
                <div className="quill-container" id="quill">
                    <form onSubmit={(e) => e.preventDefault()}>
                        <input name="title" type="text" className="note-title-edit"
                            onChange={this.updateForm('title')}
                            onFocus={() => this.setToolbarStatus(false)}
                            value={title}>
                        </input>
                    </form>
                    <ReactQuill
                        onChange={this.handleEditorChange}
                        value = {body}
                        modules={this.modules}
                        placeholder="Start writing"
                        onFocus={() => this.setToolbarStatus(true)}
                        bounds=".editor-container"
                        scrollingContainer=".quill-container"
                        >
                    </ReactQuill>
                </div>
                <Tags tags={this.props.tags} allTags={this.props.allTags} note={this.props.note}
                 createTag={this.props.createTag} createNoteTag={this.props.createNoteTag}
                 deleteNoteTag={this.props.deleteNoteTag} userId={this.props.userId}
                 receiveTagFilter={this.props.receiveTagFilter}/>
            </div>
        )
    }
}

export default Editor;

const Toolbar = ({ showToolbar }) => {
    return (
        <div className={`row-2 ql-toolbar ql-snow ${showToolbar ? "" : "hidden"}`} id="toolbar">
            <span className="ql-formats">
                <select className="ql-header" defaultValue="3">
                    <option value="1">Heading</option>
                    <option value="2">Subheading</option>
                    <option value="3">Normal</option>
                </select>
                <select className="ql-font"></select>
            </span>
            <span className="ql-formats">
                <select className="ql-color"></select>
                <select className="ql-background"></select>
            </span>
            <span className="ql-formats">
                <button className="ql-bold"></button>
                <button className="ql-italic"></button>
                <button className="ql-underline"></button>
                <button className="ql-strike"></button>
            </span>
            <span className="ql-formats">
                <button className="ql-list" value="ordered"></button>
                <button className="ql-list" value="bullet"></button>
                <select className="ql-align" defaultValue="">
                    <option label="left" value=""></option>
                    <option label="center" value="center"></option>
                    <option label="right" value="right"></option>
                    <option label="justify" value="justify"></option>
                </select>
            </span>
            <span className="ql-formats">
                <button className="ql-link"></button>
            </span>
            <span className="ql-formats">
                <button className="ql-formula"></button>
                <button className="ql-code-block"></button>
            </span>
            <span className="ql-formats">
                <button className="ql-clean"></button>
            </span>
        </div>
    )
}