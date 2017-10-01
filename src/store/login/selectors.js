import { createSelector } from 'reselect';

export const getAccessToken = (state) => state.login.accessToken;
export const getAccessBearer = (state) => state.login.bearer;
export const getAccessScope = (state) => state.login.scope;
