import { createSelector } from 'reselect';

const selectGlobal = (state) => state.get('global');

const selectRoute = (state) => state.get('route');

const makeSelectLocation = () => createSelector(
  selectRoute,
  (routeState) => routeState.get('location').toJS()
);

const makeSelectUspsStates = () => createSelector(
  selectGlobal,
  (globalState) => globalState.get('uspsStates').toJS()
);


export {
  makeSelectLocation,
  makeSelectUspsStates,
};
