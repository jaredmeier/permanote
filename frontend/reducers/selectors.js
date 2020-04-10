export const getAllNotes = ( { entities: {notes} } = {} ) => (
    Object.keys(notes).map(id => notes[id])
);

// export const getNotebookNotes = ( {notebookId} ) => (

// )

// or should it be generic to accept a filter that is a notebook OR tag??

// should there be a UI slice of state that stores just the filtered notes?