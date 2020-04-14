import React from 'react';
import { connect } from 'react-redux';
import { deleteNote } from '../../actions/notes/notes_actions';
import { closeModal } from '../../actions/modal_actions';

class DeleteModal extends React.Component {
    constructor (props) {
        super(props);
        this.deleteNote = this.deleteNote.bind(this);
    }

    deleteNote () {
        const { note, deleteNote } = this.props;
        const that = this;
        deleteNote(note.id).
            then( () => this.props.closeModal() ).then( () => {
                that.props.match.params.notebookId ? that.props.history.push(`/notebooks/${that.props.match.params.notebookId}`) : that.props.history.push('/notes')
            });
    }

    render () {
        const { note } = this.props;
        if (!note) return null
        return (
            <div className="delete-modal">
                <h3>Delete note</h3>
                <button className="close-modal" onClick={this.props.closeModal}>
                    <i className="fas fa-times"></i>
                </button>
                <p>The note "{note.title}" will be moved to trash.</p>
                <div className="modal-actions">
                    <button onClick={this.props.closeModal}>Cancel</button>
                    <button onClick={this.deleteNote}>Delete</button>
                </div>
            </div>
        )
    }
}

function mapStateToProps (state, ownProps) {
    return {
        note: state.entities.notes[ownProps.match.params.noteId]
    }
};

const mapDispatchToProps = dispatch => ({
    deleteNote: (noteId) => dispatch(deleteNote(noteId)),
    closeModal: () => dispatch(closeModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(DeleteModal);