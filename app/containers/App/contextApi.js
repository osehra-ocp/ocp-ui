import {
  BASE_LOCATIONS_API_URL,
  BASE_ORGANIZATIONS_API_URL,
  BASE_PATIENTS_API_URL,
  getEndpoint,
} from 'utils/endpointService';
import request from 'utils/request';

export function getPatient(id) {
  const baseEndpoint = getEndpoint(BASE_PATIENTS_API_URL);
  const requestURL = `${baseEndpoint}/${id}`;
  return request(requestURL);
}

export function getOrganization(id) {
  const baseEndpoint = getEndpoint(BASE_ORGANIZATIONS_API_URL);
  const requestURL = `${baseEndpoint}/${id}`;
  return request(requestURL);
}

export function getLocation(id) {
  const baseEndpoint = getEndpoint(BASE_LOCATIONS_API_URL);
  const requestURL = `${baseEndpoint}/${id}`;
  return request(requestURL);
}

export function getSubscriberOptions(patientId) {
  const patientBaseEndpoint = getEndpoint(BASE_PATIENTS_API_URL);
  const requestURL = `${patientBaseEndpoint}/${patientId}/subscriber-options`;
  return request(requestURL);
}
