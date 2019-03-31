import React, { Component } from 'react';
import { connect } from 'react-redux';

import View from './View';
import CreateCashier from 'components/modals/CreateCashier';
import UpdateCashier from 'components/modals/UpdateCashier/UpdateCashier';
import { show as showModal } from 'actions/modal';
import modals from 'components/modals';
import { getCachierList, searchCachier, getEmployee } from 'actions/employee';
import * as cashiersSelector from 'data/selectors/employee';
import { formValueSelector } from 'redux-form';
import { formName as searchFormName } from 'components/forms/SearchForm';
import { EMPLOYEE as employeeActionTypes } from 'actions';
import { indexPageName, getPathByPageName } from 'routes';
import { authUserInfo } from 'data/selectors/auth';

const __DEFAULT_CASHIERS_PER_PAGE = 10;

class Cashiers extends Component {

  isCachiersSearchMode = () =>
    typeof this.props.cashiersSearchFormTerm === typeof "typedef"
    && this.props.cashiersSearchFormTerm.length > 0;

  getCachiersList = (page, number) => this.props.dispatch(
    getCachierList({
      page,
      number
    })
  );

  searchCachiers = (term, page, number) => this.props.dispatch(
    searchCachier({
      term,
      page,
      number
    })
  );

  componentWillMount() {
    const { currentCashiersPage, cashiersPerPage, authUserInfo } = this.props;

    if (authUserInfo.accountType) {
      this.redirectNonAdmin();
      return
    }
    this.getCachiersList(1, __DEFAULT_CASHIERS_PER_PAGE);
  }

  redirectNonAdmin = () => this.props.history.replace(getPathByPageName(indexPageName));

  onCachiersPageChanged = page => {
    const { cashiersPerPage, cashiersSearchFormTerm } = this.props;

    return !this.isCachiersSearchMode() ?
      this.getCachiersList(page, cashiersPerPage) :
      this.searchCachiers(cashiersSearchFormTerm, page, cashiersPerPage);
  }

  onCachiersPerPageChanged = per => {
    const { cashiersSearchFormTerm } = this.props;

    return !this.isCachiersSearchMode() ?
      this.getCachiersList(1, per) :
      this.searchCachiers(cashiersSearchFormTerm, 1, per);
  }

  onSearchTermChanged = model => {
    const { dispatch, cashiersPerPage, currentCashiersPage } = this.props;

    if (!model.term || model.term.toString().trim().length == 0)
      return this.getCachiersList(currentCashiersPage, cashiersPerPage);

    this.searchCachiers(model.term, currentCashiersPage, cashiersPerPage);
  };

  showModal = modalName => this.props.dispatch(showModal(modalName));

  showUpdateCashierModal = cashierName => {
    const { dispatch } = this.props;

    dispatch(getEmployee({
      username: cashierName
    }))
      .then(
        ({ type }) => {
          if (type === employeeActionTypes.EMP_GET_OK) {
            dispatch(showModal(modals.CASHIER_UPDATE))
          }
        }
      );
  }

  render() {
    const { currentCashiersPage, cashiersPerPage, cashiersTotalPages } = this.props;

    const cashiersTableActions = {
      onCachiersPageChanged: this.onCachiersPageChanged,
      onSearchTermChanged: this.onSearchTermChanged,
      onCachiersPerPageChanged: this.onCachiersPerPageChanged
    };

    const pagination = {
      page: currentCashiersPage,
      perPage: cashiersPerPage,
      totalPages: cashiersTotalPages
    };

    return ([
      <CreateCashier
        key="0m"
        id={modals.CASHIER_CREATE} />,
      <UpdateCashier
        key="1m"
        id={modals.CASHIER_UPDATE} />,

      <View
        {...this.props}
        key="1"
        cashiersTableActions={cashiersTableActions}
        pagination={pagination}
        showCreateCashierModal={() => this.showModal(modals.CASHIER_CREATE)}
        showUpdateCashierModal={cashierName => this.showUpdateCashierModal(cashierName)} />
    ])
  }
}

export default connect(

  state => {
    let searchFormSelector = formValueSelector(searchFormName);
    let searchFormVals = searchFormSelector(state, 'term');

    return {
      currentCashiersPage: cashiersSelector.getCurrentPage(state),
      cashiersPerPage: cashiersSelector.getPerPage(state),
      cashiersTotalPages: cashiersSelector.getTotalPages(state),
      cashiersSearchFormTerm: searchFormVals ? searchFormVals.term : undefined,
      cashiers: cashiersSelector.getList(state) || [],
      authUserInfo: authUserInfo(state),
    }
  },

  dispatch => ({
    dispatch
  })

)(Cashiers);
