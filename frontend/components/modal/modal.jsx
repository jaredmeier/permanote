import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { closeModal } from '../../actions/modal_actions';
import DeleteModal from '../main/editor/delete_modal';

function Modal({ modal, closeModal }) {
    if (!modal) {
        return null;
    }

    let component;

    switch (modal) {
        case 'deleteNote':
            component = <Route path="/notes/:noteId" component={DeleteModal} />;
            break;
        default:
            return null;
    }

    return (
        <div className="modal-background" onClick={closeModal}>
            <div className="modal-child" onClick={e => e.stopPropagation()}>
                {component}
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        modal: state.ui.modal
    };
};

const mapDispatchToProps = dispatch => {
    return {
        closeModal: () => dispatch(closeModal())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
