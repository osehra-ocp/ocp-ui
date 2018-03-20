import { createSelector } from 'reselect';

/**
 * Direct selector to the workspaceSelectionPage state domain
 */
const selectWorkspaceSelectionPageDomain = (state) => state.get('workspaceSelectionPage');

/**
 * Other specific selectors
 */
const makeSelectOrganizationsData = () => createSelector(
  selectWorkspaceSelectionPageDomain,
  (substate) => substate && substate.getIn(['organizations', 'data']).toJS(),
);

const makeCareManagersData = () => createSelector(
  selectWorkspaceSelectionPageDomain,
  (substate) => substate && substate.getIn(['careManagers', 'data']).toJS(),
);

const makeCareCoordinatorsData = () => createSelector(
  selectWorkspaceSelectionPageDomain,
  (substate) => substate && substate.getIn(['careCoordinators', 'data']).toJS(),
);

const makeSelectPatientsData = () => createSelector(
  selectWorkspaceSelectionPageDomain,
  (substate) => substate && substate.getIn(['patients', 'data']).toJS(),
);

/**
 * Default selector used by WorkspaceSelectionPage
 */

const makeSelectWorkspaceSelectionPage = () => createSelector(
  selectWorkspaceSelectionPageDomain,
  (substate) => substate.toJS(),
);

export default makeSelectWorkspaceSelectionPage;
export {
  selectWorkspaceSelectionPageDomain,
  makeSelectOrganizationsData,
  makeCareManagersData,
  makeCareCoordinatorsData,
  makeSelectPatientsData,
};
