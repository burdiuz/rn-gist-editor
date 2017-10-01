import createReducer from '../createReducer';

const initialState = () => ({
  list: [],
  error: null,
});

export const projectsFetchStart = (state, action) => ({
  ...state,
  ...initialState(),
});

export const projectsFetchComplete = (state, { list }) => ({
  ...state,
  list,
});

export const projectsFetchFailure = (state, { error }) => ({
  ...state,
  error,
});

export default createReducer(module.exports, initialState());
