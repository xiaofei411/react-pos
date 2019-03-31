import React, { Component } from "react";
import numeral from 'numeral';
import moment from 'moment';

class ReportsPrint extends Component {
  render() {
    const { data } = this.props;

    const printStyles = {
      printWrapper: {
        width: '300pt',
        padding: '10pt',
        textAlign: 'center',
        margin: '10pt'
      },
      reportsDate: {fontSize: '25pt'},
      reportsDateTitle: {
        width: '25%',
        textAlign: 'left'
      },
      reportsDateVal: {
        width: '60%',
        textAlign: 'right'
      },
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
        *********************************
        <p style={{
          ...printStyles.reportsDate,
          ...printStyles.sapaseBetween
        }}>
          <span style={printStyles.paymentTitle}>
            From:
          </span>
          <strong>
            {data.dateFrom}
          </strong>
        </p>
        <p style={{
          ...printStyles.reportsDate,
          ...printStyles.sapaseBetween
        }}>
          <span style={printStyles.reportsDateTitle}>
            To:
          </span>
          <strong style={printStyles.reportsDateVal}>
            {data.dateTo}
          </strong>
        </p>
        <div style={printStyles.paymentBlock}>
          <p style={printStyles.sapaseBetween} >
            <span style={printStyles.paymentTitle}>
              Total sales after cancels deductions:
            </span>
            <strong style={printStyles.paymentSum}>
              {numeral(data.totalSales).format("$0,0.00")}
            </strong>
          </p>
          <p style={printStyles.sapaseBetween} >
            <span style={printStyles.paymentTitle}>
              Winnings paid:
            </span>
            <strong style={printStyles.paymentSum}>
              {numeral(data.winnings).format("$0,0.00")}
            </strong>
          </p>
          <p style={printStyles.sapaseBetween} >
            <span style={printStyles.paymentTitle}>
              Promo credits:
            </span>
            <strong style={printStyles.paymentSum}>
              {numeral(data.comps).format("$0,0.00")}
            </strong>
          </p>
          <p style={printStyles.sapaseBetween} >
            <span style={printStyles.paymentTitle}>
              Total Cancels:
            </span>
            <strong style={printStyles.paymentSum}>
                {numeral(data.cancels).format("$0,0.00")}
            </strong>
          </p>
        </div>
        <div>
          <p>
            Cashier: {data.cashierName}
          </p>
          <p>
            Store: {data.storeName}
          </p>
          <p>
              Date: {moment().format('L')} Time: {moment().format('LT')}
          </p>
        </div>
      </div>
    );
  }
}

export default ReportsPrint;