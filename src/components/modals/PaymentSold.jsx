import React, { Component } from 'react';
import { Button, Alert } from 'reactstrap';
import numeral from 'numeral';

import CustomCard from 'components/widgets/CustomCard/CustomCard';
import FontIcon from 'components/widgets/FontIcon/FontIcon';
import PaymentsHeader from 'components/modals/PaymentsMain/PaymentsHeader';
import CustomerDetailsPrint from "components/widgets/CustomerDetails/CustomerDetailsPrint";
import ReactToPrint from "react-to-print";

import modals from 'components/modals';
import baseHoc from './hoc';

class PaymentSold extends Component {
  static defaultProps = {
    userBalance: 0
  };

  goToCredits = () => {
    this.props.clearState();
    this.props.showModal(modals.PAYMENTS_CREDITS);
  }

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
      comps,
      cashierName
    } = this.props;

    const amount = paymentMode === 'add' ? paymentAmount : paymentAmount/100;

    return (
      <CustomCard
        mainClass="mb-0"
        header={{
          title: "Payments",
          secondTitle: <PaymentsHeader user={user} userAvailable={true} />,
          class: "justify-content-between"
        }}>
        <Alert color="success" className="m-3">
          {paymentMode === 'add'
            ?
            <p className="text-center">
              You haved sold <strong>{numeral(amount).format("$0,0.00")}</strong> to customer <strong>{user.playerLabel}</strong>
            </p>
            :
            <p className="text-center">
              Customer <strong>{user.playerLabel}</strong> redeemed <strong>{numeral(amount).format("$0,0.00")}</strong> dollars
            </p>
          }
        </Alert>
        <div className="text-center mb-3">
          {paymentMode !== 'withdraw' &&
            <Button
              color="light"
              size="lg"
              className="p-3 mr-3 mobile_mt-2"
              onClick={this.goToCredits}>
              <FontIcon className="fa-gift mx-1" />
              Promo credits
            </Button>
          }
          <Button
            color="success"
            size="lg"
            className="p-3 mr-3 mobile_mt-2"
            onClick={() => showModal("hidden")}
            >
            <FontIcon className="fa-close mr-1"/>
            Close
          </Button>
          <ReactToPrint
            trigger={() => (
              <Button
                color="primary"
                size="lg"
                className="p-3 mobile_mt-2"
                >
                <FontIcon className="fa-print mr-2" />
                Print Receipt
              </Button>
            )}
            content={() => this.componentRef}
          />
        </div>
        <div className="print">
          <CustomerDetailsPrint
            {...this.props}
            amount={amount}
            player={user}
            cashierName={cashierName}
            ref={el => (this.componentRef = el)}
          />
        </div>
      </CustomCard>
    );
  }
}

export default baseHoc(PaymentSold);