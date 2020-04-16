import * as TagsAPI from '../../util/tag_api_util';

export const RECEIVE_TAGS = "RECEIVE_TAGS";
export const RECEIVE_TAG = "RECEIVE_TAG";
export const REMOVE_TAG = "REMOVE_TAG";
export const RECEIVE_NOTE_TAG = "RECEIVE_NOTE_TAG";
export const REMOVE_NOTE_TAG = "REMOVE_NOTE_TAG";
export const RECEIVE_NOTE_TAG_ERRORS = "RECEIVE_NOTE_TAG_ERRORS";
export const RECEIVE_TAG_ERRORS = "RECEIVE_TAG_ERRORS";

export const receiveTags = (tags) => ({
    type: RECEIVE_TAGS,
    tags
});

export const receiveTag = (tag) => ({
    type: RECEIVE_TAG,
    tag
});

export const removeTag = (tagId) => ({
    type: REMOVE_TAG,
    tagId
});

export const receiveNoteTag = (noteTag) => ({
    type: RECEIVE_NOTE_TAG,
    noteId: noteTag.note_id,
    tagId: noteTag.tag_id
});

export const removeNoteTag = (noteTag) => ({
    type: REMOVE_NOTE_TAG,
    noteId: noteTag.note_id,
    tagId: noteTag.tag_id
});

export const receiveTagErrors = (errors) => ({
    type: RECEIVE_TAG_ERRORS,
    errors
});

export const receiveNoteTagErrors = (errors) => ({
    type: RECEIVE_NOTE_TAG_ERRORS,
    errors
});

export const fetchTags = () => dispatch => (
    TagsAPI.fetchTags().then((tags) => dispatch(receiveTags(tags)),
        errors => dispatch(receiveTagErrors(errors.responseJSON)))
);

export const fetchTag = (tagId) => dispatch => (
    TagsAPI.fetchTag(tagId).then((tag) => dispatch(receiveTag(tag)),
        errors => dispatch(receiveTagErrors(errors.responseJSON)))
);

export const createTag = (tag) => dispatch => (
    TagsAPI.createTag(tag).then((tag) => dispatch(receiveTag(tag)),
        errors => dispatch(receiveTagErrors(errors.responseJSON)))
);

export const deleteTag = (tagId) => dispatch => (
    TagsAPI.deleteTag(tagId).then((tag) => dispatch(removeTag(tag.id)),
        errors => dispatch(receiveTagErrors(errors.responseJSON)))
);

export const createNoteTag = (noteTag) => dispatch => (
    TagsAPI.createNoteTag(noteTag).then((noteTag) => dispatch(receiveNoteTag(noteTag)),
        errors => dispatch(receiveNoteTagErrors(errors.responseJSON)))
);

export const deleteNoteTag = (noteTag) => dispatch => (
    TagsAPI.deleteNoteTag(noteTag).then((noteTag) => dispatch(removeNoteTag(noteTag)),
        errors => dispatch(receiveNoteTagErrors(errors.responseJSON)))
);