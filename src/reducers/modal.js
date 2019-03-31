import {
  MODAL
} from 'actions';

export const initial = {
  id: null
};


export default function (state = initial, action) {

  switch (action.type) {

    case MODAL.OPEN_MODAL_WINDOW:
    case MODAL.CLOSE_MODAL_WINDOW:
      return {
        ...state,
        id: action.payload
      };

    default:
      return state;
  }
};