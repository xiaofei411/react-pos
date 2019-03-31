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
  USER as ActionTypes
} from './index';


export const getUser = params => (dispatch, getState) => {

  dispatch({
    type: ActionTypes.USER_GET
  });

  var paramsDto = dtoMapper.resolve(dtoMapper.interfaces.iGetUserActionParamsDto)(params);
  var dto = dtoMapper.resolve(
    dtoMapper.interfaces.iExecuteActionRequestDto
  )({
    action: "BitGlu.Slots2.Actions.POS.GetUser",
    params: paramsDto
  });

  return execApiAction(dto, getState(), dispatch)
    .then(response => {
      if (isResponseValid(response))
        return dispatch({
          type: ActionTypes.USER_GET_OK,
          payload: {
            status: response.status,
            ..._toResponseModel(response)
          }
        });

      return dispatch({
        type: ActionTypes.USER_GET_ERR
      });
    });
};

export const createUser = params => (dispatch, getState) => {

  dispatch({
    type: ActionTypes.USER_CREATE
  });

  var paramsDto = dtoMapper.resolve(dtoMapper.interfaces.iCreateUserActionParamsDto)(params);
  var dto = dtoMapper.resolve(
    dtoMapper.interfaces.iExecuteActionRequestDto
  )({
    action: "BitGlu.Slots2.Actions.POS.CreateUser",
    params: paramsDto
  });

  return execApiAction(dto, getState(), dispatch)
    .then(response => {
      if (isResponseValid(response))
        return dispatch({
          type: ActionTypes.USER_CREATE_OK,
          payload: {
            status: response.status,
            ..._toResponseModel(response)
          }
        });

      return dispatch({
        type: ActionTypes.USER_CREATE_ERR
      });
    });
};

export const updateUser = params => (dispatch, getState) => {

  dispatch({
    type: ActionTypes.USER_UPDATE
  });

  var paramsDto = dtoMapper.resolve(dtoMapper.interfaces.iUpdateUserActionParamsDto)(params);
  var dto = dtoMapper.resolve(
    dtoMapper.interfaces.iExecuteActionRequestDto
  )({
    action: "BitGlu.Slots2.Actions.POS.UpdateUser",
    params: paramsDto
  });

  return execApiAction(dto, getState(), dispatch)
    .then(response => {
      if (isResponseValid(response))
        return dispatch({
          type: ActionTypes.USER_UPDATE_OK,
          payload: {
            status: response.status,
            ..._toResponseModel(response)
          }
        });

      return dispatch({
        type: ActionTypes.USER_UPDATE_ERR
      });
    });
};


/**
 * Get a list of users awailable
 * @param {object} params - Search settings
 * @param {number} params.page - Current page. Greater than 0.
 * @param {number} params.number - Number of users to get.
 */
export const getUserList = params => (dispatch, getState) => {

  dispatch(disposeUsersList());

  dispatch({
    type: ActionTypes.USER_GET_LIST,
    payload: params
  });

  var paramsDto = dtoMapper.resolve(dtoMapper.interfaces.iGetUserListActionParamsDto)(params);
  var dto = dtoMapper.resolve(
    dtoMapper.interfaces.iExecuteActionRequestDto
  )({
    action: "BitGlu.Slots2.Actions.POS.GetUserList",
    params: paramsDto
  });

  return execApiAction(dto, getState(), dispatch)
    .then(response => {
      if (isResponseValid(response))
        return dispatch({
          type: ActionTypes.USER_GET_LIST_OK,
          payload: {
            list: _toResponseModel(response),
            total: response.data.outParameters.Total,
            status: response.status,
            ...params
          }
        });

      return dispatch({
        type: ActionTypes.USER_GET_LIST_ERR
      });
    });
};

/**
 * Searches for a users
 * @param {object} params - Search settings.
 * @param {number} params.page - Current page. Greater than 0.
 * @param {number} params.number - Number of users to get.
 * @param {string} params.term - Search term (substring search).
 */
export const searchUser = params => (dispatch, getState) => {

  dispatch({
    type: ActionTypes.USER_SEARCH,
    payload: params
  });

  var paramsDto = dtoMapper.resolve(dtoMapper.interfaces.iSearchUserActionParamsDto)(params);
  var dto = dtoMapper.resolve(
    dtoMapper.interfaces.iExecuteActionRequestDto
  )({
    action: "BitGlu.Slots2.Actions.POS.SearchUsers",
    params: paramsDto
  });

  return execApiAction(dto, getState(), dispatch)
    .then(response => {
      if (isResponseValid(response))
        return dispatch({
          type: ActionTypes.USER_SEARCH_OK,
          payload: {
            list: _toResponseModel(response),
            status: response.status,
            ...params
          }
        });

      return dispatch({
        type: ActionTypes.USER_SEARCH_ERR
      });
    });
};


export const addBalance = params => (dispatch, getState) => {

  dispatch({
    type: ActionTypes.USER_ADD_BALANCE
  });

  var paramsDto = dtoMapper.resolve(dtoMapper.interfaces.iAddBalanceActionParamsDto)(params);
  var dto = dtoMapper.resolve(
    dtoMapper.interfaces.iExecuteActionRequestDto
  )({
    action: "BitGlu.Slots2.Actions.POS.AddBalance",
    params: paramsDto
  });

  return execApiAction(dto, getState(), dispatch)
    .then(response => {
      if (isResponseValid(response))
        return dispatch({
          type: ActionTypes.USER_ADD_BALANCE_OK,
          payload: {
            status: response.status,
            ..._toResponseModel(response)
          }
        });

      return dispatch({
        type: ActionTypes.USER_ADD_BALANCE_ERR
      });
    });
};

export const addComps = params => (dispatch, getState) => {

  dispatch({
    type: ActionTypes.USER_ADD_COMPS
  });

  var paramsDto = dtoMapper.resolve(dtoMapper.interfaces.iAddCompsActionParamsDto)(params);
  var dto = dtoMapper.resolve(
    dtoMapper.interfaces.iExecuteActionRequestDto
  )({
    action: "BitGlu.Slots2.Actions.POS.AddBalance",
    params: paramsDto
  });

  return execApiAction(dto, getState(), dispatch)
    .then(response => {
      if (isResponseValid(response))
        return dispatch({
          type: ActionTypes.USER_ADD_COMPS_OK,
          payload: {
            status: response.status,
            ..._toResponseModel(response)
          }
        });

      return dispatch({
        type: ActionTypes.USER_ADD_COMPS_ERR
      });
    });
};

export const redeemBalance = params => (dispatch, getState) => {

  dispatch({
    type: ActionTypes.USER_REDEEM_BALANCE
  });

  var paramsDto = dtoMapper.resolve(dtoMapper.interfaces.iRedeemBalanceActionParamsDto)(params);
  var dto = dtoMapper.resolve(
    dtoMapper.interfaces.iExecuteActionRequestDto
  )({
    action: "BitGlu.Slots2.Actions.POS.RedeemBalance",
    params: paramsDto
  });

  return execApiAction(dto, getState(), dispatch)
    .then(response => {
      if (isResponseValid(response))
        return dispatch({
          type: ActionTypes.USER_REDEEM_BALANCE_OK,
          payload: {
            status: response.status,
            ..._toResponseModel(response)
          }
        });

      return dispatch({
        type: ActionTypes.USER_REDEEM_BALANCE_ERR
      });
    });
};

export const disposeUsersList = () => dispatch =>
  dispatch({
    type: ActionTypes.USER_DISPOSE_USERS_LIST
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

export const getUserTransactionsList = params => (dispatch, getState) => {

  dispatch({
    type: ActionTypes.USER_GET_TRANSACTIONS,
    payload: params
  });

  var paramsDto = dtoMapper.resolve(dtoMapper.interfaces.iGetUserTransactionsParamsDto)(params);
  var dto = dtoMapper.resolve(
    dtoMapper.interfaces.iExecuteActionRequestDto
  )({
    action: "BitGlu.Slots2.Actions.POS.Reports.GetPlayerTransaction",
    params: paramsDto
  });

  return execApiAction(dto, getState(), dispatch)
    .then(response => {
      if (isResponseValid(response))
        return dispatch({
          type: ActionTypes.USER_GET_TRANSACTIONS_OK,
          payload: {
            list: _toResponseModel(response),
            status: response.status,
            total: response.data.outParameters.Total,
            ...params
          }
        });

      return dispatch({
        type: ActionTypes.USER_GET_TRANSACTIONS_ERR
      });
    });
};

export const getUserGamesList = params => (dispatch, getState) => {

  dispatch({
    type: ActionTypes.USER_GET_GAMES,
    payload: params
  });

  var paramsDto = dtoMapper.resolve(dtoMapper.interfaces.iGetUserGamesParamsDto)(params);
  var dto = dtoMapper.resolve(
    dtoMapper.interfaces.iExecuteActionRequestDto
  )({
    action: "BitGlu.Slots2.Actions.POS.Reports.GetPlayerGameEvents",
    params: paramsDto
  });

  return execApiAction(dto, getState(), dispatch)
    .then(response => {
      if (isResponseValid(response))
        return dispatch({
          type: ActionTypes.USER_GET_GAMES_OK,
          payload: {
            list: _toResponseModel(response),
            status: response.status,
            total: response.data.outParameters.Total,
            ...params
          }
        });

      return dispatch({
        type: ActionTypes.USER_GET_GAMES_ERR
      });
    });
};