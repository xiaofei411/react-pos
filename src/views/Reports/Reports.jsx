import React, { Component } from "react";
import { connect } from "react-redux";
import moment from 'moment';
import numeral from 'numeral';
import { EMPLOYEE as actionTypes } from 'actions';

import * as employeeSelector from 'data/selectors/currentEmployee';
import { getAdminSummary, getCashierSummary, getAdminTransactionsList, getCashierTransactionsList } from 'actions/employee';
import { authUserInfo } from 'data/selectors/auth';
import { getWindowData } from 'data/selectors/window';

import { show as showModal } from 'actions/modal';
import modals from 'components/modals';

import { dateToUTC } from 'data/services/dateFormater';

import View from "./View";

class Reports extends Component {
  state = {
    dateFrom: _reportsShortcuts[0].dateFrom,
    dateTo: _reportsShortcuts[0].dateTo,
    selectedTransaction: {},
  };

  componentWillMount() {
    this.getEmployeeSummary(this.state.dateFrom, this.state.dateTo)   
  }

  getEmployeeSummary = (dateFrom, dateTo) => {
    const { dispatch, employeeInfo } = this.props;

    if (employeeInfo.accountType) {
      dispatch(getCashierSummary({
        from: dateToUTC(dateFrom),
        to: dateToUTC(dateTo)
      }));
  
    } else {
      dispatch(getAdminSummary({
        from: dateToUTC(dateFrom),
        to: dateToUTC(dateTo)
      }));
    }    
  }

  getEmployeeTransactionsList = (dateFrom, dateTo, page, number) => {
    const { dispatch, employeeInfo } = this.props;

    return new Promise(function(resolve, reject) {

      if (employeeInfo.accountType) {
        dispatch(getCashierTransactionsList({
          from: dateToUTC(dateFrom),
          to: dateToUTC(dateTo),
          page,
          number
        }))
          .then(
            ({ type, payload }) => {
              if (type === actionTypes.EMP_GET_CACHIER_TRANSACTIONS_OK) {
                resolve(payload);
              }
            }
          )
    
      } else {
        dispatch(getAdminTransactionsList({
          from: dateToUTC(dateFrom),
          to: dateToUTC(dateTo),
          page,
          number
        }))
          .then(
            ({ type, payload }) => {
              if (type === actionTypes.EMP_GET_ADMIN_TRANSACTIONS_OK) {
                resolve(payload);
              }
            }
          )
      }
    })
  }

  onShortcutBtnClick = (dateFrom, dateTo) => {
    const { transactionsPerPage } = this.props;

    this.setState({
      dateFrom,
      dateTo
    });
    this.getEmployeeSummary(dateFrom, dateTo);
    this.getEmployeeTransactionsList(dateFrom, dateTo, 1, transactionsPerPage)
  }

  onTransactionsPageChanged = page => {
    const { transactionsPerPage } = this.props;
    const { dateFrom, dateTo } = this.state;

    return this.getEmployeeTransactionsList(dateFrom, dateTo, page, transactionsPerPage)
  }

  onTransactionsPerPageChanged = per => {
    const { dateFrom, dateTo } = this.state;

    return this.getEmployeeTransactionsList(dateFrom, dateTo, 1, per);
  }

  showModal = (modalName) => this.props.dispatch(showModal(modalName));
  
  findTransaction = (userId, date, time, type) => {
    const { transactionList } = this.props;

    return transactionList.find(transaction => {
      const currentDate = moment.utc(transaction.timestamp).local().format('L');
      const currentTime = moment.utc(transaction.timestamp).local().format('LT');

      if (transaction.playerNumber === userId && currentDate === date && currentTime === time && transaction.transactionType === type) {
        return transaction
      }
    })
  }

  showTransactionDetails = (userId, date, time, type) => {
    const transactionDetails = this.findTransaction(userId, date, time, type);

    this.setState({
      selectedTransaction: transactionDetails
    });
    this.showModal(modals.TABLE_DETAILS);
  }

  render() {
    const { dateFrom, dateTo } = this.state;
    const {
      summary,
      transactionList,
      currentTransactionsPage,
      transactionsPerPage,
      transactionsTotal,
      windowData,
      employeeInfo
    } = this.props;

    const totalCancels = summary.totalCancels
      ? summary.totalCancels
      : 0;

    const totalCompCancels = summary.totalCompCancels
      ? summary.totalCompCancels
      : 0;

    const totalSales = (summary.totalSales
      ? summary.totalSales
      : 0)
    - totalCancels;

    const totalComps = (summary.totalComps
      ? summary.totalComps
      : 0)
    - totalCompCancels;

    const reportsResults = [
      {
        id: "0",
        string: "TOTAL SALES after cancels deduction",
        value: totalSales
      },
      {
        id: "1",
        string: "WINNINGS PAID",
        value: summary.totalRedeem
      },
      {
        id: "2",
        string: "PROMO CREDITS",
        value: totalComps
      },
      {
        id: "3",
        string: "TOTAL CANCELS",
        value: totalCancels,
      }
    ];

    const reportsData = { 
      shortcuts: _reportsShortcuts,
      results: reportsResults,
      date: {
        from: dateFrom,
        to: dateTo
      }
    }

    const transactionTableActions = {
      onTransactionsPageChanged: this.onTransactionsPageChanged,
      onTransactionsPerPageChanged: this.onTransactionsPerPageChanged
    };

    const pagination = {
      page: currentTransactionsPage,
      perPage: transactionsPerPage,
      totalPages: transactionsTotal / transactionsPerPage
    }; 

    const tableData = {
      tableHeaders: [
        {label:'Date', key: 'date'},
        {label:'Time', key: 'time'},
        {label:'First Name', key: 'firstName'},
        {label:'Last Name', key: 'lastName'},
        {label:'Player ID', key: 'playerNumber'},
        {label:'Transaction type', key: 'transactionType'},
        {label:'Transaction Value', key: 'transactionValue'},
        // {label:'Entries', key: 'playerEntries'},
        // {label:'Win Points', key: 'playerWinpoint'},
        {label:'Operation', key: 'operation'},
        {label:'Location ID', key: 'storeNumber'}
      ],
      tableRows: []
    }

    transactionList.map((transaction, i) => {
      const sign = ['Redeem', 'Cancel', 'CancelComp'].includes(transaction.transactionType)
        ? '-'
        : '+';
      const operationStr = '' + sign + (transaction.transactionValue * 100);

      tableData.tableRows.push(
        {
          date: moment.utc(transaction.timestamp).local().format('L'),
          time: moment.utc(transaction.timestamp).local().format('LT'),
          firstName: transaction.firstName,
          lastName: transaction.lastName,
          playerNumber: transaction.playerNumber,
          transactionType: transaction.transactionType,
          transactionValue: numeral(transaction.transactionValue).format("$0,0.00"),
          operation: operationStr,
          storeNumber: transaction.storeNumber
        }
      );
    });

    const currentTableData = {
      defDataModel: {
        firstParam: dateFrom,
        secondParam: dateTo,
        thirdParam: 1,
        fourthParam: pagination.perPage,
      },
      dataModel: {
        firstParam: moment().subtract(1, 'year').format('L') + " 05:00",
        secondParam: moment().add(1, 'days').format('L') + " 05:00",
        thirdParam: 1,
        fourthParam: 1000,
      }
    }

    return <View 
      reportsData={reportsData} 
      onShortcutBtnClick={this.onShortcutBtnClick}
      transactions={transactionList}
      pagination={pagination}
      transactionTableActions={transactionTableActions}
      csvConverterMethod={this.getEmployeeTransactionsList}
      {...this.state}
      tableData={tableData}
      currentTableData={currentTableData}
      isMobile={windowData.isMobile}
      showTransactionDetails={this.showTransactionDetails}
      employeeInfo={employeeInfo}/>
      
  }
}

export default connect(
  state => ({
    employeeInfo: authUserInfo(state),
    summary: employeeSelector.getSummary(state) || {},
    transactionList: employeeSelector.getTransactionList(state),
    currentTransactionsPage: employeeSelector.getCurrentTransactionsPage(state),
    transactionsPerPage: employeeSelector.getTransactionsPerPage(state),
    transactionsTotal: employeeSelector.getTransactionsTotal(state),
    windowData: getWindowData(state)
  }),

  dispatch => ({
    dispatch
  })
)(Reports);

const _defaultTransactionPerPage = 10;

const _reportsShortcuts = [
  {
    id: "1",
    string: "Current day",
    dateFrom: moment().format('L') + " 05:00",
    dateTo: moment().add(1, 'days').format('L')  + " 05:00",
  },
  {
    id: "0",
    string: "Yesterday",
    dateFrom: moment().subtract(1, 'days').format('L') + " 05:00",
    dateTo: moment().format('L')  + " 05:00",
  },
  {
    id: "2",
    string: "Last month",
    dateFrom: moment().subtract(1, 'month').format('L') + " 05:00",
    dateTo: moment().format('L') + " 05:00",    
  },
  {
    id: "3",
    string: "Last 2 month",
    dateFrom: moment().subtract(2, 'month').format('L') + " 05:00",
    dateTo: moment().format('L') + " 05:00", 
  }
];
