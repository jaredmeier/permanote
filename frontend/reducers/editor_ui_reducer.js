import { EXPAND_EDITOR, CLOSE_EDITOR} from '../actions/editor_ui_actions';

export default function editorUIReducer(state = null, action) {
    switch (action.type) {
        case EXPAND_EDITOR:
            return true;
        case CLOSE_EDITOR:
            return null;
        default:
            return state;
    }
}
