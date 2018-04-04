import queryString from 'query-string';
import request from 'utils/request';
import { BASE_TASKS_API_URL, getEndpoint } from 'utils/endpointService';

const baseEndpoint = getEndpoint(BASE_TASKS_API_URL);

export function getPatientToDos(patientId, practitionerId, definition) {
  let queryParams = '';
  if (patientId && !practitionerId) {
    queryParams = { patientId, definition };
  } else if (patientId && practitionerId) {
    queryParams = { patientId, practitionerId, definition };
  }
  const stringifiedParams = queryString.stringify(queryParams);
  const url = `${baseEndpoint}/tasks?${stringifiedParams}`;
  return request(url);
}

export function getToDoMainTask(patientId, organizationId, definition, practitionerId) {
  const queryParams = { patient: patientId, organization: organizationId, practitioner: practitionerId, definition };
  const stringifiedParams = queryString.stringify(queryParams);
  const url = `${baseEndpoint}/task-references?${stringifiedParams}`;
  return request(url);
}

export function cancelToDo(toDoLogicalId) {
  const url = `${baseEndpoint}/${toDoLogicalId}/deactivate`;
  return request(url,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
    });
}