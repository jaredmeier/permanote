import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { logoutUser } from '../../../actions/session_actions';
import { createNote } from '../../../actions/notes/notes_actions';
import { fetchNotebooks } from '../../../actions/notebooks/notebook_actions';
import { fetchTags } from '../../../actions/tags/tag_actions';
import { receiveTagFilter, removeTagFilter } from '../../../actions/tags/tag_filter_actions';
import { receiveSearch, clearSearch } from '../../../actions/search_actions';
import { getAllNotebooks, getAllTags, getAllNotes } from '../../../reducers/selectors';
import Nav from './nav';


const mapStateToProps = state => ({
    currentUser: state.entities.users[state.session.id],
    notebooks: getAllNotebooks(state),
    tagFilter: state.ui.tagFilters,
    tags: getAllTags(state),
    editorExpand: state.ui.editorUI,
    notes: getAllNotes(state)
});

const mapDispatchToProps = dispatch => ({
    logoutUser: () => dispatch(logoutUser()),
    createNewNote: (notebookId) => dispatch(createNote(noteTemplate(notebookId))),
    fetchNotebooks: () => dispatch(fetchNotebooks()),
    fetchTags: () => dispatch(fetchTags()),
    receiveTagFilter: (tagId) => dispatch(receiveTagFilter(tagId)),
    removeTagFilter: () => dispatch(removeTagFilter()),
    receiveSearch: (search) => dispatch(receiveSearch(search)),
    clearSearch: () => dispatch(clearSearch())
});

const noteTemplate = (notebookId) => ({
    title: '',
    body: '',
    notebook_id: notebookId
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Nav));
