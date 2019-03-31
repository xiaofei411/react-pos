import {
  USER,
  AUTH
} from 'actions';

export const initial = {
  isFetching: false,
  info: null,
  transactions: null,
  games: null
};

export default function (state = initial, action) {

  switch (action.type) {
    case USER.USER_GET:
    case USER.USER_CREATE:
    case USER.USER_ADD_BALANCE:
    case USER.USER_REDEEM_BALANCE:
    case USER.USER_ADD_COMPS:
      return {
        ...state,
        isFetching: true
      };

    case USER.USER_GET_OK:
    case USER.USER_CREATE_OK:
    case USER.USER_ADD_COMPS_OK:
      //case USER.USER_UPDATE_OK: // is waiting for API fix
    case USER.USER_ADD_BALANCE_OK:
    case USER.USER_REDEEM_BALANCE_OK:
      return {
        ...state,
        info: action.payload,
        isFetching: false
      };

    case AUTH.SIGN_OUT:
    case USER.USER_GET_ERR:
    case USER.USER_CREATE_ERR:
      return initial;

    case USER.USER_UPDATE:
      return {
        ...state,
        isFetching: true
      };

      //case USER.USER_UPDATE_ERR: // is waiting for API fix
    case USER.USER_ADD_BALANCE_ERR:
    case USER.USER_REDEEM_BALANCE_ERR:
    case USER.USER_ADD_COMPS_ERR:
      return {
        ...state,
        isFetching: false
      };
    
    case USER.USER_GET_TRANSACTIONS:
      return {
        ...state,
        isFetching: true
      };
    case USER.USER_GET_TRANSACTIONS_OK:
      return {
        ...state,
        transactions: action.payload,
        isFetching: false
      };
    case USER.USER_GET_TRANSACTIONS_ERR:
      return {
        ...state,
        isFetching: false
      };
    case USER.USER_GET_GAMES:
      return {
        ...state,
        isFetching: true
      };
    case USER.USER_GET_GAMES_OK:
      return {
        ...state,
        games: action.payload,
        isFetching: false
      };
    case USER.USER_GET_GAMES_ERR:
      return {
        ...state,
        isFetching: false
      };
    default:
      return state;
  }
};