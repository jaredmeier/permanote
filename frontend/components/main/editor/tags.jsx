import React from 'react';

class Tags extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tagName: "",
            tagActionsDropdown: {}
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.removeNoteTag = this.removeNoteTag.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        const author_id = this.props.userId;
        const name = this.state.tagName;
        const note_id = this.props.note.id;
        this.props.createTag( {name, author_id} ).then( (action) => {
            const tag_id = action.tag.id;
            this.props.createNoteTag({ note_id, tag_id });
        });
        this.setState({ tagName: ""});
    }

    removeNoteTag(tag_id) {
        const note_id = this.props.note.id;
        this.props.deleteNoteTag({note_id, tag_id});
    }

    updateField(field) {
        return (e) => {
            this.setState({ [field]: e.target.value });
        }
    }

    toggleTagDropdown(tagId) {
        this.state.tagActionsDropdown[tagId] === true ?
            this.setState({ tagActionsDropdown: Object.assign({}, this.state.tagActionsDropdown, { [tagId]: false }) }) :
            this.setState({ tagActionsDropdown: Object.assign({}, { [tagId]: true }) })
    }

    render () {
        const { note } = this.props;
        if (!note) return null;

        const tags = this.props.tags.map(tag => {
            if (!tag) return null;
            const tagActionsDropdown = this.state.tagActionsDropdown[tag.id];
            return (
                <li key={tag.id} className="editor-tag-button">
                    {tag.name}
                    <div className="dropdown-anchor">
                        <button className="tag-actions-button" onClick={() => this.toggleTagDropdown(tag.id)}>
                            <i className="fas fa-angle-down dropdown-caret-icon"></i>
                        </button>
                        <ul className={`tag-dropdown dropdown 
                            ${tagActionsDropdown ? "" : "hidden"}`}>
                            <li><button onClick={() => {
                                this.toggleTagDropdown(tag.id)
                            }}>Filter by tag</button></li>
                            <li><button onClick={() => {
                                this.removeNoteTag(tag.id);
                                this.toggleTagDropdown(tag.id)
                            }}>
                                Remove tag
                                </button>
                            </li>
                            <li><button onClick={() => {
                                this.toggleTagDropdown(tag.id)
                            }}>
                                Remove tag from all notes
                                </button>
                            </li>
                        </ul>
                    </div>
                </li>
            )
        });

        return (
            <div className="editor-tags">
                <i className={`fas fa-tag nav-icon`}></i>
                <ul className="editor-tags-list">
                    {tags}
                </ul>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" className="tag-input"
                    onChange={this.updateField("tagName")}
                    value={this.state.tagName}>
                    </input>
                </form>
            </div>
        )
    }
}

export default Tags;