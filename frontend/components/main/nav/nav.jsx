import React from 'react';
import { Link } from 'react-router-dom';

class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accountDropdown: "hidden",
            notebookDropdown: "hidden",
            tagDropdown: "hidden",
            search: "",
            showSearch: false,
            searchNoteMatches: [],
            searchNotebookMatches: []
        };

        this.handleLogout = this.handleLogout.bind(this);
        this.handleNewNote = this.handleNewNote.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
        this.toggleSearch = this.toggleSearch.bind(this);
        this.clearSearch = this.clearSearch.bind(this);
    }

    componentDidMount() {
        if (this.props.match.path === "/notes") {
            this.setState({
                notebookDropdown: "hidden"
            })
        } else {
            this.setState({
                notebookDropdown: ""
            })
        }
        this.props.fetchNotebooks();
        this.props.fetchTags();
    }

    handleLogout(e) {
        e.preventDefault();
        this.props.logoutUser();
    }

    handleNewNote(e) {
        e.preventDefault;
        let notebookId = null;
        this.clearSearch();
        if (this.props.match.params.notebookId) {
            notebookId = this.props.match.params.notebookId;
            this.props.createNewNote(notebookId).then((action) => this.props.history.push(`/notebooks/${notebookId}/${action.note.id}`));
        } else {
            notebookId = this.props.notebooks[0].id;
            this.props.createNewNote(notebookId).then((action) => this.props.history.push(`/notes/${action.note.id}`));
        }
    }

    toggleHidden(dropdown) {
        this.state[dropdown] === "hidden" ?
            this.setState({ [dropdown]: "" }) : this.setState({ [dropdown]: "hidden" });
    }

    handleSearchChange(e) {
        this.setState({ search: e.target.value }, () => {
            if (this.state.search.length >= 1) {
                this.searchAll(this.state.search)
            } else {
                this.setState({ searchNoteMatches: [], searchNotebookMatches: [] });
            }
        });
    }

    searchAll(search) {
        const notes = this.props.notes.filter(note => {
            return note.title.toLowerCase().indexOf(search.toLowerCase()) !== -1;
        });

        const notebooks = this.props.notebooks.filter(notebook => {
            return notebook.name.toLowerCase().indexOf(search.toLowerCase()) !== -1;
        });

        if (notes.length || notebooks.length) {
            this.setState({ searchNoteMatches: notes, searchNotebookMatches: notebooks })  
        } else {
            this.setState({ searchNoteMatches: [], searchNotebookMatches: [] });
        }
        // debugger
    }

    clearSearch() {
        this.setState({ search: '', searchNoteMatches: [], searchNotebookMatches: [] });
        this.props.clearSearch();
    }

    toggleSearch() {
        this.setState({ showSearch: !this.state.showSearch });
    }

    handleSearchSubmit(e) {
        e.preventDefault();
        const { search } = this.state;
        if (search.length) {
            this.props.receiveSearch(search);
            this.props.removeTagFilter();
            this.setState({ searchNoteMatches: [], searchNotebookMatches: [] })
            this.props.history.push(`/notes/`);
        }
    }

    populateSearchResults() {
        const { search, searchNoteMatches, searchNotebookMatches } = this.state;

        if (!searchNoteMatches.length && !searchNotebookMatches.length) {
            return (
              <li style={{ margin: '0 10px 0 28px' }}>
                No matching titles found in notes or notebooks
              </li>
            );
        }

        const noteList = searchNoteMatches.map(note => {
            return (
                <li key={note.id}>
                    <button onMouseDown={() => {
                                        this.clearSearch();
                                        this.props.history.push(`/notes/${note.id}`);
                                        }
                                    }>
                        <i className="fas fa-sticky-note"></i>
                        {this.highlightText(note.title, search)}
                    </button>
                </li>
            )
        })

        const notebookList = searchNotebookMatches.map(notebook => {
            return (
                <li key={notebook.id}>
                    <button onMouseDown={() => {
                                        this.clearSearch();
                                        this.props.history.push(`/notebooks/${notebook.id}`);
                                        }
                                    }>
                        <i className="fas fa-book-open"></i>
                        {this.highlightText(notebook.name, search)}
                    </button>
                </li>
            )
        })
        
        return (
            <>
                {noteList}
                {notebookList}
            </>
        )
    }

    highlightText(str, text) {
        const regex = new RegExp(`(${text})`, "gi");

        const strParts = str.split(regex);

        return strParts.map((part, i) =>
          regex.test(part) ? <u key={i}>{part}</u> : <span key={i}>{part}</span>
        );
    }

    render() {
        const { currentUser, notebooks, tags } = this.props;
        const { notebookDropdown, accountDropdown, tagDropdown } = this.state;

        const notebookList = notebooks.map( notebook => {
            const currentNotebook = (notebook.id == this.props.match.params.notebookId);
            return (
                <div className={`nav-hover-notebook ${currentNotebook ? "selected" : ""}`} key={notebook.id}>
                    <Link to={`/notebooks/${notebook.id}`} onClick={this.clearSearch}>
                        <li key={notebook.id}>{notebook.name}</li>
                    </Link>
                </div>
            )
        });

        const tagList = tags.map(tag => {
            const currentTag = (tag.id === this.props.tagFilter);
            return (
                <div className={`nav-hover-tag ${currentTag ? "selected" : ""}`} key={tag.id}>
                    <button onClick={() => this.props.receiveTagFilter(tag.id)}>
                        <li key={tag.id}>{tag.name}</li>
                    </button>
                </div>
            )
        });

        const { editorExpand } = this.props;
        const { search, showSearch } = this.state;
        const searchResults = this.populateSearchResults();

        return (
            <>
                <div className={`main-nav-container ${editorExpand ? "collapse" : ""}`}>
                    <div className="nav-profile">
                        <button className="account-dropdown-button" onClick={() => this.toggleHidden("accountDropdown")}>
                            <i className="fas fa-user-circle account-icon" ></i> 
                            {currentUser.email}
                            <i className="fas fa-angle-down dropdown-caret-icon"></i>
                        </button>
                        <ul className={`account-dropdown dropdown ${accountDropdown}`}>
                            <li><button onClick={this.handleLogout}>Sign out {currentUser.email}</button></li>
                        </ul>
                    </div>
                    <div className="nav-search">
                        <div className="nav-search-bar dropdown-anchor">
                            <i className="fas fa-search nav-icon"></i>
                            <form id="search-form" onSubmit={this.handleSearchSubmit}>
                                <input
                                    value={search}
                                    onChange={this.handleSearchChange}
                                    onFocus={this.toggleSearch}
                                    onBlur={this.toggleSearch}
                                    placeholder="Search">
                                </input>
                            </form>
                            <button onClick={this.clearSearch} className={`clear-search-button ${search.length ? "" : "hidden"}`}>
                                <i className="fas fa-times clear-search-icon"></i>
                            </button>
                            {search && 
                                <ul className={`search-dropdown dropdown ${showSearch ? "" : "hidden"}`}>
                                    <li>
                                        <button type="submit" form="search-form" onMouseDown={this.handleSearchSubmit}>
                                        Search all notes
                                        </button>
                                    </li>
                                    <li>Go to...</li>
                                        {searchResults}
                                </ul>
                            }
                        </div>
                    </div>
                    <button className="nav-new-note" onClick={this.handleNewNote}>
                        <i className="fas fa-plus-circle add-note-icon"></i>
                        <h4>New Note</h4>
                    </button>

                    <ul className="main-nav-links">
                        <li>
                            <div className="nav-hover-container">
                                <div></div>
                                <Link to="/notes" className="main-nav-link" onClick={this.clearSearch}>
                                    <i className="fas fa-sticky-note nav-icon"></i>
                                    <h4>All Notes</h4>
                                </Link>
                            </div>
                        </li>
                        <li>
                            <div className="nav-hover-container">
                                <button className="caret-dropdown-button" onClick={() => this.toggleHidden("notebookDropdown")} >
                                    <i className={`fas fa-caret-right nav-icon 
                                    ${notebookDropdown === "" ? "open" : ""}`}></i>
                                </button> 
                                <Link to="/notebooks" className="main-nav-link" onClick={this.clearSearch}>
                                    <i className="fas fa-book-open nav-icon"></i>
                                    Notebooks
                                </Link>
                            </div>
                            <ul className={`nav-notebook-list ${notebookDropdown}`}>
                                {notebookList}
                            </ul>
                        </li>
                        <li>
                            <div className="nav-hover-container"> 
                                <button className="caret-dropdown-button" onClick={() => this.toggleHidden("tagDropdown")} >
                                    <i className={`fas fa-caret-right nav-icon 
                                    ${tagDropdown === "" ? "open" : ""}`}></i>
                                </button> 
                                <Link to="#" className="main-nav-link">
                                    <i className={`fas fa-tag nav-icon`}></i>
                                    <h4>Tags</h4>
                                </Link>
                            </div>
                            <ul className={`nav-tag-list ${tagDropdown}`}>
                                {tagList}
                            </ul>
                        </li>
                    </ul>
                    <div className="nav-footer">
                        <div className="nav-social-links">
                            <a href="https://github.com/jaredmeier/permanote" target="_blank"><i className="fab fa-github"></i></a>
                            <a href="https://www.linkedin.com/in/jar-m/" target="_blank"><i className="fab fa-linkedin-in"></i></a>
                            <a href="https://angel.co/u/jared-meier" target="_blank"><i className="fab fa-angellist"></i></a>
                        </div>
                        <img src={window.logoInlineURL} className="nav-logo" />
                    </div>
                </div>
            </>
        )
    }
}

export default Nav;