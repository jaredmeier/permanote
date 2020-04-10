import { connect } from 'react-redux';
import { fetchNote, updateNote, deleteNote } from '../../../actions/notes/notes_actions';
import Editor from './editor';

const mapStateToProps = (state, ownProps) => ({
    note: state.entities.notes[ownProps.match.params.noteId],
    defaultNote: state.entities.notes[state.ui.default_note]
});

const mapDispatchToProps = dispatch => ({
    fetchNote: (noteId) => dispatch(fetchNote(noteId)),
    updateNote: (note) => dispatch(updateNote(note)),
    deleteNote: (noteId) => dispatch(deleteNote(noteId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Editor);
