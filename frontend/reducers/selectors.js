export const getNotes = ( state ) => {
    const tagFilters = state.ui.tagFilters;
    const search = state.ui.search;
    if (!tagFilters && !search) {
        return getAllNotes(state);
    } else if (tagFilters) {
        return getFilteredNotes(state, tagFilters);
    } else {
        return getSearchNotes(state, search);
    }
};

const getSearchNotes = ({ entities: { notes } } = {}, search) => {
    const notesArray = Object.keys(notes).map(id => notes[id]);
    return notesArray.filter(note => {
        return note.body.toLowerCase().indexOf(search.toLowerCase()) !== -1;
    });
};

export const getAllNotes = ({ entities: { notes } } = {}) => (
    Object.keys(notes).map(id => notes[id])
);

export const getFilteredNotes = ({ entities: { notes } } = {}, tagId) => (
    Object.keys(notes).map(id => notes[id]).filter( note => note.tag_ids.includes(tagId))
);

export const getAllNotebooks = ( { entities: { notebooks } } = {} ) => (
    Object.keys(notebooks).map(id => notebooks[id])
);

export const getNotebookNotes = (state, notebookId) => {
    const tagFilters = state.ui.tagFilters;
    if (!tagFilters) {
        return getAllNotebookNotes(state, notebookId);
    } else {
        return getFilteredNotebookNotes(state, notebookId, tagFilters);
    }
};

export const getAllNotebookNotes = ({ entities: { notebooks, notes } }, notebookId) => {
    if (!notebookId || Object.keys(notebooks).length === 0 || Object.keys(notes).length === 0) return [];
    const notebookNotes = [];
    notebooks[notebookId].note_ids.forEach(noteId => {
        notebookNotes.push(notes[noteId])
    });

    return notebookNotes;
}

export const getFilteredNotebookNotes = (state, notebookId, tagId) => (
    getAllNotebookNotes(state, notebookId).filter(note => note.tag_ids.includes(tagId))
);

export const getTags = ({entities: {tags }}, tagIds) => {
    return tagIds.map(tagId => {
        return tags[tagId];
    })
}

export const getAllTags = ({ entities: { tags } } ) => (
    Object.keys(tags).map(id => tags[id])
)
