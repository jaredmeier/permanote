import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { closeModal } from '../../actions/modal_actions';
import DeleteModal from './delete_modal';
import NewNotebookModal from './new_notebook_modal';
import DeleteNotebookModal from './delete_notebook_modal';
import RenameNotebookModal from './rename_notebook_modal';

function Modal({ modal, closeModal }) {
    if (!modal) {
        return null;
    }

    let component;

    switch (modal) {
        case 'deleteNote':
            component = <Route path={["/notes/:noteId", "/notebooks/:notebookId/:noteId"]} component={DeleteModal} />;
            break;
        case 'newNotebook':
            component = <NewNotebookModal />;
            break;
        case 'deleteNotebook':
            console.log("Opening delete modal")
            component = <Route path="/notebooks/" component={DeleteNotebookModal} />;
            break;
        case 'renameNotebook':
            component = <Route path="/notebooks/:notebookId" component={RenameNotebookModal} />;
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
        modal: state.ui.modal.name
    };
};

const mapDispatchToProps = dispatch => {
    return {
        closeModal: () => dispatch(closeModal())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);
