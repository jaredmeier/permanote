export const RECEIVE_TAG_FILTER = "RECEIVE_TAG_FILTER";
export const REMOVE_TAG_FILTER = "REMOVE_TAG_FILTER";

export const receiveTagFilter = (tagId) => ({
    type: RECEIVE_TAG_FILTER,
    tagId
});

export const removeTagFilter = (tagId) => ({
    type: REMOVE_TAG_FILTER,
    tagId
});