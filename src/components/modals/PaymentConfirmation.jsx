import React, { Component } from 'react';
import { Button, Alert } from 'reactstrap';
import numeral from 'numeral';

import CustomCard from 'components/widgets/CustomCard/CustomCard';
import PaymentsHeader from 'components/modals/PaymentsMain/PaymentsHeader';
import modals from 'components/modals';
import baseHoc from './hoc';


class PaymentConfirmation extends Component {
  static defaultProps = {
    userBalance: 0
  };
  
  render() {
    const {
      user,
      paymentMode,
      PAYMENT_MODES,
      paymentAmount,
      paymentInetTime,
      showModal,
      onAgree,
      onRefuse,
      comps
    } = this.props;

    const amount = paymentMode === 'add' ? paymentAmount : paymentAmount/100;

    return (
      <CustomCard
        mainClass="mb-0"
        header={{
          title: "Payments",
          secondTitle: <PaymentsHeader user={user} userAvailable={true} />,
          class: "justify-content-between"
        }}
      >
        <Alert color="warning" className="m-3">
          <h1>Transaction Confirmation</h1>
          <p className="text-center">Amount: 
            <strong>
              {paymentMode === 'comps'
                ? numeral(comps).format("$0,0.00")
                : numeral(amount).format("$0,0.00")
              }
            </strong>
          </p>
          {paymentMode === 'add' 
            ? <p className="text-center">Internet time: <strong>{paymentInetTime} min</strong></p>
            : ""
          }
          <p className="text-center">Do you want to proceed? <strong>Beware that the transaction is not reversible.</strong></p>
          <div className="text-center">
            <Button
              color="light"
              type="button"
              onClick={onRefuse}
              size="lg"
              className="py-4 px-5 mr-5 mobile_mr-3"
            >
              No
            </Button>
            <Button
              color="primary"
              type="button"
              onClick={onAgree}
              size="lg"
              className="py-4 px-5"
            >
              Yes
            </Button>
          </div>
        </Alert>
      </CustomCard>
    );
  }
}

export default baseHoc(PaymentConfirmation);