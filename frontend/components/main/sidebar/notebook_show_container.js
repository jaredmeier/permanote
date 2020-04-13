import { connect } from 'react-redux';
import { getNotebookNotes } from '../../../reducers/selectors';
import { fetchNotes } from '../../../actions/notes/notes_actions';
import { fetchNotebook } from '../../../actions/notebooks/notebook_actions';
import NotebookShow from './notebook_show';

const mapStateToProps = (state, ownProps) => ({
    notes: getNotebookNotes(state, ownProps.match.params.notebookId),
    notebook: state.entities.notebooks[ownProps.match.params.notebookId]
});

const mapDispatchToProps = dispatch => ({
    fetchNotes: () => dispatch(fetchNotes()),
    fetchNotebook: (notebookId) => dispatch(fetchNotebook(notebookId))
});

export default connect(mapStateToProps, mapDispatchToProps)(NotebookShow);