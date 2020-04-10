import React from 'react';
import { Link} from 'react-router-dom';

class Nav extends React.Component {
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleNewNote = this.handleNewNote.bind(this);
    }

    handleLogout(e) {
        e.preventDefault();
        this.props.logoutUser();
    }

    handleNewNote(e) {
        e.preventDefault;
        this.props.createNewNote(1);
    }

    render() {
        return (
            <div className="main-nav-container">
                <div className="nav-profile">
                    {this.props.currentUser.email}
                    <br />
                    <button onClick={this.handleLogout}>Logout</button>
                </div>

                <button className="nav-new-note" onClick={this.handleNewNote}>
                    <i className="fas fa-plus-circle add-note-icon"></i>
                    <h4>New Note</h4>
                </button>

                <ul className="main-nav-links">
                    <li><Link to="/notes">All Notes</Link></li>
                    <li>Notebooks</li>
                    <li>Tags</li>
                </ul>
            </div>
        )
    }
}

export default Nav;