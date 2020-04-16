import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { logoutUser } from '../../../actions/session_actions';
import { createNote } from '../../../actions/notes/notes_actions';
import { fetchNotebooks } from '../../../actions/notebooks/notebook_actions';
import { fetchTags } from '../../../actions/tags/tag_actions';
import { getAllNotebooks, getAllTags } from '../../../reducers/selectors';
import Nav from './nav';


const mapStateToProps = state => ({
    currentUser: state.entities.users[state.session.id],
    notebooks: getAllNotebooks(state),
    tags: getAllTags(state)
});

const mapDispatchToProps = dispatch => ({
    logoutUser: () => dispatch(logoutUser()),
    createNewNote: (notebookId) => dispatch(createNote(noteTemplate(notebookId))),
    fetchNotebooks: () => dispatch(fetchNotebooks()),
    fetchTags: () => dispatch(fetchTags())
});

const noteTemplate = (notebookId) => ({
    title: 'Untitled',
    body: '',
    notebook_id: notebookId
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Nav));
