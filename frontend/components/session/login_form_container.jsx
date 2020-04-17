import { connect } from 'react-redux';

import SessionForm from './session_form';
import { loginUser } from '../../actions/session_actions';
import { clearSessionErrors } from '../../actions/session_actions';

const mapStateToProps = (state, ownProps) => {
    return {
        errors: Object.values(state.errors.session),
        formType: 'Sign in',
        buttonText: 'Sign in'
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        processForm: (user) => dispatch(loginUser(user)),
        clearSessionErrors: () => dispatch(clearSessionErrors())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);