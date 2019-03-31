import React, { Component } from "react";
import { Row, Col, Button } from "reactstrap";
import moment from 'moment';
import numeral from 'numeral';

import CustomCard from "components/widgets/CustomCard/CustomCard";
import CustomTable from 'components/widgets/CustomTable/CustomTable';
import ReportsDate from "components/widgets/ReportsDate/ReportsDate";
import TableDetails from 'components/modals/TableDetails';
import modals from "components/modals";

const ShortcutButtons = ({ data, clickHandler }) =>
  data.map(button => (
    <button
      key={button.id}
      type="button"
      className="btn btn-primary btn-lg mobile_w-45 mobile_mb-2"
      onClick={() => clickHandler(button.dateFrom, button.dateTo)}>
      {button.string}
    </button>
  ));

const ReportResults = ({ data }) =>
  data.map(item => (
    <div key={item.id} className="col-6 col-lg-3">
      <div className="card">
        <div className="card-block p-1 clearfix text-center">
          <div className="h5 text-info mb-0 mt-h">${item.value} {item.persent && '('+item.persent+')'}</div>
          <div className="text-muted text-uppercase font-weight-bold font-xs">
            {item.string}
          </div>
        </div>
      </div>
    </div>
  ));

const View = ({ 
  reportsData,
  onShortcutBtnClick,
  transactions,
  pagination,
  transactionTableActions: {
    onTransactionsPageChanged,
    onTransactionsPerPageChanged
  },
  csvConverterMethod,
  currentTableData,
  tableData,
  isMobile,
  selectedTransaction,
  showTransactionDetails,
  employeeInfo
}) => {
  const { results, shortcuts, date } = reportsData;

  const tableHead = [];
  const tableHeadMobile = ["Date", "Time", "Player ID"];
  const tableRows = [];

  const transactionType = {
    "Buy": {
      color: "text-success"
    },
    "Comp": {
      color: "text-primary"
    },
    "Redeem": {
      color: "text-danger"
    },
    "Cancel": {
      color: "text-warning"
    },
    "CancelComp": {
      color: "text-warning"
    }
  };

  tableData.tableHeaders.map((item) => {
    tableHead.push(item.label)
  });

  if (isMobile) {
    tableData.tableRows.map((item, i) => {
      tableRows.push(
        <tr
          key={i}      
          className={transactionType[item.transactionType].color}
          onClick={() => showTransactionDetails(item.playerNumber, item.date, item.time, item.transactionType)}>
          <th
            scope="row">
            {item.date}
          </th>
          <td>{item.time}</td>
          <td>{item.playerNumber}</td>
        </tr>
      );
    });
  } else {
    tableData.tableRows.map((item, i) => {
      tableRows.push(
        <tr
          key={i}      
          className={transactionType[item.transactionType].color}>
          <th
            scope="row">
            {item.date}
          </th>
          <td>{item.time}</td>
          <td>{item.firstName}</td>
          <td>{item.lastName}</td>
          <td>{item.playerNumber}</td>
          <td>{item.transactionType}</td>
          <td>{item.transactionValue}</td>
          {/* <td>{item.playerEntries}</td>
          <td>{item.playerWinpoint}</td> */}
          <td>{item.operation}</td>
          <td>{item.storeNumber}</td>
        </tr>
      );
    });
  }
  const csvConverterSettings = {
    headers: tableData.tableHeaders,
    data: tableData.tableRows,
    filename: "Cashier_transactions",
    dataGetter: csvConverterMethod,
    currentTableData: currentTableData
  };

  const sign = ['Redeem', 'Cancel', 'CancelComp'].includes(selectedTransaction.transactionType)
    ? '-'
    : '+';
  const operationStr = '' + sign + (selectedTransaction.transactionValue * 100);

  const tableDetailsData = {
    header:
      selectedTransaction.playerNumber
      + " " +
      moment.utc(selectedTransaction.timestamp).local().format('L')
      + " " +
      moment.utc(selectedTransaction.timestamp).local().format('LT'),
    labels: [
      "Transaction type",
      "Transaction Value",
      "Operation",
      "Location ID",
    ],
    data: [
      selectedTransaction.transactionType,
      numeral(selectedTransaction.transactionValue).format("$0,0.00"),
      operationStr,
      selectedTransaction.storeNumber,
    ]
  };

  const printedData = {
    dateFrom: date.from.slice(0, 10),
    dateTo: date.to.slice(0, 10),
    cashierName: employeeInfo.accountName,
    storeName: employeeInfo.storeLabel,
    totalSales: results[0].value,
    winnings: results[1].value,
    comps: results[2].value,
    cancels: results[3].value,
  }  

  return (
    <div className="animated fadeIn">
      <Row>
        <Col md="12">
          <CustomCard
            header={{
              title: "Summary",
              search: false,
              icon: "fa-money",
              printedData: printedData
            }}
          >
            <div className="p-3">
              <ReportsDate 
                dateFrom={date.from}
                dateTo={date.to}
                getInfo={onShortcutBtnClick}
                printedData={printedData}
              />
              <div className="row">
                {results && <ReportResults data={results} />}
              </div>
            </div>
          </CustomCard>
        </Col>
      </Row>
      <Row>
        <Col md="12">
          <CustomCard
            header={{
              title: "Shortcuts"
            }}
          >
            <div className="row">
              <div className="col-md-12 d-flex flex-row flex-wrap justify-content-around p-3">
                <ShortcutButtons data={shortcuts} clickHandler={onShortcutBtnClick} />
              </div>
            </div>
          </CustomCard>
        </Col>
      </Row>
      {transactions.length ?
        <Row>
          <Col lg="12">
            <CustomCard 
              header={{
                title:'Transactions',
                csv: csvConverterSettings
              }}
            >
              <CustomTable
                tableId="reports-transactions"
                head={isMobile ? tableHeadMobile : tableHead}
                rows={tableRows}
                onPerPageChanged={onTransactionsPerPageChanged}
                onPageChanged={onTransactionsPageChanged}
                {...pagination}
              />
            </CustomCard>
          </Col>
        </Row>
        : ''
      }
      <TableDetails
        id={modals.TABLE_DETAILS}
        header={tableDetailsData.header}
        labels={tableDetailsData.labels}
        data={tableDetailsData.data}
      />
    </div>
  );
};

View.defaultProps = {};

View.propTypes = {};

export default View;
