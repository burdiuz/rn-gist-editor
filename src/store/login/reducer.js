import createReducer from '../createReducer';

const initialState = () => ({
  accessToken: '',
  scope: '',
  bearer: '',
  error: null,
});

export const loginStart = (state) => ({
  ...state,
  ...initialState(),
});

export const loginSuccess = (state, { accessToken, bearer, scope }) => ({
  ...state,
  accessToken,
  bearer,
  scope,
  error: null,
});

export const loginFailure = (state, { error }) => ({
  ...state,
  ...initialState(),
  error,
});

export default createReducer(module.exports, initialState());
