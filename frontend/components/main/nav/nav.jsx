import React from 'react';
import { Link } from 'react-router-dom';

class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleNewNote = this.handleNewNote.bind(this);
        this.state = {
            accountDropdown: "hidden",
            notebookDropdown: "hidden"
        };
    }

    componentDidMount() {
        console.log("Nav fetching notebooks")
        this.props.fetchNotebooks();
    }

    handleLogout(e) {
        e.preventDefault();
        this.props.logoutUser();
    }

    handleNewNote(e) {
        e.preventDefault;
        let notebookId = this.props.match.params.notebookId || Object.keys(this.props.notebooks)[0];
        this.props.createNewNote(notebookId).then((action) => this.props.history.push(`/notebooks/${notebookId}/${action.note.id}`));
    }

    toggleHidden(dropdown) {
        this.state[dropdown] === "hidden" ?
            this.setState({ [dropdown]: "" }) : this.setState({ [dropdown]: "hidden" });
    }

    render() {
        const { currentUser, notebooks } = this.props;
        const { notebookDropdown, accountDropdown } = this.state;
        const notebookList = notebooks.map( notebook => {
            return (
                <li key={notebook.id}><Link to={`/notebooks/${notebook.id}`}>{notebook.name}</Link></li>
            )
        })
        return (
            <>
                <div className="main-nav-container">
                    <div className="nav-profile">
                        <button className="account-dropdown-button" onClick={() => this.toggleHidden("accountDropdown")}>
                            <i className="fas fa-user-circle account-icon" ></i> 
                            {currentUser.email}
                            <i className="fas fa-angle-down dropdown-caret-icon"></i>
                        </button>
                        <ul className={`account-dropdown dropdown ${accountDropdown}`}>
                            <li><button>Other option</button></li>
                            <li><button>Other option</button></li>
                            <li><button onClick={this.handleLogout}>Sign out {currentUser.email}</button></li>
                        </ul>
                    </div>
                    <div className="nav-search">
                        <i className="fas fa-search nav-icon"></i>
                        Search
                    </div>
                    <button className="nav-new-note" onClick={this.handleNewNote}>
                        <i className="fas fa-plus-circle add-note-icon"></i>
                        <h4>New Note</h4>
                    </button>

                    <ul className="main-nav-links">
                        <li>
                            <div className="nav-link-container">
                                <div></div>
                                <Link to="/notes" className="nav-link">
                                    <i className="fas fa-sticky-note nav-icon"></i>
                                    <h4>All Notes</h4>
                                </Link>
                            </div>
                        </li>
                        <li>
                            <div className="nav-link-container">
                                <button className="caret-dropdown-button" onClick={() => this.toggleHidden("notebookDropdown")} >
                                    <i className={`fas fa-caret-right nav-icon 
                                    ${notebookDropdown === "" ? "open" : ""}`}></i>
                                </button> 
                                <Link to="/notebooks" className="nav-link">
                                    <i className="fas fa-book-open nav-icon"></i>
                                    Notebooks
                                </Link>
                                <ul className={`nav-notebook-list ${notebookDropdown}`}>
                                    <div className="notebook-index-notes-list-container">
                                        {notebookList}
                                    </div>
                                </ul>
                            </div>
                        </li>
                        <li>
                            <div className="nav-link-container">
                                <div></div>
                                <Link to="/" className="nav-link">
                                    <div></div>
                                    <h4>Tags</h4>
                                </Link>
                            </div>
                        </li>
                    </ul>
                </div>
            </>
        )
    }
}

export default Nav;