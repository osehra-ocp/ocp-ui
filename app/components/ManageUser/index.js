/**
 *
 * ManageUser
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';
import yup from 'yup';
import { Formik } from 'formik';
import PropTypes from 'prop-types';

import messages from './messages';
import ManageUserForm from './ManageUserForm';


function ManageUser(props) {
  const passwordPattern = new RegExp('^.*(?=.{8,})(?=.*[a-zA-Z])(?=.*\\d)(?=.*[@!#$]).*$');
  const { user, groups, onSave, resourceType, uaaUser, organization } = props;
  const isEditing = (uaaUser.length > 0);
  const formData = { user, groups, resourceType, isEditing, uaaUser };
  const initialValues = {
    firstName: user.name[0].firstName,
    lastName: user.name[0].lastName,
    username: uaaUser && uaaUser[0] && uaaUser[0].username,
    organization,
  };
  return (
    <div>
      <Formik
        initialValues={{ ...initialValues }}
        onSubmit={(values, actions) => {
          onSave(values, actions);
        }}
        validationSchema={yup.object().shape({
          username: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />)),
          password: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />))
            .matches(passwordPattern, <FormattedMessage {...messages.validation.passwordPattern} />),
          repeatPassword: yup.string()
            .oneOf([yup.ref('password')], <FormattedMessage {...messages.validation.notMatch} />)
            .required((<FormattedMessage {...messages.validation.required} />)),
          group: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />)),
          organization: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />)),

        })}
        render={(formikProps) => <ManageUserForm {...formikProps} {...formData} />}
      />
    </div>
  );
}

ManageUser.propTypes = {
  user: PropTypes.object,
  resourceType: PropTypes.string,
  groups: PropTypes.array,
  uaaUser: PropTypes.array,
  organization: PropTypes.string,
  onSave: PropTypes.func,
};

export default ManageUser;
