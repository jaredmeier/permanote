import { connect } from 'react-redux';
import { getAllNotes } from '../../../reducers/selectors';
import { fetchNotes } from '../../../actions/notes/notes_actions';
import Sidebar from './sidebar';

// const mapStateToProps = state => ({
//     notebooks: getAllNotes(state),
//     header: "All Notes"
// });

// const mapDispatchToProps = dispatch => ({
//     fetchNotes: () => dispatch(fetchNotes())
// });

// export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);

// TO-DO
// write a selector to getAllNotebookNotes using the note_ids array on the notebook selected in params
// map both the notebook and the note
// map fetchNotebook and fetchNotebook on componentDidMount and didUpdate if the params change
// this should then map the state as well using the selector described above