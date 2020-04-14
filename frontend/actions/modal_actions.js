export const OPEN_MODAL = 'OPEN_MODAL';
export const CLOSE_MODAL = 'CLOSE_MODAL';

export const openModal = (modal, actionId = 0) => {
  return {
    type: OPEN_MODAL,
    modal,
    actionId
  };
};

export const closeModal = () => {
  return {
    type: CLOSE_MODAL
  };
};
