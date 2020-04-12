import * as NotebookAPI from '../../util/notebook_api_util';

export const RECEIVE_NOTEBOOKS = "RECEIVE_NOTEBOOKS";
export const RECEIVE_NOTEBOOK = "RECEIVE_NOTEBOOK";
export const REMOVE_NOTEBOOK = "REMOVE_NOTEBOOK";
export const RECEIVE_NOTEBOOK_ERRORS = "RECEIVE_NOTEBOOK_ERRORS";

export const receiveNotebooks = (notebooks) => ({
    type: RECEIVE_NOTEBOOKS,
    notebooks
});

export const receiveNotebook = (notebook) => ({
    type: RECEIVE_NOTEBOOK,
    notebook
});

export const removeNotebook = (notebookId) => ({
    type: REMOVE_NOTEBOOK,
    notebookId
});

export const receiveNotebookErrors = (errors) => ({
    type: RECEIVE_NOTEBOOK_ERRORS,
    errors
});

export const fetchNotebooks = () => dispatch => (
    NotebookAPI.fetchNotebooks().then((notebooks) => dispatch(receiveNotebooks(notebooks)),
        errors => dispatch(receiveNotebookErrors(errors.responseJSON)))
);

export const fetchNotebook = (notebookId) => dispatch => (
    NotebookAPI.fetchNotebook(notebookId).then((notebook) => dispatch(receiveNote(notebook)),
        errors => dispatch(receiveNotebookErrors(errors.responseJSON)))
);

export const createNotebook = (notebook) => dispatch => (
    NotebookAPI.createNotebook(notebook).then((notebook) => dispatch(receiveNote(notebook)),
        errors => dispatch(receiveNotebookErrors(errors.responseJSON)))
);

export const updateNotebook = (notebook) => dispatch => (
    NotebookAPI.updateNotebook(notebook).then((notebook) => dispatch(receiveNotebook(notebook)),
        errors => dispatch(receiveNotebookErrors(errors.responseJSON)))
);

export const deleteNotebook = (notebookId) => dispatch => (
    NotebookAPI.deleteNotebook(notebookId).then((notebook) => dispatch(removeNote(notebook.id)),
        errors => dispatch(receiveNoteErrors(errors.responseJSON)))
);

