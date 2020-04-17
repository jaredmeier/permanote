import { connect } from 'react-redux';
import { getNotebookNotes } from '../../../reducers/selectors';
import { fetchNotes } from '../../../actions/notes/notes_actions';
import { fetchNotebook } from '../../../actions/notebooks/notebook_actions';
import { removeTagFilter } from '../../../actions/tags/tag_filter_actions';
import NotebookShow from './notebook_show';

const mapStateToProps = (state, ownProps) => ({
    checkNotes: state.entities.notes,
    notes: getNotebookNotes(state, ownProps.match.params.notebookId),
    notebook: state.entities.notebooks[ownProps.match.params.notebookId],
    tagFilter: state.entities.tags[state.ui.tagFilters],
    editorExpand: state.ui.editorUI
});

const mapDispatchToProps = dispatch => ({
    fetchNotes: () => dispatch(fetchNotes()),
    fetchNotebook: (notebookId) => dispatch(fetchNotebook(notebookId)),
    removeTagFilter: (tagId) => dispatch(removeTagFilter(tagId))
});

export default connect(mapStateToProps, mapDispatchToProps)(NotebookShow);