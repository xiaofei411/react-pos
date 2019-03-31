import {
  USER,
  AUTH
} from 'actions';

export const initial = {
  isFetching: false,
  list: {
    page1: []
  },
  totalPages: 1,
  totalPlayers: undefined,
  currentPage: 1,
  perPage: 10,
  searchTerm: ''
};

export default function (state = initial, action) {

  switch (action.type) {
    case USER.USER_SEARCH:
    case USER.USER_GET_LIST:
      return {
        ...state,
        isFetching: true,
        currentPage: action.payload.page,
        perPage: action.payload.number,
        searchTerm: action.payload.term || ''
      };

    case USER.USER_SEARCH_OK:
    case USER.USER_GET_LIST_OK:
      {
        let payload = action.payload;
        let newPage = {};
        let listName = `page${payload.page}`;

        newPage[listName] = payload.list;

        var nextStateList = {
          ...state.list,
          ...newPage
        };

        let totalPages = Math.ceil(payload.total / state.perPage);

        return {
          ...state,
          isFetching: false,
          list: nextStateList,
          totalPages,
          totalPlayers: payload.total
        };
      };

    case USER.USER_SEARCH_ERR:
    case USER.USER_GET_LIST_ERR:
      return {
        ...state,
        isFetching: false
      };

    case AUTH.SIGN_OUT:
    case USER.USER_DISPOSE_USERS_LIST:
      return initial;

    default:
      return state;
  }
};