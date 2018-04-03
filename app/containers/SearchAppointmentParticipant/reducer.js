/*
 *
 * SearchAppointmentParticipant reducer
 *
 */

import { fromJS } from 'immutable';
import { filter, uniqBy } from 'lodash';
import {
  ADD_APPOINTMENT_PARTICIPANT,
  INITIALIZE_SEARCH_APPOINTMENT_PARTICIPANT,
  INITIALIZE_SEARCH_APPOINTMENT_PARTICIPANT_RESULT,
  REMOVE_APPOINTMENT_PARTICIPANT,
  SEARCH_APPOINTMENT_PARTICIPANT_ERROR,
  SEARCH_APPOINTMENT_PARTICIPANT_SUCCESS,
} from './constants';

const initialState = fromJS({
  searchParticipantResult: [],
  selectedParticipants: [],
});

function searchAppointmentParticipantReducer(state = initialState, action) {
  switch (action.type) {
    case SEARCH_APPOINTMENT_PARTICIPANT_SUCCESS:
      return state
        .set('searchParticipantResult', fromJS((action.searchParticipantResults && action.searchParticipantResults.elements) || []));
    case INITIALIZE_SEARCH_APPOINTMENT_PARTICIPANT_RESULT:
      return state
        .set('searchParticipantResult', fromJS([]));
    case INITIALIZE_SEARCH_APPOINTMENT_PARTICIPANT:
      return state
        .set('selectedParticipants', fromJS((action.initialSelectedParticipants) || []))
        .set('searchParticipantResult', fromJS([]));
    case SEARCH_APPOINTMENT_PARTICIPANT_ERROR:
      return state;
    case ADD_APPOINTMENT_PARTICIPANT: {
      const participants = state.get('selectedParticipants');
      const participantsAsArray = participants.toJS();
      // Get the participants to be added
      const participantToBeAdded = action.participants[0];
      participantsAsArray.push(participantToBeAdded);
      // Remove duplicate from the list
      const selectedParticipants = uniqBy(participantsAsArray, (e) => (e.memberId));
      return state
        .set('selectedParticipants', fromJS((selectedParticipants) || []))
        .set('searchParticipantResult', fromJS([]));
    }
    case REMOVE_APPOINTMENT_PARTICIPANT: {
      const participants = state.get('selectedParticipants');
      const participantsAsArray = participants.toJS();
      const filteredParticipants = filter(participantsAsArray, (e) => (e.memberId !== action.participant.memberId));
      return state
        .set('selectedParticipants', fromJS((filteredParticipants) || []))
        .set('searchParticipantResult', fromJS([]));
    }
    default:
      return state;
  }
}

export default searchAppointmentParticipantReducer;
