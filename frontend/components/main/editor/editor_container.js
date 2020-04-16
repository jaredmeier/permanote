import { connect } from 'react-redux';
import { fetchNote, updateNote, deleteNote } from '../../../actions/notes/notes_actions';
import { createTag, deleteNoteTag, createNoteTag } from '../../../actions/tags/tag_actions';
import { openModal } from '../../../actions/modal_actions';
import { getTags } from '../../../reducers/selectors';
import Editor from './editor';

const mapStateToProps = (state, ownProps) => {
    const note = state.entities.notes[ownProps.match.params.noteId];
    const notebook = note ? state.entities.notebooks[note.notebook_id] || { name: "No notebook" } : {name: "No notebook"};
    const tags = note? getTags(state, state.entities.notes[ownProps.match.params.noteId].tag_ids) : [];
    return {
        note: note,
        notebook: notebook,
        tags: tags,
        allTags: Object.keys(state.entities.tags).map(id => state.entities.tags[id]),
        userId: state.session.id
    }
};

const mapDispatchToProps = dispatch => ({
    updateNote: (note) => dispatch(updateNote(note)),
    createTag: (tag) => dispatch(createTag(tag)),
    createNoteTag: (noteTag) => dispatch(createNoteTag(noteTag)),
    deleteNoteTag: (noteTag) => dispatch(deleteNoteTag(noteTag)),
    openModal: (modal, actionId) => dispatch(openModal(modal, actionId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Editor);