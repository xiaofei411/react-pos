import React, { Component } from 'react';
import { Button, Alert } from 'reactstrap';
import numeral from 'numeral';

import CustomerDetailsPrint from "components/widgets/CustomerDetails/CustomerDetailsPrint";
import ReactToPrint from "react-to-print";

import CustomCard from 'components/widgets/CustomCard/CustomCard';
import FontIcon from 'components/widgets/FontIcon/FontIcon';
import PaymentsHeader from 'components/modals/PaymentsMain/PaymentsHeader';

import modals from 'components/modals';
import baseHoc from './hoc';
import * as currentUserSelector from 'data/selectors/currentPlayer';

class PaymentSold extends Component {
  static defaultProps = {
    userBalance: 0
  };

  render() {
    const {
      userBalance,
      user,
      paymentAmount,
      paymentMode,
      paymentInetTime,
      comps
    } = this.props;

    return (
      <CustomCard
        mainClass="mb-0"
        header={{
          title: "Payments",
          secondTitle: <PaymentsHeader user={user} userAvailable={true} />,
          class: "justify-content-between"
        }}
      >
        <Alert color="success" className="m-3">
          <h2>Transaction Complete: {user.firstName} {user.lastName}, {user.playerNumber}</h2>
          <p className="text-center mt-4">
            Promo credits: <strong>{numeral(comps).format("$0,0.00")}</strong>
          </p>
        </Alert>
        <div className="text-center mb-3">
          <Button
            color="success"
            size="lg"
            className="p-3 mr-2"
            onClick={() => this.props.showModal(modals.PAYMENTS_MAIN)}>
            OK
          </Button>
          <ReactToPrint
            trigger={() => (
              <Button
                color="primary"
                size="lg"
                className="p-3"
                >
                <FontIcon className="fa-print mr-2" />
                Print Receipt
              </Button>
            )}
            content={() => this.componentRef}
          />
          <div className="print">
            <CustomerDetailsPrint
              {...this.props}
              player={user}
              amount={paymentAmount}
              ref={el => (this.componentRef = el)}
            />
          </div>
        </div>
      </CustomCard>
    );
  }
}

const mapState = state => {
  return {
    user: currentUserSelector.getInfo(state) || {},
  };
};

export default baseHoc(PaymentSold, mapState);