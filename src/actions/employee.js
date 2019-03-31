import {
  request,
  ENDPOINTS,
  isResponseValid,
  dtoMapper,
  toSimpleResponse,
  execApiAction
} from './base';
import {
  keyMirror
} from 'helpers';

import {
  EMPLOYEE as ActionTypes
} from './index';
import { setUserData } from 'actions/auth';

export const createCachier = params => (dispatch, getState) => {

  dispatch({
    type: ActionTypes.EMP_CREATE_CACHIER
  });

  var paramsDto = dtoMapper.resolve(dtoMapper.interfaces.iCreateCachierActionParamsDto)(params);
  var dto = dtoMapper.resolve(
    dtoMapper.interfaces.iExecuteActionRequestDto
  )({
    action: "BitGlu.Slots2.Actions.POS.CreateCashier",
    params: paramsDto
  });

  return execApiAction(dto, getState(), dispatch)
    .then(response => {
      if (isResponseValid(response))
        return dispatch({
          type: ActionTypes.EMP_CREATE_CACHIER_OK,
          payload: {
            status: response.status,
            ..._toResponseModel(response)
          }
        });

      return dispatch({
        type: ActionTypes.EMP_CREATE_CACHIER_ERR
      });
    });
};

export const updateCachier = params => (dispatch, getState) => {

  dispatch({
    type: ActionTypes.EMP_UPDATE_CACHIER
  });

  var paramsDto = dtoMapper.resolve(dtoMapper.interfaces.iUpdateCachierActionParamsDto)(params);
  var dto = dtoMapper.resolve(
    dtoMapper.interfaces.iExecuteActionRequestDto
  )({
    action: "BitGlu.Slots2.Actions.POS.UpdateCashier",
    params: paramsDto
  });

  return execApiAction(dto, getState(), dispatch)
    .then(response => {
      if (isResponseValid(response))
        return dispatch({
          type: ActionTypes.EMP_UPDATE_CACHIER_OK,
          payload: {
            status: response.status,
            ..._toResponseModel(response)
          }
        });

      return dispatch({
        type: ActionTypes.EMP_UPDATE_CACHIER_ERR
      });
    });
};

export const getEmployee = params => (dispatch, getState) => {

  dispatch({
    type: ActionTypes.EMP_GET
  });

  var paramsDto = dtoMapper.resolve(dtoMapper.interfaces.iGetEmployeeActionParamsDto)(params);
  var dto = dtoMapper.resolve(
    dtoMapper.interfaces.iExecuteActionRequestDto
  )({
    action: "BitGlu.Slots2.Actions.POS.GetEmployee",
    params: paramsDto
  });
  
  return execApiAction(dto, getState(), dispatch)
    .then(response => {
      if (isResponseValid(response)) {
        if (params.saveData) {
          dispatch(setUserData(_toResponseModel(response)));
        }

        return dispatch({
          type: ActionTypes.EMP_GET_OK,
          payload: {
            status: response.status,
            ..._toResponseModel(response)
          }
        });
      }

      return dispatch({
        type: ActionTypes.EMP_GET_ERR
      });
    });
};

export const getCachierList = params => (dispatch, getState) => {

  dispatch({
    type: ActionTypes.EMP_GET_CACHIER_LIST,
    payload: params
  });

  var paramsDto = dtoMapper.resolve(dtoMapper.interfaces.iGetCachierListActionParamsDto)(params);
  var dto = dtoMapper.resolve(
    dtoMapper.interfaces.iExecuteActionRequestDto
  )({
    action: "BitGlu.Slots2.Actions.POS.GetCashierList",
    params: paramsDto
  });

  return execApiAction(dto, getState(), dispatch)
    .then(response => {
      if (isResponseValid(response))
        return dispatch({
          type: ActionTypes.EMP_GET_CACHIER_LIST_OK,
          payload: {
            list: _toResponseModel(response),
            status: response.status,
            total: response.data.outParameters.Total,
            ...params
          }
        });

      return dispatch({
        type: ActionTypes.EMP_GET_CACHIER_LIST_ERR
      });
    });
};

export const searchCachier = params => (dispatch, getState) => {

  dispatch({
    type: ActionTypes.EMP_SEARCH_CACHIER,
    payload: params
  });

  var paramsDto = dtoMapper.resolve(dtoMapper.interfaces.iSearchCachiersActionParamsDto)(params);
  var dto = dtoMapper.resolve(
    dtoMapper.interfaces.iExecuteActionRequestDto
  )({
    action: "BitGlu.Slots2.Actions.POS.SearchCashiers",
    params: paramsDto
  });

  return execApiAction(dto, getState(), dispatch)
    .then(response => {
      if (isResponseValid(response))
        return dispatch({
          type: ActionTypes.EMP_SEARCH_CACHIER_OK,
          payload: {
            list: _toResponseModel(response),
            status: response.status,
            ...params
          }
        });

      return dispatch({
        type: ActionTypes.EMP_SEARCH_CACHIER_ERR
      });
    });
};

export const disposeEmployeesList = () => dispatch =>
  dispatch({
    type: ActionTypes.EMP_DISPOSE_EMPS_LIST
  });

const _toResponseModel = iResponse => {
  if (typeof iResponse.data === typeof ("typedef"))
    return {
      valid: false,
      status: iResponse.status,
      exMessage: iResponse.data
    };

  let responseDto = dtoMapper.resolve(dtoMapper.interfaces.iActionResponseModelDto)(iResponse);
  if (responseDto)
    return responseDto.data;
};

export const getAdminSummary = params => (dispatch, getState) => {

  dispatch({
    type: ActionTypes.EMP_GET_ADMIN_SUM
  });

  var paramsDto = dtoMapper.resolve(dtoMapper.interfaces.iGetAdminSumActionParamsDto)(params);
  
  var dto = dtoMapper.resolve(
    dtoMapper.interfaces.iExecuteActionRequestDto
  )({
    action: "BitGlu.Slots2.Actions.POS.Reports.GetAdminSummary",
    params: paramsDto
  });

  return execApiAction(dto, getState(), dispatch)
    .then(response => {
      if (isResponseValid(response))
        return dispatch({
          type: ActionTypes.EMP_GET_ADMIN_SUM_OK,
          payload: {
            status: response.status,
            ..._toResponseModel(response)
          }
        });

      return dispatch({
        type: ActionTypes.EMP_GET_ADMIN_SUM_ERR
      });
    });
};

export const getCashierSummary = params => (dispatch, getState) => {

  dispatch({
    type: ActionTypes.EMP_GET_CACHIER_SUM
  });

  var paramsDto = dtoMapper.resolve(dtoMapper.interfaces.iGetCashierSumActionParamsDto)(params);
  
  var dto = dtoMapper.resolve(
    dtoMapper.interfaces.iExecuteActionRequestDto
  )({
    action: "BitGlu.Slots2.Actions.POS.Reports.GetCashierSummary",
    params: paramsDto
  });

  return execApiAction(dto, getState(), dispatch)
    .then(response => {
      if (isResponseValid(response))
        return dispatch({
          type: ActionTypes.EMP_GET_CACHIER_SUM_OK,
          payload: {
            status: response.status,
            ..._toResponseModel(response)
          }
        });

      return dispatch({
        type: ActionTypes.EMP_GET_CACHIER_SUM_ERR
      });
    });
};

export const getAdminTransactionsList = params => (dispatch, getState) => {

  dispatch({
    type: ActionTypes.EMP_GET_ADMIN_TRANSACTIONS,
    payload: params
  });

  var paramsDto = dtoMapper.resolve(dtoMapper.interfaces.iGetAdminTransactionsParamsDto)(params);
  var dto = dtoMapper.resolve(
    dtoMapper.interfaces.iExecuteActionRequestDto
  )({
    action: "BitGlu.Slots2.Actions.POS.Reports.GetAdminTransaction",
    params: paramsDto
  });

  return execApiAction(dto, getState(), dispatch)
    .then(response => {
      if (isResponseValid(response))
        return dispatch({
          type: ActionTypes.EMP_GET_ADMIN_TRANSACTIONS_OK,
          payload: {
            list: _toResponseModel(response),
            status: response.status,
            total: response.data.outParameters.Total,
            ...params
          }
        });

      return dispatch({
        type: ActionTypes.EMP_GET_ADMIN_TRANSACTIONS_ERR
      });
    });
};

export const getCashierTransactionsList = params => (dispatch, getState) => {

  dispatch({
    type: ActionTypes.EMP_GET_CACHIER_TRANSACTIONS,
    payload: params
  });

  var paramsDto = dtoMapper.resolve(dtoMapper.interfaces.iGetCashierTransactionsParamsDto)(params);
  var dto = dtoMapper.resolve(
    dtoMapper.interfaces.iExecuteActionRequestDto
  )({
    action: "BitGlu.Slots2.Actions.POS.Reports.GetCashierTransaction",
    params: paramsDto
  });

  return execApiAction(dto, getState(), dispatch)
    .then(response => {
      if (isResponseValid(response))
        return dispatch({
          type: ActionTypes.EMP_GET_CACHIER_TRANSACTIONS_OK,
          payload: {
            list: _toResponseModel(response),
            status: response.status,
            total: response.data.outParameters.Total,
            ...params
          }
        });

      return dispatch({
        type: ActionTypes.EMP_GET_CACHIER_TRANSACTIONS_ERR
      });
    });
};