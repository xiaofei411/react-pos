import {
  EMPLOYEE,
  AUTH
} from 'actions';

export const initial = {
  isFetching: false,
  list: {
    page1: []
  },
  totalPages: 1,
  totalEmployees: undefined,
  currentPage: 1,
  perPage: 10,
  searchTerm: ''
};

export default function (state = initial, action) {

  switch (action.type) {
    case EMPLOYEE.EMP_SEARCH_CACHIER:
    case EMPLOYEE.EMP_GET_CACHIER_LIST:
      return {
        ...state,
        isFetching: true,
        currentPage: action.payload.page,
        perPage: action.payload.number,
        searchTerm: action.payload.term || ''
      };

    case EMPLOYEE.EMP_SEARCH_CACHIER_OK:
    case EMPLOYEE.EMP_GET_CACHIER_LIST_OK:
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
          totalEmployees: payload.total
        };
      };

    case EMPLOYEE.EMP_SEARCH_CACHIER_ERR:
    case EMPLOYEE.EMP_GET_CACHIER_LIST_ERR:
      return {
        ...state,
        isFetching: false
      };

    case AUTH.SIGN_OUT:
    case EMPLOYEE.EMP_DISPOSE_EMPS_LIST:
      return initial;

    default:
      return state;
  }
};