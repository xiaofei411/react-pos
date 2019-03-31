import {
  EMPLOYEE,
  AUTH
} from 'actions';

export const initial = {
  isFetching: false,
  info: null,
  summary: null,
  transactions: null
};

export default function (state = initial, action) {

  switch (action.type) {
    case EMPLOYEE.EMP_GET:
    case EMPLOYEE.EMP_CREATE_CACHIER:
      return {
        ...state,
        isFetching: true
      };

    case EMPLOYEE.EMP_GET_OK:
    case EMPLOYEE.EMP_CREATE_CACHIER_OK:
      //case EMPLOYEE.EMP_UPDATE_CACHIER_OK: // is waiting for API fix
      return {
        ...state,
        info: action.payload
      };

    case AUTH.SIGN_OUT:
    case EMPLOYEE.EMP_GET_ERR:
    case EMPLOYEE.EMP_CREATE_CACHIER_ERR:
      return initial;

    case EMPLOYEE.EMP_UPDATE_CACHIER:
      return {
        ...state,
        isFetching: true
      };
    case EMPLOYEE.EMP_GET_ADMIN_SUM:
      return {
        ...state,
        isFetching: true
      };
    case EMPLOYEE.EMP_GET_ADMIN_SUM_OK:
      return {
        ...state,
        summary: action.payload,
        isFetching: false
      };
    case EMPLOYEE.EMP_GET_ADMIN_SUM_ERR:
      return {
        ...state,
        isFetching: false
      };
    case EMPLOYEE.EMP_GET_CACHIER_SUM:
      return {
        ...state,
        isFetching: true
      };
    case EMPLOYEE.EMP_GET_CACHIER_SUM_OK:
      return {
        ...state,
        summary: action.payload,
        isFetching: false
      };
    case EMPLOYEE.EMP_GET_CACHIER_SUM_ERR:
      return {
        ...state,
        isFetching: false
      };
    case EMPLOYEE.EMP_GET_ADMIN_TRANSACTIONS:
      return {
        ...state,
        isFetching: true
      };
    case EMPLOYEE.EMP_GET_ADMIN_TRANSACTIONS_OK:
      return {
        ...state,
        transactions: action.payload,
        isFetching: false
      };
    case EMPLOYEE.EMP_GET_ADMIN_TRANSACTIONS_ERR:
      return {
        ...state,
        isFetching: false
      };
    case EMPLOYEE.EMP_GET_CACHIER_TRANSACTIONS:
      return {
        ...state,
        isFetching: true
      };
    case EMPLOYEE.EMP_GET_CACHIER_TRANSACTIONS_OK:
      return {
        ...state,
        transactions: action.payload,
        isFetching: false
      };
    case EMPLOYEE.EMP_GET_CACHIER_TRANSACTIONS_ERR:
      return {
        ...state,
        isFetching: false
      };
    default:
      return state;
  }
};