import React from 'react';
import moment from 'moment';

import PaymentsMainModal from 'components/modals/PaymentsMain/PaymentsMain';
import PaymentConfirmationModal from 'components/modals/PaymentConfirmation';
import CancelTransactionConfirmation from 'components/modals/CancelTransactionConfirmation'
import PaymentSold from 'components/modals/PaymentSold';
import PaymentCredits from 'components/modals/PaymentCredits';
import PaymentsCreditSuccess from 'components/modals/PaymentsCreditSuccess';
import modals from 'components/modals';
import { USER as UserActionTypes } from 'actions';
import { getUser, addBalance, redeemBalance, addComps, getUserTransactionsList } from 'actions/user';
import auth from "../../../config/api/endpoints";

const __PAYMENT_MODE = {
  withdraw: "withdraw",
  add: "add",
  comps: "comps"
};



class Payments extends React.Component {

  state = {
    paymentMode: __PAYMENT_MODE.add,
    paymentAmount: 0,
    paymentInetTime: 0,
    comps: 0,
    paymentDone: false,
    paymentStart: false,
    paymentAgreed: false,
  };

  onPaymentSubmit = model => {
    this.setState({
      ...model
    });
  };

  clearState = () => {
    this.setState({
      paymentMode: __PAYMENT_MODE.add,
      paymentAmount: 0,
      paymentInetTime: 0,
      comps: 0,
      paymentDone: false,
      paymentStart: false,
      paymentAgreed: false,
    });
  }

  updateUserTransactions = id => {
    this.props.dispatch(getUserTransactionsList({
      playerId: id,
      from: moment().subtract(1, 'year').format('L')  + " 05:00",
      to: moment().add(1, 'days').format('L') + " 05:00",
      page: 1,
      number: 10
    }));
  }

  onPaymentAgreed = () => {
    let self = this;
    const { dispatch, currentUser, showModal } = self.props;
    const mode = self.state.paymentMode;
    
    const payModel = {
      playerNum: currentUser.playerNumber,
      amount: mode === __PAYMENT_MODE.comps ? parseInt(self.state.comps) : parseInt(self.state.paymentAmount)
    };

    if (self.state.paymentAgreed) {
      return
    }

    this.setState({
      paymentAgreed: true,
    })

    if (mode === __PAYMENT_MODE.add) {
      
      return dispatch(addBalance(payModel))
        .then(
          ({ type }) => {
            if (type === UserActionTypes.USER_ADD_BALANCE_OK) {
              showModal(modals.PAYMENTS_SOLD);
              self.setState({
                paymentDone: true,
                paymentStart: false,
                paymentAgreed: true
              });
              
              return dispatch(getUser({
                playerNum: currentUser.playerNumber
              }))
                .then(
                  () => {
                    if (this.props.updateEmployeeTransactions) {
                      return this.props.updateEmployeeTransactions()
                    }
                    this.updateUserTransactions(currentUser.playerId)
                  }
                );
            }

            showModal(modals.PAYMENTS_MAIN);
            self.setState({ paymentDone: false, paymentStart: false })
          }
        );
    } 
    
    if (mode === __PAYMENT_MODE.comps) {
      
      return dispatch(addComps({...payModel, isComps: true}))
        .then(
          ({ type }) => {
            if (type === UserActionTypes.USER_ADD_COMPS_OK) {
              showModal(modals.PAYMENTS_CREDIT_SUCCESS);
              self.setState({ paymentDone: true, paymentStart: false });

              return dispatch(getUser({
                playerNum: currentUser.playerNumber
              }))
                .then(
                  () => {
                    if (this.props.updateEmployeeTransactions) {
                      return this.props.updateEmployeeTransactions()
                    }
                    this.updateUserTransactions(currentUser.playerId)
                  }
                );
            }

            showModal(modals.PAYMENTS_MAIN);
            self.setState({ paymentDone: false, paymentStart: false });
          }
        );
    }

    return dispatch(redeemBalance(payModel))
      .then(
        ({ type }) => {
          if (type === UserActionTypes.USER_REDEEM_BALANCE_OK) {
            showModal(modals.PAYMENTS_SOLD);
            self.setState({
              paymentDone: true,
              paymentStart: false,
              paymentAgreed: true
            });

            return dispatch(getUser({
              playerNum: currentUser.playerNumber
            }))
              .then(
                () => {
                  if (this.props.updateEmployeeTransactions) {
                    return this.props.updateEmployeeTransactions()
                  }
                  this.updateUserTransactions(currentUser.playerId)
                }
              );
          }

          showModal(modals.PAYMENTS_MAIN);
          self.setState({ paymentDone: false, paymentStart: false });
        }
      );
  }

  onPaymentRefused = () => {
    this.props.showModal(modals.PAYMENTS_MAIN);
  }

  onTransactionCancel = (transactionId) => {
    const { currentUser, showModal } = this.props;

    showModal("hidden");

    const requestObject = {
        "ActionName": "BitGlu.Slots2.Actions.POS.CancelTransaction",
        "InParameters": {
            "PlayerId": currentUser.playerId,
            "TransactionId": transactionId
        }
    };

    const data = JSON.parse(localStorage.getItem("authToken"));
    const token = data.token.access_token;

    fetch(auth.actions.execute, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(requestObject)
    })
    .then(response => response.json())
    .then(json => json.outParameters.cantCancel
      ? alert(json.outParameters.cantCancel)
      : this.refreshUserAndTransactions())
    .catch(err => {
      console.warn('Failed to cancel transaction ' + err);
      alert('Failed to cancel transaction');
    });
  };

  refreshUserAndTransactions = () => {
    const { currentUser, dispatch } = this.props;

    dispatch(getUser({
      playerNum: currentUser.playerNumber
    }))
    .then(() => {
      if (this.props.updateEmployeeTransactions) {
        return this.props.updateEmployeeTransactions();
      }
      this.updateUserTransactions(currentUser.playerId);
    });
  };

  onTransactionCancelRefuse = () => {
    this.props.showModal("hidden")
  };

  render() {
    const { showModal, currentUser, cashierName, storeName } = this.props;

    return ([
      <PaymentsMainModal
        key="0m"
        id={modals.PAYMENTS_MAIN}
        showModal={showModal}
        paymentModes={__PAYMENT_MODE}
        user={currentUser}
        onSubmit={this.onPaymentSubmit}
        clearState={this.clearState}
        isPaymentStart={this.state.paymentStart} />,

      <PaymentConfirmationModal
        key="1m"
        id={modals.PAYMENTS_CONFIRM}
        showModal={showModal}
        user={currentUser}
        {...this.state}
        onAgree={this.onPaymentAgreed}
        onRefuse={this.onPaymentRefused} />,

      <PaymentSold
        key="2m"
        id={modals.PAYMENTS_SOLD}
        showModal={showModal}
        user={currentUser}
        cashierName={cashierName}
        storeName={storeName}
        clearState={this.clearState}
        {...this.state} />,

      <PaymentCredits
        key="3m"
        id={modals.PAYMENTS_CREDITS}
        showModal={showModal}
        user={currentUser}
        {...this.state}
        paymentModes={__PAYMENT_MODE}
        onSubmit={this.onPaymentSubmit}
        isPaymentStart={this.state.paymentStart}
        onAgree={this.onPaymentAgreed} />,

      <PaymentsCreditSuccess
        key="4m"
        id={modals.PAYMENTS_CREDIT_SUCCESS}
        showModal={showModal}
        user={currentUser}
        cashierName={cashierName}
        storeName={storeName}
        {...this.state}/>,

      <CancelTransactionConfirmation
        key="5m"
        id={modals.CANCEL_TRANSACTION_CONFIRM}
        currentUser={currentUser}
        onAgree={this.onTransactionCancel}
        onRefuse={this.onTransactionCancelRefuse} />
    ]);
  }
}

Payments.defaultProps = {

};

Payments.propTypes = {

};

export default Payments;
