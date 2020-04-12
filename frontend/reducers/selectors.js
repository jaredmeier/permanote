export const getAllNotes = ( { entities: {notes} } = {} ) => (
    Object.keys(notes).map(id => notes[id])
);

export const getAllNotebooks = ( { entities: { notebooks } } = {} ) => (
    Object.keys(notebooks).map(id => notebooks[id])
);

export const getNotebookNotes = ( { entities: { notebooks, notes} }, notebookId ) => {
    const notebookNotes = [];
    notebooks[notebookId].note_ids.forEach(noteId => {
        notebookNotes.push(notes[noteId])
    });
    return notebookNotes;
}
