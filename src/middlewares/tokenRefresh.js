import { AUTH as ActionTypes } from 'actions';
import { signOut, cacheAction, clearCachedActions, refreshToken } from "actions/auth";

export default ({ dispatch, getState }) => {
  return next => action => {

    const refreshingActions = [
      ActionTypes.SIGN_IN_OK,
      ActionTypes.SIGN_IN_ERR,
      ActionTypes.REFRESH_TOKEN,
      ActionTypes.REFRESH_TOKEN_OK,
      ActionTypes.REFRESH_TOKEN_ERR,
      ActionTypes.CACHE_ACTION,
      ActionTypes.SIGN_OUT
    ];

    if (action.type === ActionTypes.REFRESH_TOKEN_ERR) {
      return next(signOut());
    }

    const patt = new RegExp("@");
    const patt2 = new RegExp("WINDOW_");
    const allowedActions = patt.test(action.type) || patt2.test(action.type);


    if (refreshingActions.indexOf(action.type) > -1 || allowedActions || !action.type) {
      return next(action);
    }

    const state = getState();

    if (!state.auth.token) {
      return next(signOut());
    }

    const {
      auth: {
        token:{
          expiresDate,
          refresh_token,
          refreshing
        }
      },
      cashedData:{
        cachedActions
      }
    } = state;

    const now = Date.now();
    const receivedTokenDate = Date.parse(expiresDate);

    const isTokenExpired = now > receivedTokenDate - 120000; // two minutes before token expires

    if (!isTokenExpired) {
      return next(action);
    }

    next(cacheAction(action));

    if (refreshing) {
      return;
    }

    next(refreshToken({
      client: "Authenticated",
      refreshToken: refresh_token,
      grantType: "refresh_token"
    }))
    .then((action) => {
      if (action.type === ActionTypes.REFRESH_TOKEN_OK) {
        const cachedActions = getState().cashedData.cachedActions;

        if (cachedActions && cachedActions.length > 0) {
          for (let i = 0; i < cachedActions.length; i++) {
            next(cachedActions[i]);
          }
        }

        next(clearCachedActions());
      }
    });

  };
};