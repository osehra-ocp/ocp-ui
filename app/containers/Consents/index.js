/**
 *
 * Consents
 *
 */

import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Cell, Grid } from 'styled-css-grid';
import isEqual from 'lodash/isEqual';

import { DEFAULT_START_PAGE_NUMBER, PATIENT_ROLE_CODE } from 'containers/App/constants';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import ConsentTable from 'components/ConsentTable';
import StyledRaisedButton from 'components/StyledRaisedButton';
import makeSelectConsents from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';
import { getConsents, initializeConsents } from './actions';

export class Consents extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static initalState = {
    relativeTop: 0,
    isShowSearchResult: false,
    listConsents: {
      currentPage: 1,
    },
  };

  constructor(props) {
    super(props);
    this.state = {
      ...Consents.initalState,
    };
    this.handleListPageClick = this.handleListPageClick.bind(this);
    this.onSize = this.onSize.bind(this);
  }

  componentDidMount() {
    this.props.getConsents({
      pageNumber: DEFAULT_START_PAGE_NUMBER,
    });
  }

  componentWillReceiveProps(nextProps) {
    const { consent } = this.props;
    const { consent: newConsent } = nextProps;
    if (!isEqual(consent, newConsent)) {
      this.props.initializeConsents([newConsent]);
      this.setState({ ...Consents.initalState });
    }
  }

  onSize(size) {
    this.setState({ relativeTop: size.height });
  }

  handleListPageClick(currentPage) {
    this.props.getConsents({ pageNumber: currentPage });
  }

  render() {
    const { consents } = this.props;
    const consentData = {
      loading: consents.listConsents.loading,
      data: consents.listConsents.data,
      currentPage: consents.listConsents.currentPage,
      totalNumberOfPages: consents.listConsents.totalNumberOfPages,
      currentPageSize: consents.listConsents.currentPageSize,
      totalElements: consents.listConsents.totalElements,
      handlePageClick: this.handleListPageClick,
    };

    return (
      <Grid columns={1} gap="20px">
        <Cell center>
          <StyledRaisedButton component={Link} to="/ocp-ui/manage-consent">
            <FormattedMessage {...messages.buttonLabelCreateNew} />
          </StyledRaisedButton>
        </Cell>
        <Cell>
          <ConsentTable
            relativeTop={this.state.relativeTop}
            consentData={consentData}
            allowedAttestConsentRoles={PATIENT_ROLE_CODE}
          />
        </Cell>
      </Grid>
    );
  }
}

Consents.propTypes = {
  initializeConsents: PropTypes.func.isRequired,
  consent: PropTypes.object,
  getConsents: PropTypes.func.isRequired,
  consents: PropTypes.shape({
    listConsents: PropTypes.shape({
      loading: PropTypes.bool.isRequired,
      currentPage: PropTypes.number.isRequired,
      totalNumberOfPages: PropTypes.number.isRequired,
      currentPageSize: PropTypes.number,
      totalElements: PropTypes.number,
      data: PropTypes.array,
      error: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object,
        PropTypes.bool,
      ]),
    }),
  }),
};

const mapStateToProps = createStructuredSelector({
  consents: makeSelectConsents(),
});

function mapDispatchToProps(dispatch) {
  return {
    initializeConsents: (consents) => dispatch(initializeConsents(consents)),
    getConsents: (query) => dispatch(getConsents(query)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'consents', reducer });
const withSaga = injectSaga({ key: 'consents', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Consents);
