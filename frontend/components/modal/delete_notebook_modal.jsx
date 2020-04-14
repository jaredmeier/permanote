import React from 'react';
import { connect } from 'react-redux';
import { deleteNotebook, fetchNotebooks } from '../../actions/notebooks/notebook_actions';
import { closeModal } from '../../actions/modal_actions';

class DeleteNotebookModal extends React.Component {
    constructor(props) {
        super(props);
        this.deleteNotebook = this.deleteNotebook.bind(this);
    }

    deleteNotebook() {
        const {notebookId} = this.props;
        const that = this;
        this.props.deleteNotebook(notebookId).
            then(() => this.props.closeModal()).then(() => {
                this.props.fetchNotebooks()
                // that.props.match.params.notebookId ? that.props.history.push(`/notebooks/${that.props.match.params.notebookId}`) : that.props.history.push('/notes')
            });
    }

    render() {
        return (
            <div className="delete-modal">
                <h3>Delete notebook?</h3>
                <button className="close-modal" onClick={this.props.closeModal}>
                    <i className="fas fa-times"></i>
                </button>
                <p>Any notes in the notebook will be deleted. This cannot be undone.</p>
                <div className="modal-actions">
                    <button onClick={this.props.closeModal}>Cancel</button>
                    <button onClick={this.deleteNotebook}>Delete</button>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        notebookId: state.ui.modal.actionId
    }
};

const mapDispatchToProps = dispatch => ({
    deleteNotebook: (notebookId) => dispatch(deleteNotebook(notebookId)),
    fetchNotebooks: () => dispatch(fetchNotebooks()),
    closeModal: () => dispatch(closeModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(DeleteNotebookModal);