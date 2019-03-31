import React, { Component } from 'react';
import PropTypes from 'prop-types';

import View from './View';
import baseHoc from 'components/modals/hoc';
import { getUser, searchUser, disposeUsersList } from 'actions/user';
import { formValueSelector, change as changeFieldValue, touch as touchFormField } from 'redux-form';
import { formName as inetFormName } from 'components/forms/InternetTimeCalc';
import { formName as redeemFormName } from 'components/forms/RedeemWinnings';
import * as usersSelector from 'data/selectors/players';
import modals from 'components/modals';
import * as currentPlayerSelector from 'data/selectors/currentPlayer';
import { getWindowData } from 'data/selectors/window';

const __oneDollarPrice = 12;
export const __oneCoinPrice = 100;

class PaymentsMain extends Component {
  static defaultProps = {
    userBalance: 0,
    internetTimeButtons: [
      {
        text: '+ $',
        value: 1,
        label: `${__oneDollarPrice} min`
      },
      {
        text: '+ $',
        value: 5,
        label: '60 min'
      },
      {
        text: '+ $',
        value: 10,
        label: '120 min'
      },
      {
        text: '+ $',
        value: 20,
        label: '240 min'
      },
      {
        text: '+ $',
        value: 50,
        label: '600 min'
      },
      {
        text: '+ $',
        value: 100,
        label: '1200 min'
      },
    ],
    redeemWinningButtons: [
      {
        text: '- $',
        value: 1,
      },
      {
        text: '- $',
        value: 5,
      },
      {
        text: '- $',
        value: 10,
      },
      {
        text: '- $',
        value: 20,
      },
      {
        text: '- $',
        value: 100,
      },
      {
        text: '- $',
        value: 200,
      },
    ]
  };

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    paymentModes: PropTypes.object.isRequired
  };

  state = {
    showSearchResults: false
  };

  componentDidMount() {
    this.props.clearState();
  }

  onSearchTermChanged = model => {
    if (!model.term || model.term.trim().length < 1)
      this.props.dispatch(disposeUsersList());

    this.props.dispatch(
      searchUser({
        term: model.term,
        page: 1,
        number: 1000
      })
    ).then(() => {
      this.setState({ showSearchResults: true });
    });
  }

  onInternetTimeTmplBtnClick = e => {
    // console.log("onInternetTimeTmplBtnClick: ", e.target.value);
    if (e) e.preventDefault();
    this.props.dispatch(changeFieldValue(inetFormName, "amount", e.target.value));
    this.props.dispatch(touchFormField(inetFormName, "amount"));
  }

  onRedeemTmplBtnClick = e => {
    // console.log("onReedemTmplBtnClick: ", e.target.value);
    const value = e.target.value;
    if (e) e.preventDefault();
    this.props.dispatch(changeFieldValue(redeemFormName, "amount", value));
    this.props.dispatch(touchFormField(redeemFormName, "amount"));
  }

  onPaymentSubmit = (e, mode) => {
    if (e) e.preventDefault();
    const { onSubmit, showModal, paymentModes, redeemFormAmount, inetFormAmount } = this.props;

    let amount = mode === paymentModes.withdraw
      ? redeemFormAmount * __oneCoinPrice
      : inetFormAmount;

    onSubmit({
      paymentMode: mode,
      paymentAmount: amount,
      paymentInetTime: amount * __oneDollarPrice,
      paymentStart: true,
    });

    showModal(modals.PAYMENTS_CONFIRM);
  }

  onPlayerSelect = playerNumber => {
    this.props.dispatch(getUser({
      playerNum: playerNumber
    })).then(() => {
      this.setState({ showSearchResults: false });
    });
  }

  onPlayerUpdate = playerNumber => {
    this.props.dispatch(getUser({
      playerNum: playerNumber
    }))
  }

  render() {
    const actionHandlers = {
      onSearchTermChanged: this.onSearchTermChanged,
      onInternetTimeTmplBtnClick: this.onInternetTimeTmplBtnClick,
      onRedeemTmplBtnClick: this.onRedeemTmplBtnClick,
      onPaymentSubmit: this.onPaymentSubmit,
      onPlayerSelect: this.onPlayerSelect,
      onPlayerUpdate: this.onPlayerUpdate
    };

    return (
      <View
        {...this.props}
        showSearchResults={this.state.showSearchResults}
        actionHandlers={actionHandlers}
        coinPrice={__oneCoinPrice}
        isMobile={this.props.windowData.isMobile}
        isPaymentStart={this.props.isPaymentStart}
      />
    );
  }
}

const mapState = state => {
  let inetTimeFormSelector = formValueSelector(inetFormName);
  let redeemFormSelector = formValueSelector(redeemFormName);
  const showSearchResults = state.form.SearchUsersForm ? state.form.SearchUsersForm.submitSucceeded : false

  return {
    inetFormAmount: inetTimeFormSelector(state, 'amount'),
    redeemFormAmount: redeemFormSelector(state, 'amount'),
    users: usersSelector.getList(state),
    showSearchResults,
    isPlayerFetching: currentPlayerSelector.isFetching(state),
    windowData: getWindowData(state)
  };
};

export default baseHoc(PaymentsMain, mapState);