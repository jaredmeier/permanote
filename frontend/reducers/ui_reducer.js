import { combineReducers } from 'redux';
import modalReducer from './modal_reducer';
import tagFiltersReducer from './tag_filters_reducer';
import editorUIReducer from './editor_ui_reducer';

const uiReducer = combineReducers({
    modal: modalReducer,
    tagFilters: tagFiltersReducer,
    editorUI: editorUIReducer
});

export default uiReducer;