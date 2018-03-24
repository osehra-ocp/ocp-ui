import { all, call, put, select, takeLatest } from 'redux-saga/effects';
import { makeSelectPatient } from 'containers/App/contextSelectors';
import { showNotification } from 'containers/Notification/actions';
import { GET_COMMUNICATIONS } from './constants';
import { getCommunicationsError, getCommunicationsSuccess } from './actions';
import { getCommunications } from './api';

export function* getCommunicationsSaga({ pageNumber }) {
  try {
    const patient = yield select(makeSelectPatient());
    const communications = yield call(getCommunications, patient.id, pageNumber);
    yield put(getCommunicationsSuccess(communications));
  } catch (error) {
    yield put(showNotification('Error in getting communications.'));
    yield put(getCommunicationsError(error));
  }
}

export function* watchGetCommunicationsSaga() {
  yield takeLatest(GET_COMMUNICATIONS, getCommunicationsSaga);
}

export default function* rootSaga() {
  yield all([
    watchGetCommunicationsSaga(),
  ]);
}

