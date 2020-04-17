export const EXPAND_EDITOR = 'EXPAND_EDITOR';
export const CLOSE_EDITOR = 'CLOSE_EDITOR';

export const expandEditor = () => {
    return {
        type: EXPAND_EDITOR
    };
};

export const closeEditor = () => {
    return {
        type: CLOSE_EDITOR
    };
};