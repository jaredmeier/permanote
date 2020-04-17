import { connect } from 'react-redux';

import SessionForm from './session_form';
import { createUser } from '../../actions/session_actions';
import { clearSessionErrors } from '../../actions/session_actions';

const mapStateToProps = (state, ownProps) => {
    return {
        errors: Object.values(state.errors.session),
        formType: 'Create account',
        buttonText: 'Continue'
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        processForm: (user) => dispatch(createUser(user)),
        clearSessionErrors: () => dispatch(clearSessionErrors())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);