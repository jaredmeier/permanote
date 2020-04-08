import React from 'react';
import {connect} from 'react-redux';

import {loginUser} from '../../actions/session_actions';

class DemoLogin extends React.Component {
    componentDidMount(){
        const user = {email: 'demo@demo.com', password: 'password'};
        this.props.login(user).then(() => {
            this.props.history.push('/');
        }); 
    }

    render() {
        return (<div></div>)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        login: (user) => dispatch(loginUser(user))
    }
}

export default connect(null, mapDispatchToProps)(DemoLogin);
