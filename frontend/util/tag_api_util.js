export const fetchTags = () => (
    $.ajax({
        type: 'GET',
        url: '/api/tags'
    })
);

export const fetchTag = (tagId) => (
    $.ajax({
        type: 'GET',
        url: `/api/tags/${tagId}`
    })
);

export const createTag = (tag) => (
    $.ajax({
        type: 'POST',
        url: `/api/tags`,
        data: { tag }
    })
);

export const deleteTag = (tagId) => (
    $.ajax({
        type: 'DELETE',
        url: `/api/tags/${tagId}`
    })
);

export const createNoteTag = (note_tag) => (
    $.ajax({
        type: 'POST',
        url: `/api/notes/${note_tag.note_id}/note_tags/`,
        data: { note_tag }
    })
);

export const deleteNoteTag = (noteTag) => (
    $.ajax({
        type: 'DELETE',
        url: `/api/notes/${noteTag.note_id}/note_tags/${noteTag.tag_id}`
    })
);

