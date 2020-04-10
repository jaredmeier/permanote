import { connect } from 'react-redux';
import { fetchNote, updateNote, deleteNote } from '../../../actions/notes/notes_actions';
import { openModal } from '../../../actions/modal_actions';
import Editor from './editor';

const mapStateToProps = (state, ownProps) => ({
    note: state.entities.notes[ownProps.match.params.noteId],
});

const mapDispatchToProps = dispatch => ({
    updateNote: (note) => dispatch(updateNote(note)),
    openModal: modal => dispatch(openModal(modal))
});

export default connect(mapStateToProps, mapDispatchToProps)(Editor);