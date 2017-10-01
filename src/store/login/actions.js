export const LOGIN_START = 'loginStart';
export const LOGIN_SUCCESS = 'loginSuccess';
export const LOGIN_FAILURE = 'loginFailure';

export const onLoginStart = () => ({
  type: LOGIN_START,
});

export const onLoginSuccess = ({ access_token, bearer, scope }) => ({
  type: LOGIN_SUCCESS,
  bearer,
  scope,
  accessToken: access_token,
});

export const onLoginError = (error) => ({
  type: LOGIN_FAILURE,
  error,
});
