import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Form, Formik } from 'formik';
import yup from 'yup';
import { Cell, Grid } from 'styled-css-grid';
import MenuItem from 'material-ui/MenuItem';
import join from 'lodash/join';
import merge from 'lodash/merge';

import SelectField from 'components/SelectField';
import StyledRaisedButton from 'components/StyledRaisedButton';
import StyledFlatButton from 'components/StyledFlatButton';
import FileInputComponentField from 'components/FileInputComponentField';
import TextField from 'components/TextField';
import messages from './messages';
import { SMART_APP_LOGO_SRC_PREFIX } from './constants';

function ManageClientForm(props) {
  /* const imageFormat = new RegExp('(/(gif|jpg|jpeg|tiff|png)$/i)');
  const imageSize = 500;*/
  const {
    initialValues,
    handleCloseDialog,
    onSaveClient,
  } = props;
  let initialValueClient = null;
  let initialAppIcon = [];
  if (initialValues !== null) {
    const { clientId, clientType, scope, name, redirectUri, appLaunchUrl, appIcon } = initialValues;
    initialAppIcon = [{ base64: `${SMART_APP_LOGO_SRC_PREFIX}${appIcon}`, name: 'default.png', size: '11', type: 'image/png', file: { name: 'default.png', size: '11', type: 'image/png' } }];
    initialValueClient = {
      clientId,
      clientType,
      scope: join(scope, ','),
      name,
      redirectUri: join(redirectUri, ','),
      appLaunchUrl,
      appIcon: initialAppIcon,
      clientSecret: '************',
    };
  }
  return (
    <div>
      <Formik
        onSubmit={(values, actions) => {
          if (initialValues !== null) {
            onSaveClient(merge(values, { isEdit: true }), actions);
          }
          onSaveClient(values, actions);
          handleCloseDialog();
        }}
        initialValues={{ ...initialValueClient }}
        validationSchema={yup.object().shape({
          clientId: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />)),
          clientType: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />)),
          scope: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />)),
          name: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />)),
          redirectUri: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />)),
          appLaunchUrl: yup.string()
            .required((<FormattedMessage {...messages.validation.required} />)),
          clientSecret: yup.string()
            .when('clientType', {
              is: 'CREDENTIAL',
              then: yup.string()
                .required((<FormattedMessage {...messages.validation.required} />)),
            }),
          // TODO: Fix validation
          /* appIcon: yup.array().of(yup.object().shape({
            size: yup.number()
              .lessThan(imageSize, (<FormattedMessage {...messages.validation.imageSize} values={{ imageSize }} />)),
            name: yup.string()
              .matches(imageFormat, (<FormattedMessage {...messages.validation.imageFormat} />)),
          })),*/
        })}
        render={({ isSubmitting, dirty, isValid, values }) => (
          <Form>
            <Grid columns="1">
              <Cell>
                <SelectField
                  fullWidth
                  name="clientType"
                  disabled={initialValueClient !== null}
                  hintText={<FormattedMessage {...messages.hintText.clientType} />}
                  floatingLabelText={<FormattedMessage {...messages.floatingLabelText.clientType} />}
                >
                  <MenuItem value={'PUBLIC'} primaryText="PUBLIC" />
                  <MenuItem value={'CREDENTIAL'} primaryText="CREDENTIAL" />
                </SelectField>
              </Cell>
              { values.clientType === 'CREDENTIAL' && <Cell>
                <TextField
                  fullWidth
                  name="clientSecret"
                  disabled={initialValueClient !== null}
                  hintText={<FormattedMessage {...messages.hintText.clientSecret} />}
                  floatingLabelText={<FormattedMessage {...messages.floatingLabelText.clientSecret} />}
                />
              </Cell>
              }
              <Cell>
                <TextField
                  fullWidth
                  name="clientId"
                  disabled={initialValueClient !== null}
                  hintText={<FormattedMessage {...messages.hintText.clientId} />}
                  floatingLabelText={<FormattedMessage {...messages.floatingLabelText.clientId} />}
                />
              </Cell>
              <Cell>
                <TextField
                  fullWidth
                  name="name"
                  hintText={<FormattedMessage {...messages.hintText.name} />}
                  floatingLabelText={<FormattedMessage {...messages.floatingLabelText.name} />}
                />
              </Cell>
              <Cell>
                <TextField
                  fullWidth
                  name="appLaunchUrl"
                  hintText={<FormattedMessage {...messages.hintText.appLaunchUrl} />}
                  floatingLabelText={<FormattedMessage {...messages.floatingLabelText.appLaunchUrl} />}
                />
              </Cell>
              <Cell>
                <TextField
                  fullWidth
                  name="redirectUri"
                  hintText={<FormattedMessage {...messages.hintText.redirectUri} />}
                  floatingLabelText={<FormattedMessage {...messages.floatingLabelText.redirectUri} />}
                />
              </Cell>
              <Cell>
                <TextField
                  fullWidth
                  name="scope"
                  hintText={<FormattedMessage {...messages.hintText.scopes} />}
                  floatingLabelText={<FormattedMessage {...messages.floatingLabelText.scopes} />}
                />
              </Cell>
              <Cell>
                <FileInputComponentField
                  name="appIcon"
                  labelText="App Logo"
                  accept="image/*"
                  imageStyle={{ width: 150, height: 150 }}
                  buttonComponent={<StyledRaisedButton> Select Image </StyledRaisedButton>}
                />
              </Cell>
              <Cell>
                <StyledRaisedButton
                  type="submit"
                  disabled={!dirty || isSubmitting || !isValid}
                >
                  <FormattedMessage {...messages.saveButton} />
                </StyledRaisedButton>
                <StyledFlatButton type="reset" onClick={handleCloseDialog}>
                  <FormattedMessage {...messages.cancelButton} />
                </StyledFlatButton>
              </Cell>
            </Grid>
          </Form>
        )}
      />
    </div>
  );
}

ManageClientForm.propTypes = {
  initialValues: PropTypes.shape({
    clientId: PropTypes.string,
    clientType: PropTypes.string,
  }),
  handleCloseDialog: PropTypes.func.isRequired,
  onSaveClient: PropTypes.func.isRequired,
};

export default ManageClientForm;

