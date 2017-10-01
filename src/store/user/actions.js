import { getAccessToken } from 'src/store/login/selectors';

export const USER_FETCH_START = 'userFetchStart';
export const USER_FETCH_COMPLETE = 'userFetchComplete';
export const USER_FETCH_ERROR = 'userFetchError';

export const onUserFetchStart = () => ({
  type: USER_FETCH_START,
});

export const onUserFetchComplete = (data) => ({
  type: USER_FETCH_COMPLETE,
  data,
});

export const onUserFetchFailure = (error) => ({
  type: USER_FETCH_ERROR,
  error,
});

export const fetchUser = () => (dispatch, getState) => {
  const accessToken = getAccessToken(getState());
  dispatch(onUserFetchStart());
  return fetch(`https://api.github.com/user?access_token=${accessToken}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return Promise.reject(new Error(`Server returned ${response.status} status`));
      }
    })
    .then((data) => {
      dispatch(onUserFetchComplete(data));
      return data;
    })
    .catch((error) => {
      dispatch(onUserFetchFailure(error));
      return Promise.reject(error || new Error('Unknown Error'));
    });
};
