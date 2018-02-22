/**
 *
 * ManageActivityDefinition
 *
 */

import React from 'react';
import { Formik } from 'formik';
import yup from 'yup';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import styles from './styles.css';
import ManageActivityDefinitionForm from './ManageActivityDefinitionForm';
import messages from './messages';
import { TEXT_MIN_LENGTH } from '../../containers/ManagePractitionerPage/constants';

function ManageActivityDefinition(props) {
  const minimumLength = TEXT_MIN_LENGTH;
  const { onSave, publicationStatuses, definitionTopics, resourceTypes, actionParticipantTypes, actionParticipantRoles, organization } = props;
  const formData = { organization, publicationStatuses, definitionTopics, resourceTypes, actionParticipantTypes, actionParticipantRoles };

  return (
    <div className={styles.root}>
      <Formik
        onSubmit={(values, actions) => {
          onSave(values, actions);
        }}
        validationSchema={() =>
          yup.lazy((values) => {
            let effectiveStart = new Date();
            if (values.effectiveStart) {
              effectiveStart = values.effectiveStart;
            }
            return yup.object().shape({
              version: yup.string()
                .required((<FormattedMessage {...messages.validation.required} />))
                .min(minimumLength, (
                  <FormattedMessage {...messages.validation.minLength} values={{ minimumLength }} />)),
              name: yup.string()
                .required((<FormattedMessage {...messages.validation.required} />))
                .min(minimumLength, (
                  <FormattedMessage {...messages.validation.minLength} values={{ minimumLength }} />)),
              title: yup.string()
                .required((<FormattedMessage {...messages.validation.required} />))
                .min(minimumLength, (
                  <FormattedMessage {...messages.validation.minLength} values={{ minimumLength }} />)),
              effectiveStart: yup.date()
                .required((<FormattedMessage {...messages.validation.required} />))
                .min(new Date().toLocaleDateString(), (<FormattedMessage {...messages.validation.minStartDate} />)),
              effectiveEnd: yup.date()
                .required((<FormattedMessage {...messages.validation.required} />))
                .min(effectiveStart.toLocaleDateString(), (<FormattedMessage {...messages.validation.minEndDate} />)),
              duration: yup.number()
                .required((<FormattedMessage {...messages.validation.required} />)),
              frequency: yup.number()
                .required((<FormattedMessage {...messages.validation.required} />)),
              status: yup.object()
              .required((<FormattedMessage {...messages.validation.required} />)),
              topic: yup.object()
              .required((<FormattedMessage {...messages.validation.required} />)),
              kind: yup.object()
              .required((<FormattedMessage {...messages.validation.required} />)),
              participantType: yup.object()
              .required((<FormattedMessage {...messages.validation.required} />)),
              participantRole: yup.object()
              .required((<FormattedMessage {...messages.validation.required} />)),
            });
          })}
        render={(formikProps) => <ManageActivityDefinitionForm {...formikProps} {...formData} />}
      />
    </div>
  );
}

ManageActivityDefinition.propTypes = {
  onSave: PropTypes.func.isRequired,
  organization: PropTypes.object.isRequired,
  publicationStatuses: PropTypes.array.isRequired,
  definitionTopics: PropTypes.array.isRequired,
  resourceTypes: PropTypes.array.isRequired,
  actionParticipantTypes: PropTypes.array.isRequired,
  actionParticipantRoles: PropTypes.array.isRequired,
};

export default ManageActivityDefinition;