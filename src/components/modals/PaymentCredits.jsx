import React, { Component } from 'react';
import { Button, Alert } from 'reactstrap';

import { formValueSelector, change as changeFieldValue, touch as touchFormField, getFormSyncErrors } from 'redux-form';
import { formName as promoFormName } from 'components/forms/PromoCredits';
import * as currentUserSelector from 'data/selectors/currentPlayer';

import CustomCard from 'components/widgets/CustomCard/CustomCard';
import FontIcon from 'components/widgets/FontIcon/FontIcon';
import CalculatorWrapper from 'components/widgets/Calculator/CalculatorWrapper';
import PromoCredits from 'components/forms/PromoCredits';
import PaymentsHeader from 'components/modals/PaymentsMain/PaymentsHeader';

import modals from 'components/modals';
import baseHoc from './hoc';


class PaymentsMain extends Component {
  static defaultProps = {
    userBalance: 0
  };

  onPromoCreditsBtnClick = e => {
    if (e) e.preventDefault();

    const inputValue = !this.props.promoCreditsAmount || this.props.promoCreditsAmount === '0' ? '' : this.props.promoCreditsAmount;
    const btnValue = e.target.value;
    const settedValue = inputValue + btnValue;

    this.props.dispatch(changeFieldValue(promoFormName, "amount", settedValue));
    this.props.dispatch(touchFormField(promoFormName, "amount"));
  }

  onConfirm = (e, mode) => {
    if (e) e.preventDefault();
    const { onSubmit, showModal, promoCreditsAmount } = this.props;

    onSubmit({
      paymentMode: mode,
      paymentInetTime: promoCreditsAmount,
      comps: promoCreditsAmount,
      paymentStart: true,
    });

    showModal(modals.PAYMENTS_CONFIRM);
  }

  render() {
    const { isPromoCreditsValid, user, paymentModes, isPaymentStart } = this.props;

    const promoCreditsButtons = [
      {
        value: 1,
      },
      {
        value: 2,
      },
      {
        value: 3,
      },
      {
        value: 4,
      },
      {
        value: 5,
      },
      {
        value: 6,
      },
      {
        value: 7,
      },
      {
        value: 8,
      },
      {
        value: 9,
      },
      {
        value: 0,
      },
    ];
    
    const isSubmitAllow = isPromoCreditsValid.amount || isPaymentStart ? true : false;
    
    return (
      <CustomCard
        mainClass="mb-0"
        header={{
          title: "Payments",
          secondTitle: <PaymentsHeader user={user} userAvailable={true} />,
          class: "justify-content-between"
        }}
      >
        <div className="d-flex justify-content-between p-3">
          <Button
            color="primary"
            onClick={() => this.props.showModal(modals.PAYMENTS_MAIN)}
            size="lg">
            <FontIcon className="fa-arrow-circle-left mx-1" />
            Back
          </Button>
        </div>
        <div className="d-flex flex-wrap justify-content-between px-3">
          <div className="pr-1 w-50 mobile_w-100">
            <h3>Assign Promo Credits to {user.firstName} {user.lastName}</h3>
            <h3>ID: {user.playerNumber} </h3>
            {/* <p>Promo credits history</p>
            <Alert color="warning" className="m-3">
              Customer already got promo credit today
            </Alert>
            <p>today: <strong>$</strong></p>
            <p>Last 7 days: $</p>
            <p>Last 30 days: $</p> */}
          </div>
          <div className="pl-1 w-50 mobile_w-100">

            <CalculatorWrapper
              name="Promo Credits"
              icon="fa-gift">

              <PromoCredits
                buttons={promoCreditsButtons}
                onTemplateButtonClick={(e) => this.onPromoCreditsBtnClick(e)}
              />
            </CalculatorWrapper>

          </div>
        </div>
        <div className="d-flex justify-content-end px-3 pb-3">
          <Button
            color="primary"
            onClick={e => this.onConfirm(e, paymentModes.comps)}
            disabled={isSubmitAllow}
            size="lg"
            className="p-3">
            Confirm
          </Button>
        </div>
      </CustomCard>
    );
  }
}

const mapState = state => {
  let promoCreditsSelector = formValueSelector(promoFormName);
  let promoCreditsErrors = getFormSyncErrors(promoFormName);

  return {
    promoCreditsAmount: promoCreditsSelector(state, 'amount'),
    isPromoCreditsValid: promoCreditsErrors(state, 'amount'),
  };
};

export default baseHoc(PaymentsMain, mapState);