import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button } from 'reactstrap';
import moment from 'moment';
import numeral from 'numeral';

import CustomCard from 'components/widgets/CustomCard/CustomCard';
import CustomTable from 'components/widgets/CustomTable/CustomTable';
import TableDetails from 'components/modals/TableDetails';
import CustomerDetails from 'components/widgets/CustomerDetails/CustomerDetails';
import FontIcon from 'components/widgets/FontIcon/FontIcon';
import modals from "components/modals";

const View = (props) => {
  const {
    user,
    showModal,
    showModalCancel,
    pagination,
    paginationGames,
    transactionTableActions,
    gamesTableActions,
    csvConverterMethod,
    currentTableData,
    transactionTableData,
    userActivityTableData,
    isCustomerFetching,
    isMobile,
    showTableModal,
    selectedData,
    isGamesOpen,
    isTransactionsOpen,
    toggleGames,
    toggleTransactions,
    storeName
  } = props;
  
  const tableHeadActivity = [];
  const tableHeadActivityMobile = ["Name", "Date", "Time"];
  const tableRowsActivity = [];

  userActivityTableData.tableHeaders.map((item) => {
    tableHeadActivity.push(item.label)
  })

  if (isMobile) {
    userActivityTableData.tableRows.map((item, i) => {
      tableRowsActivity.push(
        <tr key={i} onClick={() => showTableModal( 'game', item.name, item.date, item.time)}>
          <th scope="row" className="text-primary">
            {item.name}
          </th>
          <td>{item.date}</td>
          <td>{item.time}</td>
        </tr>
      );
    });
  } else {
    userActivityTableData.tableRows.map((item, i) => {
      tableRowsActivity.push(
        <tr key={i}>
          <th scope="row" className="text-primary">
            {item.name}
          </th>
          <td>{item.date}</td>
          <td>{item.time}</td>
          <td>{item.betAmount}</td>
          <td>{item.winAmount}</td>
          <td>{item.preEntries}</td>
          <td>{item.postEntries}</td>
          <td>{item.preWinPoints}</td>
          <td>{item.postWinPoints}</td>
        </tr>
      );
    });
  }

  const transactionType = {
    "Buy": {
      color: "text-success",
    },
    "Comp": {
      color: "text-primary",
    },
    "Redeem": {
      color: "text-danger",
    },
    "Cancel": {
      color: "text-warning"
    },
    "CancelComp": {
      color: "text-warning"
    }
  };

  const tableHeadTransactions = [];
  const tableHeadTransactionsMobile = ["Date", "Time", "TransactionType"];
  const tableRowsTransactions = [];

  transactionTableData.tableHeaders.map((item) => {   
    if (item.key !== 'playerNumber') {
      tableHeadTransactions.push(item.label)
    }
  })
  
  if (isMobile) {
    transactionTableData.tableRows.map((transaction, i) => {   
      tableRowsTransactions.push(      
        <tr key={i}
          className={transactionType[transaction.transactionType] ? transactionType[transaction.transactionType].color : ""}
          onClick={() => showTableModal( 'transaction', transaction.transactionType, transaction.date, transaction.time)}
        >
          <th scope="row">
            {transaction.date}
          </th>
          <td>{transaction.time}</td>
          {/* <td>{transaction.playerNumber}</td> */}
          <td>{transaction.transactionType}</td>
        </tr>
      );
    });
  } else {
    transactionTableData.tableRows.map((transaction, i) => {   
      tableRowsTransactions.push(      
        <tr key={i}
          className={transactionType[transaction.transactionType] ? transactionType[transaction.transactionType].color : ""}
        >
          <th scope="row">
            {transaction.date}
          </th>
          <td>{transaction.time}</td>
          {/* <td>{transaction.playerNumber}</td> */}
          <td>{transaction.transactionType}</td>
          <td>{transaction.transactionValue}</td>
          <td>{transaction.playerEntries}</td>
          <td>{transaction.playerWinpoint}</td>
          <td>{transaction.operation}</td>
          <td>{transaction.storeNumber}</td>
        </tr>
      );
    });
  }
  const csvConverterSettings = {
    transactions: {
      headers: transactionTableData.tableHeaders,
      data: transactionTableData.tableRows,
      filename: `Customer_${user.playerNumber}_transactions`,
      dataGetter: csvConverterMethod.transactions,
      currentTableData: currentTableData.transactions
    },
    gameActivity: {
      headers: userActivityTableData.tableHeaders,
      data: userActivityTableData.tableRows,
      filename: `Customer_${user.playerNumber}_game_activities`,
      dataGetter: csvConverterMethod.gameActivity,
      currentTableData: currentTableData.gameActivity
    }
  }

  const isGameActivity = userActivityTableData.tableRows.length > 0;
  const isTransactions = transactionTableData.tableRows.length > 0;

  const sign = ['Redeem', 'Cancel', 'CancelComp'].includes(selectedData.data.transactionType)
    ? '-'
    : '+';
  const operationStr = '' + sign + (selectedData.data.transactionValue * 100);

  const tableDetailsData = {
    'game': {
      header:
        selectedData.data.themeName
        + " " +
        moment.utc(selectedData.data.eventDate).local().format('L')
        + " " +
        moment.utc(selectedData.data.eventDate).local().format('LT'),
      labels: [
        "Level Amount",
        "Win Amount",
        "Pre Entries",
        "Post Entries",
        "Pre Win Points",
        "Post Win Points"
      ],
      data: [
        selectedData.data.betAmount,
        selectedData.data.winAmount,
        selectedData.data.preEntries,
        selectedData.data.postEntries,
        selectedData.data.preBalance,
        selectedData.data.postBalance
      ] 
    },
    'transaction': {
      header:
        selectedData.data.transactionType
        + " " +
        moment.utc(selectedData.data.timestamp).local().format('L')
        + " " +
        moment.utc(selectedData.data.timestamp).local().format('LT'),
      labels: [
        "Transaction Value",
        "Entries",
        "Win Points",
        "Operation",
        "Location ID"
      ],
      data: [
        numeral(selectedData.data.transactionValue).format("$0,0.00"), selectedData.data.playerEntries,
        selectedData.data.playerWinpoint,
        operationStr,
        selectedData.data.storeNumber,
      ] 
    }
  }

  return (
    <div className="animated fadeIn">
      <Row>
        <Col md="12" lg="8">
          <CustomerDetails
            player={user}
            showModalCancel={showModalCancel}
            {...props} />
        </Col>
        <Col lg="4" className="mb-3">
          <Button
            size="lg"
            color="success"
            className="w-100 py-5 mobile_py-2"
            onClick={showModal}>
            <FontIcon className="fa-fax mb-1 d-block fa-3x" />
            Payments
          </Button>
        </Col>
      </Row>
      <Row>
        <Col md="12">
          <CustomCard
            header={{
              title: 'Payment Transactions',
              csv: csvConverterSettings.transactions,
              refresh: {
                getter: csvConverterSettings.transactions.dataGetter,
                isRefreshing: isCustomerFetching
              },
              badge: isTransactions ? '' : 'No transactions'
            }}
            isCollapsed={false}
            collapse={isTransactionsOpen}
            collapseCallback={toggleTransactions}
            disableClick={!isTransactions}
          >
            <CustomTable
              tableId="customer-transactions"
              head={isMobile ? tableHeadTransactionsMobile : tableHeadTransactions}
              rows={tableRowsTransactions}
              onPerPageChanged={transactionTableActions.onTransactionsPerPageChanged}
              onPageChanged={transactionTableActions.onTransactionsPageChanged}
              {...pagination}
            />
          </CustomCard>
        </Col>
      </Row>
      {selectedData.type &&
        <TableDetails
          id={modals.TABLE_DETAILS}
          header={tableDetailsData[selectedData.type].header}
          labels={tableDetailsData[selectedData.type].labels}
          data={tableDetailsData[selectedData.type].data}
        />
      }
    </div>
  )
};

View.defaultProps = {

};

View.propTypes = {
  user: PropTypes.object.isRequired
};

export default View;
