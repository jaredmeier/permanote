export const fetchNotebooks = () => (
    $.ajax({
        type: 'GET',
        url: '/api/notebooks'
    })
);

export const fetchNotebook = (notebookId) => (
    $.ajax({
        type: 'GET',
        url: `/api/notebooks/${notebookId}`
    })
);

export const createNotebook = (notebook) => (
    $.ajax({
        type: 'POST',
        url: `/api/notebooks`,
        data: { notebook }
    })
);

export const updateNotebook = (notebook) => (
    $.ajax({
        type: 'PATCH',
        url: `/api/notebooks/${notebook.id}`,
        data: { notebook }
    })
);

export const deleteNotebook = (notebookId) => (
    $.ajax({
        type: 'DELETE',
        url: `/api/notebooks/${notebookId}`
    })
);

// const notebook = {name: 'Test Notebook', author_id: 6}