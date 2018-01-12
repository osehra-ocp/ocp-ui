/*
 *
 * Organizations actions
 *
 */

import { LOAD_ORGANIZATIONS, LOAD_ORGANIZATIONS_ERROR, LOAD_ORGANIZATIONS_SUCCESS } from './constants';

export function loadOrganizations(query, includeInactive, searchType) {
  return {
    type: LOAD_ORGANIZATIONS,
    query,
    includeInactive,
    searchType,
  };
}

export function loadOrganizationsSuccess(organizations) {
  return {
    type: LOAD_ORGANIZATIONS_SUCCESS,
    organizations,
  };
}

export function loadOrganizationsError(err) {
  return {
    type: LOAD_ORGANIZATIONS_ERROR,
    err,
  };
}