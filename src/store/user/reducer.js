import createReducer from '../createReducer';

const initialState = () => ({
  data: null,
  error: null,
});

export const userFetchStart = (state, action) => ({
  ...state,
  ...initialState(),
});

export const userFetchComplete = (state, { data }) => ({
  ...state,
  data,
  error: null,
});

export const userFetchError = (state, { error }) => ({
  ...state,
  error,
  data: null,
});

export default createReducer(module.exports, initialState());
