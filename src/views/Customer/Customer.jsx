import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import numeral from 'numeral';

import View from './View';
import Payments from 'components/widgets/Payments/Payments';
import { show as showModal } from 'actions/modal';
import { getUser, updateUser, getUserTransactionsList, getUserGamesList } from 'actions/user';
import * as currentUserSelector from 'data/selectors/currentPlayer';
import CreateUser from 'components/modals/CreateUser';
import modals from 'components/modals';
import { USER as userActionTypes } from 'actions';
import * as authUserInfoSelectors from 'data/selectors/auth';
import { getWindowData } from 'data/selectors/window';

import { entiresToMoney, moneyToEntires } from 'data/services/entiresConverter';
import { dateToUTC } from 'data/services/dateFormater';
import {USER as ActionTypes} from "../../actions/index";

class Customer extends Component {

  state = {
    isSubmitSuccess: null,
    canEdit: false,
    selectedData: {
      type: '',
      data: {}
    },
    isGamesOpen: false,
    isTransactionsOpen: false
  };

  getUrl() {
    const currentUrl = this.props.location.pathname;
    var splitCurrentUrl = currentUrl.split('/', 4);
    const userNumber = splitCurrentUrl[2];
    return userNumber;
  }

  componentWillMount() {
    const { dispatch, userTransactionsPage, userTransactionsPerPage } = this.props;
    const userNumber = this.getUrl();

    dispatch(getUser({
        playerNum: userNumber
    }))
    .then((action) => {
        if (action.type === userActionTypes.USER_GET_OK) {
            this.resetCustomerTransactions();
        }
    });
  }

  componentDidMount() {
    this.props.showModal("hidden");
  }

  onUpdateSubmit = model => {
    const { dispatch, user } = this.props;

    let updatedData = {
      playerNum: user.playerNumber,
      ...model
    }

    if (updatedData.password === '*******') {
      delete updatedData.password;
    }

    dispatch(updateUser(updatedData))
      .then(
        ({ type }) => {
          if (type === userActionTypes.USER_UPDATE_OK) {

            dispatch(getUser({
              playerNum: this.getUrl()
            }));
            this.setState({ isSubmitSuccess: true, canEdit: false });
          }
        }
      );
  }

  onEditClick = () => {
    this.setState({ isSubmitSuccess: null, canEdit: true });
  }

  showModal = (modalName) => this.props.dispatch(showModal(modalName))

  resetCustomerTransactions = () => {
    const { dispatch } = this.props;
    dispatch({
      type: ActionTypes.USER_GET_TRANSACTIONS_OK,
      payload: []
    })
  }

  getCustomerTransactions = (page, perPage) => {
    const { dispatch, user } = this.props;

    const dateFrom = moment().subtract(1, 'year').format('L')  + " 05:00";
    const dateTo = moment().add(1, 'days').format('L') + " 05:00";


    const data = {
      playerId: user.playerId,
      from: dateToUTC(dateFrom),
      to: dateToUTC(dateTo),
      page: page,
      number: perPage
    }

    return new Promise(function(resolve, reject) {
      dispatch(getUserTransactionsList(data))
        .then(
          ({ type, payload }) => {
            if (type === userActionTypes.USER_GET_TRANSACTIONS_OK) {
              resolve(payload);
            }
          }
        )
    })
  }

  getCustomerGames = (page, perPage) => {
    const { dispatch, user } = this.props;

    const dateFrom = moment().subtract(1, 'year').format('L')  + " 05:00";
    const dateTo = moment().add(1, 'days').format('L') + " 05:00";

    const data = {
      playerId: user.playerId,
      from: dateToUTC(dateFrom),
      to: dateToUTC(dateTo),
      page: page,
      number: perPage
    }

    return new Promise(function(resolve, reject) {
      dispatch(getUserGamesList(data))
        .then(
          ({ type, payload }) => {
            if (type === userActionTypes.USER_GET_GAMES_OK) {
              resolve(payload);
            }
          }
        )
    })
  }

  onGamesPageChanged = page => {
    const { userGamesPerPage } = this.props;

    this.toggleGames(true);
    return this.getCustomerGames(page, userGamesPerPage)
  }

  onGamesPerPageChanged = per => {

    this.toggleGames(true);
    return this.getCustomerGames(1, per);
  }

  onTransactionsPageChanged = page => {
    const { userTransactionsPerPage } = this.props;

    this.toggleTransactions(true);
    return this.getCustomerTransactions(page, userTransactionsPerPage)
  }

  onTransactionsPerPageChanged = per => {

    this.toggleTransactions(true);
    return this.getCustomerTransactions(1, per);
  }

  findUser = (type, x, y, z) => {
    const { userActivity, userTransactions } = this.props;


    if (type === 'game') { 
      return userActivity.list.find(item => {

        const date = moment.utc(item.eventDate).local().format('L');
        const time = moment.utc(item.eventDate).local().format('LT');

        if (item.themeName === x && date === y && time === z) {
          return item
        }
      })
    } else if (type === 'transaction') {
      return userTransactions.list.find(item => {

        const date = moment.utc(item.timestamp).local().format('L');
        const time = moment.utc(item.timestamp).local().format('LT');

        if (item.transactionType === x && date === y && time === z) {
          return item
        }
      })
    } else {
      return {}
    }
  }

  showTableModal = (type, x, y, z) => {
    const rowDetails = this.findUser(type, x, y, z);

    this.setState({
      selectedData: {
        type: type,
        data: rowDetails
      }
    });
    
    this.showModal(modals.TABLE_DETAILS);
  }

  toggleGames = (isOpen) => {
    this.setState({
      isGamesOpen: isOpen
    })
  }

  toggleTransactions = (isOpen) => {
    this.setState({
      isTransactionsOpen: isOpen
    })
  }

  render() {
    const {
      userTransactions,
      userTransactionsPage,
      userTransactionsPerPage,
      transactionsTotal,
      userActivity,
      authUserInfo,
      isCustomerFetching,
      windowData,
      userGamesPage,
      userGamesPerPage,
      gamesTotal
    } = this.props;

    const transactionTableActions = {
      onTransactionsPageChanged: this.onTransactionsPageChanged,
      onTransactionsPerPageChanged: this.onTransactionsPerPageChanged
    };

    const gamesTableActions = {
      onGamesPageChanged: this.onGamesPageChanged,
      onGamesPerPageChanged: this.onGamesPerPageChanged
    };

    const pagination = {
      page: userTransactionsPage,
      perPage: userTransactionsPerPage,
      totalPages: transactionsTotal / userTransactionsPerPage
    };

    const paginationGames = {
      page: userGamesPage,
      perPage: userGamesPerPage,
      totalPages: gamesTotal / userGamesPerPage
    };

    const currentTableData = {
      transactions: {
        defDataModel: {
          firstParam: userTransactionsPage,
          secondParam: userTransactionsPerPage,
        },
        dataModel: {
          firstParam: 1,
          secondParam: 1000,
        }
      }
    }

    const tableData = {
      transactions: {
        tableHeaders: [
          {label:'Date', key: 'date'},
          {label:'Time', key: 'time'},
          {label:'Player ID', key: 'playerNumber'},
          {label:'Transaction type', key: 'transactionType'},
          {label:'Transaction Value', key: 'transactionValue'},
          {label:'Entries', key: 'playerEntries'},
          {label:'Win Points', key: 'playerWinpoint'},
          {label:'Operation', key: 'operation'},
          {label:'Location ID', key: 'storeNumber'}
        ],
        tableRows: []
      },
      gameActivity: {
        tableHeaders: [
          {label:'Name', key: 'name'},
          {label:'Date', key: 'date'},
          {label:'Time', key: 'time'},
          {label:'Level Amount', key: 'betAmount'},
          {label:'Win Amount', key: 'winAmount'},
          {label:'Pre Entries', key: 'preEntries'},
          {label:'Post Entries', key: 'postEntries'},
          {label:'Pre Win Points', key: 'preWinPoints'},
          {label:'Post Win Points', key: 'postWinPoints'}
        ],
        tableRows: []
      }
    }

    if (userTransactions.list) {
      userTransactions.list.map((transaction, i) => {
        // TO DO fix when API will receive transactionValue in one format
        const _operationValue = transaction.transactionType === 'Convert' ? transaction.transactionValue : entiresToMoney(transaction.transactionValue);
        const _transactionValue = transaction.transactionType === 'Convert' ? moneyToEntires(transaction.transactionValue) : transaction.transactionValue;

        const sign = ['Redeem', 'Cancel', 'CancelComp'].includes(transaction.transactionType)
          ? '-'
          : '+';
        const operationStr = '' + sign + _operationValue;

        tableData.transactions.tableRows.push(
          {
            date: moment.utc(transaction.timestamp).local().format('L'),
            time: moment.utc(transaction.timestamp).local().format('LT'),
            playerNumber: transaction.playerNumber,
            transactionType: transaction.transactionType,
            transactionValue: numeral(_transactionValue).format("$0,0.00"),
            playerEntries: transaction.playerEntries,
            playerWinpoint: transaction.playerWinpoint,
            operation: operationStr,
            storeNumber: transaction.storeNumber,
          }
        );
      });
    }

    const csvConverterMethods = {
      transactions: this.getCustomerTransactions,
      gameActivity: this.getCustomerGames
    }

    return ([
      <Payments
        key="0"
        {...this.props}
        cashierName={authUserInfo.accountName}
        storeName={authUserInfo.storeLabel}
        currentUser={this.props.user}
      />,
      <CreateUser
        key="5m"
        id={modals.USER_CREATE} />,

      <View
        {...this.props}
        key="1"
        isSubmitSuccess={this.state.isSubmitSuccess}
        canEdit={this.state.canEdit}
        onUpdateSubmit={this.onUpdateSubmit}
        onEditClick={this.onEditClick}
        showModal={() => this.showModal(modals.PAYMENTS_MAIN)}
        showModalCancel={() => this.showModal(modals.CANCEL_TRANSACTION_CONFIRM)}
        showTableModal={this.showTableModal}
        pagination={pagination}
        paginationGames={paginationGames}
        transactionTableActions={transactionTableActions}
        gamesTableActions={gamesTableActions}
        csvConverterMethod={csvConverterMethods}
        currentTableData={currentTableData}
        transactionTableData={tableData.transactions}
        userActivityTableData={tableData.gameActivity}
        isCustomerFetching={isCustomerFetching}
        isMobile={windowData.isMobile}
        selectedData={this.state.selectedData}
        isGamesOpen={this.state.isGamesOpen}
        isTransactionsOpen={this.state.isTransactionsOpen}
        toggleGames={this.toggleGames}
        toggleTransactions={this.toggleTransactions}
        storeName={authUserInfo.storeLabel}
        />
    ]);
  }
}


export default connect(

  state => ({
    user: currentUserSelector.getInfo(state) || {},
    userActivity: currentUserSelector.getGames(state) || {},
    userTransactions: currentUserSelector.getTransactions(state) || {},
    userTransactionsPage: currentUserSelector.getTransactionsPage(state),
    userTransactionsPerPage: currentUserSelector.getTransactionsPerPage(state),
    transactionsTotal: currentUserSelector.getTransactionsTotal(state),
    authUserInfo: authUserInfoSelectors.authUserInfo(state) || {},
    isCustomerFetching: currentUserSelector.isFetching(state),
    windowData: getWindowData(state),
    userGamesPage: currentUserSelector.getGamesPage(state),
    userGamesPerPage: currentUserSelector.getGamesPerPage(state),
    gamesTotal: currentUserSelector.getGamesTotal(state),
  }),

  dispatch => ({
    dispatch,
    showModal: modalName => dispatch(showModal(modalName)),
  })

)(Customer);