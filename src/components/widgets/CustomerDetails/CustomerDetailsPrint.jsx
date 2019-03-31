import React, { Component } from "react";
import numeral from 'numeral';
import moment from 'moment';
import { __oneCoinPrice as coinPrice } from 'components/modals/PaymentsMain/PaymentsMain';
import Cashiers from '../../../views/Cashiers/Cashiers';

class CustomerDetailsPrint extends Component {
  render() {
    const {
      player,
      paymentMode,
      paymentAmount,
      amount,
      paymentInetTime,
      comps,
      cashierName,
      storeName
    } = this.props;
   
    const operationType = {
      'add': 'PURCHASE',
      'withdraw': 'REDEEM',
      'none': '************',
      'comps': 'COMPS'
    }

    const compsPrice = 10;

    const currentOperationType = paymentMode === 'comps' && paymentAmount ? operationType['add'] : operationType[paymentMode]; 

    const printStyles = {
      printWrapper: {
        width: '300pt',
        padding: '10pt',
        textAlign: 'center',
        margin: '10pt'
      },
      playerId: {fontSize: '40pt'},
      sapaseBetween: {
        display: 'flex',
        justifyContent: 'space-between',
      },
      paymentBlock: {
        fontSize: '20pt',
        borderTop: '2pt solid #000',
        borderBottom: '2pt solid #000',
      },
      paymentTitle: {
        width: '55%',
        textAlign: 'left'
      },
      paymentSum: {
        width: '35%',
        textAlign: 'right'
      }
    }

    return (

      <div style={printStyles.printWrapper}>
        <h1>Royal Eagle</h1>
        <p>Play anywhere - www.amazing777.com</p>
        <p>************{currentOperationType}************</p>
        <h3>
          Customer ID:
          <br/>
          <strong style={printStyles.playerId}>{player.playerNumber}</strong>
        </h3>
        <div style={printStyles.paymentBlock}>
          {paymentMode === 'none'
            ? <p style={printStyles.sapaseBetween} >
                <span style={printStyles.paymentTitle}>
                  Internet time:
                </span>
                <strong style={printStyles.paymentSum}>
                  {numeral(player.freeEntries).format("00:00:00")}
                </strong>
              </p>
            : <p style={printStyles.sapaseBetween}>
                <span style={printStyles.paymentTitle}>
                  Amount:
                </span>
                <strong style={printStyles.paymentSum}>
                  {numeral(amount).format("$0,0.00")}
                </strong>
              </p>
          }
          {paymentMode != 'none' && paymentMode != 'withdraw' ?
            <p style={printStyles.sapaseBetween}>
              <span style={printStyles.paymentTitle}>Internet Time Added:</span>
              <strong style={printStyles.paymentSum}>
                {paymentMode === "comps" ? paymentInetTime * compsPrice : paymentInetTime} min.
              </strong>
            </p>
            : ""
          }
          <p style={printStyles.sapaseBetween}>
            <span style={printStyles.paymentTitle}>
              Comps:
            </span>
            <strong style={printStyles.paymentSum}>
              {numeral(comps).format("$0,0.00")}
            </strong>
          </p>
          <p style={printStyles.sapaseBetween}>
            <span style={printStyles.paymentTitle}>
              Free Entries:
            </span>
            <strong style={printStyles.paymentSum}>
              {player.freeEntries}
            </strong>
          </p>
          <p style={printStyles.sapaseBetween}>
            <span style={printStyles.paymentTitle}>
              Winning balance:
            </span>
            <strong style={printStyles.paymentSum}>
              {numeral(player.winPoints / coinPrice).format("$0,0.00")}
            </strong>
          </p>
        </div>
        <div>
          {cashierName &&
            <p>
              Cashier: {cashierName}
            </p>
          }
          {storeName &&
            <p>
              Store: {storeName}
            </p>
          }
          <p>
              Date: {moment().format('L')} Time: {moment().format('LT')}
          </p>
        </div>
      </div>
    );
  }
}

export default CustomerDetailsPrint;