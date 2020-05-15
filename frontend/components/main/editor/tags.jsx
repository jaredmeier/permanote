import React from 'react';

class Tags extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tagName: "",
            tagActionsDropdown: {},
            tagSearchDropdown: false,
            tagSearchMatches: []
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.removeNoteTag = this.removeNoteTag.bind(this);
        this.updateTagField = this.updateTagField.bind(this);
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
        this.setState({ tagName: "", tagSearchDropdown: false});
    }

    handleSubmitFromDropdown(tag_id) {
        const note_id = this.props.note.id;
        this.props.createNoteTag({ note_id, tag_id });
        this.setState({ tagName: "", tagSearchDropdown: false });
    }

    removeNoteTag(tag_id) {
        const note_id = this.props.note.id;
        this.props.deleteNoteTag({note_id, tag_id});
    }

    updateTagField(e) {
        this.setState({ tagName: e.target.value }, () => {
            if (this.state.tagName.length >= 1) {
                this.searchTags(this.state.tagName)
            }
            else {
                this.setState({ tagSearchDropdown: false });
            }
        });
    }

    searchTags(tagSearch) {
        const tags = this.props.allTags.filter(tag => {
            return tag.name.toLowerCase().indexOf(tagSearch.toLowerCase()) !== -1;
        });
        if (tags.length > 0) {
            this.setState( {tagSearchDropdown: true});
        } else {
            this.setState({ tagSearchDropdown: false });
        }
        this.setState( {tagSearchMatches: tags } );
        
    }

    populateSearchResults() {
        const tagMatches = this.state.tagSearchMatches;
        return tagMatches.map(tag => {
            return (
                <li key={tag.id}>
                    <button onClick={() => this.handleSubmitFromDropdown(tag.id)}>
                        {tag.name}
                    </button>
                </li>
            )
        })
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
                                this.props.receiveTagFilter(tag.id),
                                this.toggleTagDropdown(tag.id)
                            }}>Filter by tag</button></li>
                            <li><button onClick={() => {
                                this.removeNoteTag(tag.id);
                                this.toggleTagDropdown(tag.id)
                            }}>
                                Remove tag
                                </button>
                            </li>
                        </ul>
                    </div>
                </li>
            )
        });

        const tagSearchDropdown = this.state.tagSearchDropdown;
        const tagSearchResults = this.populateSearchResults();
        return (
            <div className="editor-tags">
                <i className={`fas fa-tag nav-icon`}></i>
                <ul className="editor-tags-list">
                    {tags}
                </ul>
                <div className="dropdown-anchor">
                <form onSubmit={this.handleSubmit}>
                    <input type="text" className="tag-input"
                    onChange={this.updateTagField}
                    value={this.state.tagName} placeholder="Search tags or enter new tag name">
                    </input>
                </form>
                    <ul className={`tag-dropdown dropdown 
                            ${tagSearchDropdown ? "" : "hidden"}`}>
                        {tagSearchResults}
                    </ul>
                </div>
            </div>
        )
    }
}

export default Tags;