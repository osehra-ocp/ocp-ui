/*
 *
 * NewPractitionerResource actions
 *
 */

import { FIND_PRACTITIONER, FIND_PRACTITIONER_ERROR, FIND_PRACTITIONER_SUCCESS } from './constants';


export function findPractitioner(firstName, lastName, identifierType, identifier, handleSubmitting) {
  return {
    type: FIND_PRACTITIONER,
    firstName,
    lastName,
    identifierType,
    identifier,
    handleSubmitting,
  };
}

export function findPractitionerSuccess(practitioner) {
  return {
    type: FIND_PRACTITIONER_SUCCESS,
    practitioner,
  };
}

export function findPractitionerError(error) {
  return {
    type: FIND_PRACTITIONER_ERROR,
    error,
  };
}
