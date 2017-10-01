import GitHub from 'github-api';
import { createSelector } from 'reselect';
import { getAccessToken } from 'src/store/login/selectors';

export const getUserLogin = (state) => ((state.user.data && state.user.data.login) || '');

export const getGitHubInstance = createSelector(
  getAccessToken, getUserLogin,
  (accessToken, username) => new GitHub({ username, token: accessToken }),
);

export const getCurrentUser = createSelector(
  getGitHubInstance, getUserLogin,
  (gitHub, username) => gitHub.getUser(username),
);
