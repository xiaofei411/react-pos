import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';

import View from './View';
import { getUser, createUser, updateUser, getUserList, searchUser, addBalance, redeemBalance } from 'actions/user';
import Payments from 'components/widgets/Payments/Payments';
import CreateUser from 'components/modals/CreateUser';
import { show as showModal } from 'actions/modal';
import modals from 'components/modals';
import * as currentPlayerSelectors from 'data/selectors/currentPlayer';
import { USER as UserActionTypes } from 'actions';
import * as authUserInfoSelectors from 'data/selectors/auth';
import * as employeeSelector from 'data/selectors/currentEmployee';
import { getAdminTransactionsList, getCashierTransactionsList } from 'actions/employee';
import { getWindowData } from 'data/selectors/window';
import { dateToUTC } from 'data/services/dateFormater';

class Dashboard extends Component {

  componentDidMount() {
    const { showModal, dispatch } = this.props;

    showModal(modals.PAYMENTS_MAIN);
    this.getEmployeeTransactionsList();
  }

  getEmployeeTransactionsList = () => {
    const { dispatch, authUserInfo } = this.props;

    const dateFrom = moment().format('L') + " 05:00";
    const dateTo = moment().add(1, 'days').format('L') + " 05:00";

    const data = {
      from: dateToUTC(dateFrom),
      to: dateToUTC(dateTo),
      page: 1,
      number: 10
    }    

    if (authUserInfo.accountType) {
      dispatch(getCashierTransactionsList(data));
  
    } else {
      dispatch(getAdminTransactionsList(data));
    }    
  }

  render() {
    const { currentUser, authUserInfo, transactions, showModal, transactionList, isUserFetching } = this.props;
    
    const lastTransactions = transactionList.slice(0,10);

    return ([
      <Payments
        key="0"
        {...this.props}
        updateEmployeeTransactions={() => this.getEmployeeTransactionsList()}
        cashierName={authUserInfo.accountName}
        storeName={authUserInfo.storeLabel}
      />,
      <CreateUser
        key="5m"
        id={modals.USER_CREATE} />,

      <View
        key="1"
        transactions={lastTransactions}
        currentUser={currentUser}
        authUserInfo={authUserInfo}
        showPaymentsModal={() => showModal(modals.PAYMENTS_MAIN)}
        getEmployeeTransactionsList={this.getEmployeeTransactionsList}
        isUserFetching={isUserFetching}
        isMobile={this.props.windowData.isMobile} />
    ])
  }
}

export default connect(

  state => ({
    currentUser: currentPlayerSelectors.getInfo(state) || {},
    authUserInfo: authUserInfoSelectors.authUserInfo(state) || {},
    transactionList: employeeSelector.getTransactionList(state),
    isUserFetching: employeeSelector.isFetching(state),
    windowData: getWindowData(state)
  }),

  dispatch => ({
    dispatch,
    showModal: modalName => dispatch(showModal(modalName))
  })

)(Dashboard);
