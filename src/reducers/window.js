import {
  WINDOW
} from 'actions';

/**
 * @param {boolean} orientation - true=landscape, false=portrait
 */

export const initial = {
  width: null,
  height: null,
  isMobile: false,
  isTablet: false,
  orientation: true
};


export default function (state = initial, action) {

  switch (action.type) {

    case WINDOW.WINDOW_DEFINE_SIZE:
    case WINDOW.WINDOW_RESIZE:
      return {
        ...state,
        ...action.payload
      };
    
    default:
      return state;
  }
};