import { connect } from 'react-redux';
import { fetchNote, updateNote, deleteNote } from '../../../actions/notes/notes_actions';
import { openModal } from '../../../actions/modal_actions';
import Editor from './editor';

const mapStateToProps = (state, ownProps) => {
    const note = state.entities.notes[ownProps.match.params.noteId];
    const notebook = note ? state.entities.notebooks[note.notebook_id] || { name: "No notebook" } : {name: "No notebook"};
    return {
        note: note,
        notebook: notebook
    }
};

const mapDispatchToProps = dispatch => ({
    updateNote: (note) => dispatch(updateNote(note)),
    openModal: (modal, actionId) => dispatch(openModal(modal, actionId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Editor);