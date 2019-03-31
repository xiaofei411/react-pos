import {
  AUTH
} from 'actions';

export const initial = {
  cachedActions: []
};

export default function (state = initial, action) {

  switch (action.type) {
    case AUTH.CACHE_ACTION:
      {
        const cachedActions = [...state.cachedActions, action.payload];

        return {
          ...state,
          cachedActions
        };
      }

    case AUTH.CLEAR_CACHED_ACTIONS:
      return {
        ...state,
        cachedActions: []
      };
      
    default:
      return state;
  }
};