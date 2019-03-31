import {
  AUTH
} from 'actions';
import {
  getLocalAuthToken,
  setLocalAuthToken
} from 'data/services/auth';
import moment from 'moment';

export const initial =
  getLocalAuthToken();


export default function (state = initial, action) {

  switch (action.type) {

    case AUTH.SIGN_IN_OK:
      {
        const expiresDate = moment().add(action.payload.expires_in, 's');

        return {
          ...state,
          token: {
            ...action.payload,
            refreshing: false,
            expiresDate
          }
        };
      }
    case AUTH.AUTH_SET_USER_DATA:
      {
        let nextState = {
          ...state,
          userInfo: action.payload,
        };

        setLocalAuthToken(nextState);
        return nextState;
      }

    case AUTH.SIGN_OUT:
      return {};

    case AUTH.SIGN_IN_ERR:
      {
        const failedLogin = state && state.failedLogin ? state.failedLogin + 1 : 1
        return {
          ...state,
          failedLogin
        }
      }

    case AUTH.SIGN_OUT:
      return {};

    case AUTH.REFRESH_TOKEN:
      {
        let nextState = {
          ...state,
          token: {
            ...state.token,
            refreshing: true,
          }
        }

        setLocalAuthToken(nextState);
        return nextState;
      }

    case AUTH.REFRESH_TOKEN_OK:    
      {
        const expiresDate = moment().add(action.payload.expires_in, 's');
        let nextState = {
          ...state,
          token: {
            ...action.payload,
            refreshing: false,
            expiresDate
          }
        }

        setLocalAuthToken(nextState);
        return nextState
      };

    case AUTH.REFRESH_TOKEN_ERR:    
      {
        let nextState = {
          ...state,
          token: {
            ...state.token,
            refreshing: false,
          }
        }
        
        setLocalAuthToken(nextState);
        return nextState
      };

    default:
      return state;
  }
}