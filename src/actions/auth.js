import qs from "querystring";
import {
  request,
  ENDPOINTS,
  isResponseValid,
  dtoMapper,
  toSimpleResponse,
  withAuth
} from "./base";
import {
  keyMirror
} from "helpers";

import {
  AUTH as ActionTypes
} from "./index";
import {
  setLocalAuthToken,
  removeLocalAuthToken
} from "data/services/auth";

/**
 * Authenticates the user by it's credentials.
 * @param {object} creds - User credentials info.
 * @param {string} creds.client - Constant string value "Authenticated".
 * @param {string} creds.username - User name.
 * @param {string} creds.password - User password.
 * @param {string} creds.grantType - Constant string "password".
 */
export const signIn = creds => dispatch => {
  var dto = dtoMapper.resolve(dtoMapper.interfaces.iAuthSignInDto)(creds);

  // TODO: DTO map
  return request
    .post(ENDPOINTS.auth.signIn, qs.stringify(dto), {
      headers: {
        Accept: "*/*",
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
    .then(response => {
      if (isResponseValid(response)) {
        return dispatch({
          type: ActionTypes.SIGN_IN_OK,
          payload: response.data
        });
      }

      return dispatch({
        type: ActionTypes.SIGN_IN_ERR,
        error: true,
        payload: {
          status: response.status,
          message: response.data.error_description
        }
      });
    });
};

export const signOut = () => dispatch => {
  removeLocalAuthToken();

  return dispatch({
    type: ActionTypes.SIGN_OUT
  });
};

export const setUserData = data => dispatch => {
  return dispatch({
    type: ActionTypes.AUTH_SET_USER_DATA,
    payload: data
  });
}

export const incrementLoginAttempt = () => dispatch => {
  return dispatch({
    type: ActionTypes.LOGIN_ATTEMPT
  });
};

export const refreshToken = (creds) => dispatch => {

  dispatch({
    type: ActionTypes.REFRESH_TOKEN
  });

  var dto = dtoMapper.resolve(dtoMapper.interfaces.iAuthRefreshTokenDto)(creds);

  // TODO: DTO map
  return request
    .post(ENDPOINTS.auth.signIn, qs.stringify(dto), {
      headers: {
        Accept: "*/*",
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
    .then(response => {
      if (isResponseValid(response)) {
        return dispatch({
          type: ActionTypes.REFRESH_TOKEN_OK,
          payload: response.data
        });
      }

      return dispatch({
        type: ActionTypes.REFRESH_TOKEN_ERR,
        error: true,
        payload: {
          status: response.status,
          message: response.data.error_description
        }
      });
    });
};

export const cacheAction = (action) => {
  return {
    type: ActionTypes.CACHE_ACTION,
    payload: action
  };
}

export const clearCachedActions = () => {
  return {
    type: ActionTypes.CLEAR_CACHED_ACTIONS
  };
}