export const AUTH_TOKEN_KEY = "authToken";

export const getLocalAuthToken = () => {
  if (typeof localStorage === "undefined")
    return;

  return JSON.parse(localStorage.getItem(AUTH_TOKEN_KEY));
};

export const setLocalAuthToken = token => {
  if (typeof localStorage === "undefined")
    return;
  return localStorage.setItem(AUTH_TOKEN_KEY, JSON.stringify(token));
}

export const removeLocalAuthToken = () => {
  if (typeof localStorage === "undefined")
    return;
  return localStorage.removeItem(AUTH_TOKEN_KEY);
}