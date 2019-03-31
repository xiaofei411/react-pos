import {
  WINDOW
} from './index';


export const defineSize = params => dispatch =>
  dispatch({
    type: WINDOW.WINDOW_DEFINE_SIZE,
    payload: params
  });

export const resize = params => dispatch =>
  dispatch({
    type: WINDOW.WINDOW_RESIZE,
    payload: params
  });