/*
 *
 * LoginPage actions
 *
 */

import { LOGIN_ERROR, LOGIN_REQUEST, LOGIN_SUCCESS, LOGOUT_REQUEST } from './constants';

export function requestLogin(loginCredentials) {
  return {
    type: LOGIN_REQUEST,
    loginCredentials,
  };
}

export function loginSuccess(isAuthenticated) {
  return {
    type: LOGIN_SUCCESS,
    isAuthenticated,
  };
}

export function loginFailure() {
  return {
    type: LOGIN_ERROR,
  };
}

export function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
  };
}
