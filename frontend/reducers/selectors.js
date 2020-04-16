export const getAllNotes = ( { entities: {notes} } = {} ) => (
    Object.keys(notes).map(id => notes[id])
);

export const getAllNotebooks = ( { entities: { notebooks } } = {} ) => (
    Object.keys(notebooks).map(id => notebooks[id])
);

export const getNotebookNotes = ( { entities: { notebooks, notes} }, notebookId ) => {
    if (!notebookId || Object.keys(notebooks).length === 0 || Object.keys(notes).length === 0) return [];
    const notebookNotes = [];
    notebooks[notebookId].note_ids.forEach(noteId => {
        notebookNotes.push(notes[noteId])
    });

    return notebookNotes;
}

export const getTags = ({entities: {tags }}, tagIds) => {
    return tagIds.map(tagId => {
        return tags[tagId];
    })
}
