import {
  MODAL
} from './index';

/**
 * Notifies UI to show the Modal by it's ID
 * @param {string} id - Modal ID
 * @public
 */
export const show = id => dispatch =>
  dispatch({
    type: MODAL.OPEN_MODAL_WINDOW,
    payload: id
  });

/**
 * Notifies UI to hide the Modal by it's ID
 * @param {string} id - Modal ID
 * @public
 */
export const hide = id => dispatch =>
  dispatch({
    type: MODAL.CLOSE_MODAL_WINDOW,
    payload: "hidden"
  });