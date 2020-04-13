import React from 'react';
import { Link } from 'react-router-dom';

class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleNewNote = this.handleNewNote.bind(this);
        this.state = {
            accountDropdown: "hidden"
        };
    }

    componentDidMount() {
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
        const { currentUser } = this.props;
        return (
            <>
                <div className="main-nav-container">
                    <div className="nav-profile">
                        <button className="account-dropdown-button" onClick={() => this.toggleHidden("accountDropdown")}>
                            <i className="fas fa-user-circle account-icon" ></i> 
                            {currentUser.email}
                            <i className="fas fa-angle-down dropdown-caret-icon"></i>
                        </button>
                        <ul className={`account-dropdown dropdown ${this.state.accountDropdown}`}>
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
                            <Link to="/notes">
                                <button className="nav-link-button">
                                    <i className="fas fa-caret-right nav-icon"></i>
                                    <i className="fas fa-sticky-note nav-icon"></i>
                                    All Notes
                                </button>
                            </Link>
                        </li>
                        <li>
                            <Link to="/notebooks">
                                <button className="nav-link-button">
                                    <i className="fas fa-caret-right nav-icon"></i>
                                    <i className="fas fa-book-open nav-icon"></i>
                                    Notebooks
                                </button>
                            </Link>
                        </li>
                        <li>Tags</li>
                    </ul>
                </div>
            </>
        )
    }
}

export default Nav;