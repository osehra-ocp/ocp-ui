import { takeLatest, call, put } from 'redux-saga/effects';
import { GET_ORGANIZATION_LOOKUPS } from '../App/constants';
import { getLookups, getLookupTypesNotInStore } from '../../utils/LookupService';
import { getLookupsError, getLookupsFromStore, getLookupsSuccess } from '../App/actions';


export function* getOrganizationLookups(action) {
  try {
    const lookupTypesNotInStore = yield getLookupTypesNotInStore(action);
    if (lookupTypesNotInStore.length > 0) {
      const lookups = yield call(getLookups, lookupTypesNotInStore);
      yield put(getLookupsSuccess(lookups));
    } else {
      yield put(getLookupsFromStore());
    }
  } catch (err) {
    yield put(getLookupsError(err));
  }
}

// Individual exports for testing
export default function* watchGetOrganizationLookupsSaga() {
  yield takeLatest(GET_ORGANIZATION_LOOKUPS, getOrganizationLookups);
}
