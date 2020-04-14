import { OPEN_MODAL, CLOSE_MODAL } from '../actions/modal_actions';

export default function modalReducer(state = {name: null, actionId: 0}, action) {
  switch (action.type) {
    case OPEN_MODAL:
      return { name: action.modal, actionId: action.actionId };
    case CLOSE_MODAL:
      return { name: null, actionId: 0 };
    default:
      return state;
  }
}
