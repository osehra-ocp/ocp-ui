/*
 *
 * ManageCommunicationPage actions
 *
 */
import {
  CREATE_COMMUNICATION, CREATE_COMMUNICATION_SUCCESS,
  SAVE_COMMUNICATION_ERROR, UPDATE_COMMUNICATION,
  GET_EPISODE_OF_CARES, GET_EPISODE_OF_CARES_SUCCESS,
  GET_PRACTITIONER, GET_PRACTITIONER_SUCCESS,
  GET_PRACTITIONER_ERROR,
  GET_COMMUNICATION, GET_COMMUNICATION_ERROR,
  GET_COMMUNICATION_SUCCESS,
} from './constants';


export function createCommunication(communication, patientId, handleSubmitting) {
  return {
    type: CREATE_COMMUNICATION,
    communication,
    patientId,
    handleSubmitting,
  };
}

export function createCommunicationSuccess(response) {
  return {
    type: CREATE_COMMUNICATION_SUCCESS,
    response,
  };
}

export function saveCommunicationError(error) {
  return {
    type: SAVE_COMMUNICATION_ERROR,
    error,
  };
}

export function updateCommunication(communication, patientId, handleSubmitting) {
  return {
    type: UPDATE_COMMUNICATION,
    communication,
    patientId,
    handleSubmitting,
  };
}

export function getCommunication(communicationId) {
  return {
    type: GET_COMMUNICATION,
    communicationId,
  };
}

export function getCommunicationSuccess(communication) {
  return {
    type: GET_COMMUNICATION_SUCCESS,
    communication,
  };
}


export function getCommunicationError(error) {
  return {
    type: GET_COMMUNICATION_ERROR,
    error,
  };
}


export function getEpisodeOfCares(patientId) {
  return {
    type: GET_EPISODE_OF_CARES,
    patientId,
  };
}

export function getEpisodeOfCaresSuccess(episodeOfCares) {
  return {
    type: GET_EPISODE_OF_CARES_SUCCESS,
    episodeOfCares,
  };
}

export function getPractitioner(practitionerId) {
  return {
    type: GET_PRACTITIONER,
    practitionerId,
  };
}

export function getPractitionerSuccess(practitioner) {
  return {
    type: GET_PRACTITIONER_SUCCESS,
    practitioner,
  };
}


export function getPractitionerError(practitioner) {
  return {
    type: GET_PRACTITIONER_ERROR,
    practitioner,
  };
}
