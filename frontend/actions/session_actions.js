import * as AuthAPIUtil from '../util/session_api_util';

export const RECEIVE_CURRENT_USER = "RECEIVE_CURRENT_USER";
export const LOGOUT_CURRENT_USER = "LOGOUT_USER";
export const RECEIVE_SESSION_ERRORS = "RECEIVE_SESSION_ERRORS";

export const receiveCurrentUser = user => ({
    type: RECEIVE_CURRENT_USER,
    user
});

export const logoutCurrentUser = () => ({
    type: LOGOUT_CURRENT_USER
});

export const receiveSessionErrors = (errors) => ({
    type: RECEIVE_SESSION_ERRORS,
    errors
});



//thunks

export const loginUser = (user) => dispatch => (
    AuthAPIUtil.loginUser(user).then(user => dispatch(receiveCurrentUser(user)), 
        errors => dispatch(receiveSessionErrors(errors.responseJSON)))
);

export const createUser = (user) => dispatch => (
    AuthAPIUtil.createUser(user).then(user => dispatch(receiveCurrentUser(user)),
        errors => dispatch(receiveSessionErrors(errors.responseJSON)))
);

export const logoutUser = () => dispatch => (
    AuthAPIUtil.logoutUser().then( () => dispatch(logoutCurrentUser()),
        errors => dispatch(receiveSessionErrors(errors.responseJSON)))
)
