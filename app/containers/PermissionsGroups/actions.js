/*
 *
 * PermissionsGroups actions
 *
 */

import { GET_GROUPS, GET_GROUPS_SUCCESS, GET_GROUPS_ERROR, GET_SCOPES, GET_SCOPES_SUCCESS, GET_SCOPES_ERROR } from './constants';

export function getGroups() {
  return {
    type: GET_GROUPS,
  };
}

export function getGroupsSuccess(groups) {
  return {
    type: GET_GROUPS_SUCCESS,
    groups,
  };
}

export function getGroupsError(error) {
  return {
    type: GET_GROUPS_ERROR,
    error,
  };
}

export function getScopes() {
  return {
    type: GET_SCOPES,
  };
}

export function getScopesSuccess(scopes) {
  return {
    type: GET_SCOPES_SUCCESS,
    scopes,
  };
}

export function getScopesError(error) {
  return {
    type: GET_SCOPES_ERROR,
    error,
  };
}
