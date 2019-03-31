export const tokenInfo = state => state.auth ? state.auth.token : undefined;
export const authUserInfo = state => state.auth ? state.auth.userInfo : undefined;
export const failedLogin = state => state.auth ? state.auth.failedLogin : 0;

export const isAuthorized = state => {
  let token = tokenInfo(state);
  if (!token || !token.access_token || token.access_token.length < 5)
    return false;

  return true;
};