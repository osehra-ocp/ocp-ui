/*
 *
 * RelatedPersons actions
 *
 */

import {
  GET_RELATED_PERSONS, GET_RELATED_PERSONS_ERROR, GET_RELATED_PERSONS_SUCCESS,
  INITIALIZE_RELATED_PERSONS,
} from './constants';


export function initializeRelatedPersons() {
  return {
    type: INITIALIZE_RELATED_PERSONS,
  };
}

export function getRelatedPersons(patientId, showInActive) {
  return {
    type: GET_RELATED_PERSONS,
    patientId,
    showInActive,
  };
}

export function getRelatedPersonsSuccess(relatedPersons) {
  return {
    type: GET_RELATED_PERSONS_SUCCESS,
    relatedPersons,
  };
}

export function getRelatedPersonsError(error) {
  return {
    type: GET_RELATED_PERSONS_ERROR,
    error,
  };
}

