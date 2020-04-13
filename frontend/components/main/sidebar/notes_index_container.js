import { connect } from 'react-redux';
import { getAllNotes } from '../../../reducers/selectors';
import { fetchNotes } from '../../../actions/notes/notes_actions';
import Sidebar from './notes_index';

const mapStateToProps = state => ({
    notes: getAllNotes(state),
    header: "All Notes"
});

const mapDispatchToProps = dispatch => ({
    fetchNotes: () => dispatch(fetchNotes())
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
