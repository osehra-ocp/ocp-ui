import { createSelector } from 'reselect';
/**
 * Direct selector to the manageTaskPage state domain
 */
const selectManageTaskPageDomain = (state) => state.get('manageTaskPage');

/**
 * Other specific selectors
 */
const makeSelectPatient = () => createSelector(
  selectManageTaskPageDomain,
  (substate) => substate && substate.get('patient'),
);

const makeSelectOrganization = () => createSelector(
  selectManageTaskPageDomain,
  (substate) => substate && substate.get('organization') && substate.get('organization').elements,
);

const makeSelectActivityDefinitions = () => createSelector(
  selectManageTaskPageDomain,
  (substate) => substate && substate.get('activityDefinitions') && substate.get('activityDefinitions').elements,
);

const makeSelectPractitioners = () => createSelector(
  selectManageTaskPageDomain,
  (substate) => substate && substate.get('practitioners') && substate.get('practitioners').elements,
);


export {
  selectManageTaskPageDomain,
  makeSelectPatient,
  makeSelectOrganization,
  makeSelectActivityDefinitions,
  makeSelectPractitioners,
};
