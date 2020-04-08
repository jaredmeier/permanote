export const fetchNotes = () => (
    $.ajax({
        type: 'GET',
        url: '/api/notes'
    })
);

export const fetchNote = (noteId) => (
    $.ajax({
        type: 'GET',
        url: `/api/notes/${noteId}`
    })
);

export const createNote = (note) => (
    $.ajax({
        type: 'POST',
        url: `/api/notes`,
        data: {note}
    })
);

export const updateNote = (note) => (
    $.ajax ({
        type: 'PATCH',
        url: `/api/notes/${note.id}`,
        data: {note}
    })
);

export const deleteNote = (noteId) => (
    $.ajax ({
        type: 'DELETE',
        url: `/api/notes/${noteId}`
    })
);

// const note = {title: 'Test note', body: 'Test note body', notebook_id: 1}