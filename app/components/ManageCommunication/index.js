/**
*
* ManageCommunication
*
*/

import React from 'react';
import * as yup from 'yup';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import find from 'lodash/find';
import Util from 'utils/Util';
import { getPatientName } from 'utils/PatientUtils';
import { isUndefined } from 'lodash';
import isEmpty from 'lodash/isEmpty';
import merge from 'lodash/merge';
import { FormattedMessage } from 'react-intl';
import { PATIENT, PRACTITIONER } from 'components/ManageCommunication/constants';
import ManageCommunicationForm from './ManageCommunicationForm';
import messages from './messages';
import { TEXT_AREA_MAX_LENGTH, TEXT_AREA_MIN_LENGTH } from '../../containers/App/constants';

function ManageCommunication(props) {
  const {
    onSave,
    communicationStatus,
    communicationCategories,
    communicationNotDoneReasons,
    communicationMedia,
    episodeOfCares,
    handleOpen,
    selectedRecipients,
    handleRemoveRecipient,
    selectedPatient,
    communication,
    practitioner,
    initialSelectedRecipients,
    editMode,
    selectedTask,
  } = props;
  const propsFromContainer = {
    communicationStatus,
    communicationCategories,
    communicationNotDoneReasons,
    communicationMedia,
    episodeOfCares,
    handleOpen,
    selectedRecipients,
    handleRemoveRecipient,
    selectedPatient,
    // communication,
    practitioner,
    initialSelectedRecipients,
  };
  const textAreaMaxLength = TEXT_AREA_MAX_LENGTH;
  const textAreaMinLength = TEXT_AREA_MIN_LENGTH;
  return (
    <Formik
      isInitialValid={editMode}
      initialValues={setInitialValues(communication, selectedPatient, practitioner, selectedTask)}
      onSubmit={(values, actions) => {
        actions.setSubmitting(false);
        const communicationToBeSubmitted = mapToCommunication(
          values,
          communicationStatus,
          communicationCategories,
          communicationNotDoneReasons,
          communicationMedia,
          episodeOfCares,
          selectedPatient,
          practitioner,
          selectedRecipients,
          selectedTask);
        onSave(communicationToBeSubmitted, actions);
      }}
      validationSchema={
        yup.object().shape({
          statusCode: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />)),
          notDone: yup.boolean()
            .required((<FormattedMessage {...messages.validation.required} />)),
          categoryCode: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />)),
          mediumCode: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />)),
          sent: yup.date()
            .required((<FormattedMessage {...messages.validation.required} />))
            .min(new Date().toLocaleDateString(), (<FormattedMessage {...messages.validation.minStartDate} />)),
          payloadContent: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />))
            .max(textAreaMaxLength, (<FormattedMessage {...messages.validation.textAreaMaxLength} values={{ textAreaMaxLength }} />))
            .min(textAreaMinLength, (<FormattedMessage {...messages.validation.textAreaMinLength} values={{ textAreaMinLength }} />)),
        })
      }
      render={(formikProps) => <ManageCommunicationForm {...formikProps} {...propsFromContainer} />}
    >
    </Formik>
  );
}

ManageCommunication.propTypes = {
  onSave: PropTypes.func.isRequired,
  handleOpen: PropTypes.func.isRequired,
  communicationStatus: PropTypes.array.isRequired,
  communicationCategories: PropTypes.array.isRequired,
  communicationNotDoneReasons: PropTypes.array.isRequired,
  communicationMedia: PropTypes.array.isRequired,
  episodeOfCares: PropTypes.array.isRequired,
  selectedRecipients: PropTypes.array,
  initialSelectedRecipients: PropTypes.array,
  selectedPatient: PropTypes.object.isRequired,
  communication: PropTypes.object,
  handleRemoveRecipient: PropTypes.func.isRequired,
  practitioner: PropTypes.object,
  editMode: PropTypes.bool,
  selectedTask: PropTypes.object,
};

export default ManageCommunication;


function setInitialValues(communication, selectedPatient, practitioner, selectedTask) {
  let formData = null;
  let subjectData = null;
  let senderData = null;
  let communicationData = null;
  let topicData = null;
  if (!isEmpty(selectedPatient)) {
    subjectData = merge(
      mapToParticipantName(selectedPatient, 'subject'),
    );
  }
  if (!isEmpty(practitioner)) {
    senderData = merge(
      mapToParticipantName(practitioner, 'sender'),
    );
  }

  if (!isEmpty(communication)) {
    communicationData = merge(
      mapToFormDateField(communication, 'sent'),
      mapToFormField(communication, 'notDone'),
      mapToFormField(communication, 'notDoneReasonCode'),
      mapToFormField(communication, 'payloadContent'),
      mapToFormField(communication, 'note'),
      mapToFormField(communication, 'categoryCode'),
      mapToFormField(communication, 'mediumCode'),
      mapToTopicFromCommunication(communication),
      mapToFormField(communication, 'statusCode'),
    );
  }

  if (isEmpty(communication)) {
    topicData = merge(
      mapToTopicFromTaskReference(selectedTask),
    );
  }

  formData = merge(subjectData, senderData, communicationData, topicData);
  return Util.pickByIdentity(formData);
}

function mapToParticipantName(participant, fieldName) {
  const fieldObject = {};
  if (!isUndefined(fieldName) && participant && participant.name && participant.name.length > 0) {
    fieldObject[fieldName] = Util.setEmptyStringWhenUndefined(getPatientName(participant.name[0]));
  }
  return fieldObject;
}


function mapToTopicFromCommunication(communication) {
  const fieldObject = { topic: '' };
  if (communication && communication.topic && communication.topic.display) {
    fieldObject.topic = Util.setEmptyStringWhenUndefined(communication.topic.display);
  }
  return fieldObject;
}

function mapToTopicFromTaskReference(selectedTask) {
  const fieldObject = { topic: '' };
  if (selectedTask && selectedTask.definition && selectedTask.definition.display) {
    fieldObject.topic = Util.setEmptyStringWhenUndefined(selectedTask.definition.display);
  }
  return fieldObject;
}

function mapToCommunication(values,
                            communicationStatus,
                            communicationCategories,
                            communicationNotDoneReasons,
                            communicationMedia,
                            episodeOfCares,
                            selectedPatient,
                            practitioner,
                            selectedRecipients,
                            selectedTask) {
  const {
    statusCode,
    categoryCode,
    notDoneReasonCode,
    mediumCode,
    notDone,
    payloadContent,
    note,
    sent,
    episodeOfCareCode,
  } = values;
  const status = find(communicationStatus, { code: statusCode });
  const category = find(communicationCategories, { code: categoryCode });
  const notDoneReason = find(communicationNotDoneReasons, { code: notDoneReasonCode });
  const medium = find(communicationMedia, { code: mediumCode });
  const episodeOfCare = find(episodeOfCares, { reference: episodeOfCareCode });

  const communication = {
    note,
    payloadContent,
    notDone,
    sent: sent.toLocaleDateString(),
    statusCode,
    statusValue: status.display,
    categoryCode,
    categoryValue: category.display,
    notDoneReasonCode,
    notDoneReasonValue: notDoneReason ? notDoneReason.display : '',
    mediumCode,
    mediumValue: medium.display, // TODO fix tipo in key
    subject: getReferenceObject(selectedPatient, PATIENT),
    sender: getReferenceObject(practitioner, PRACTITIONER), // TODO get this dynamically
    context: episodeOfCare,
    topic: createTopicReference(selectedTask),
    definition: createEmptyReference(),
    recipient: selectedRecipients, // TODO change to recipients
  };
  return communication;
}

function getReferenceObject(object, referenceName) {
  return {
    reference: getReference(object, referenceName),
    display: getDisplay(object),
  };
}

function getReference(object, referenceName) {
  let referenceObject = '';
  if (object.id && referenceName) {
    referenceObject = referenceName.concat('/').concat(object.id);
  } else if (object.logicalId && referenceName) {
    referenceObject = referenceName.concat('/').concat(object.logicalId);
  }
  return referenceObject;
}

function getDisplay(object) {
  if (object.name && object.name.length > 0) {
    const name = object.name[0];
    return (name.firstName && name.lastName) ? name.firstName.concat(' ').concat(name.lastName) : '';
  }
  return '';
}

function createEmptyReference() {
  return {
    reference: '',
    display: '',
  };
}


function createTopicReference(selectedTask) {
  if (selectedTask && selectedTask.definition) {
    return selectedTask.definition;
  }
  return { reference: '', display: '' };
}


function mapToFormField(entity, fieldName) {
  const fieldObject = {};
  if (!isUndefined(entity[fieldName])) {
    fieldObject[fieldName] = Util.setEmptyStringWhenUndefined(entity[fieldName]);
  }
  return fieldObject;
}

function mapToFormDateField(entity, fieldName) {
  const fieldObject = {};
  if (!isUndefined(entity[fieldName])) {
    fieldObject[fieldName] = Util.setEmptyStringWhenUndefined(entity[fieldName]) && new Date(entity[fieldName]);
  }
  return fieldObject;
}
