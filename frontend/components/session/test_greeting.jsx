import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import {logoutUser} from '../../actions/session_actions';

class Greeting extends React.Component {

    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        e.preventDefault();
        this.props.logoutUser();
    }

    render() {
        if (this.props.currentUser) {
            return (
                <>
                    <h3>Welcome {this.props.currentUser.email}!</h3>
                    <button onClick={this.handleClick}>Logout</button>
                </>
            )
        } else {
            return (
                <>
                    <Link to="/signup" >Create account</Link>
                    <br />
                    <Link to="/signin" >Sign in</Link>
                </>
            )
        }

    }
}

const mapStateToProps = (state) => {
    return {
        currentUser: state.entities.users[state.session.id]
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logoutUser: () => dispatch(logoutUser())
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(Greeting);