import queryString from 'utils/queryString';
import request from 'utils/request';
import { BASE_TASKS_API_URL, getEndpoint } from 'utils/endpointService';
import { DEFAULT_PAGE_SIZE, DEFAULT_START_PAGE_NUMBER } from 'containers/App/constants';

export default function getTasks(patientId, pageNumber = DEFAULT_START_PAGE_NUMBER, pageSize = DEFAULT_PAGE_SIZE) {
  const searchType = 'patientId';
  const q = {
    searchValue: patientId,
    searchType,
    pageNumber,
    pageSize,
  };
  const params = queryString(q);
  const baseEndpoint = getEndpoint(BASE_TASKS_API_URL);
  const requestURL = `${baseEndpoint}/search${params}`;
  return request(requestURL);
}

export function cancelTask(id) {
  const baseEndpoint = getEndpoint(BASE_TASKS_API_URL);
  const requestURL = `${baseEndpoint}/${id}/deactivate`;
  return request(requestURL, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
