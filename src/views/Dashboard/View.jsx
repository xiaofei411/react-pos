import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, ListGroup, ListGroupItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import moment from 'moment';
import numeral from 'numeral';

import CustomCard from 'components/widgets/CustomCard/CustomCard';
import FontIcon from 'components/widgets/FontIcon/FontIcon';

const View = ({
  transactions,
  currentUser,
  authUserInfo,
  showPaymentsModal,
  getEmployeeTransactionsList,
  isUserFetching,
  isMobile
}) => {

  const transactionType = {
    "Buy": {
      color: "text-success",
      text: "buy"
    },
    "Comp": {
      color: "text-primary",
      text: "received"
    },
    "Redeem": {
      color: "text-danger",
      text: "redeemed"
    },
    "Cancel": {
      color: "text-warning",
      text: "canceled"
    },
    "CancelComp": {
      color: "text-warning",
      text: "canceled comps"
    }
}

  const listItems = transactions.map((transaction, index) =>
    <ListGroupItem
      key={index}
      className={`${transactionType[transaction.transactionType] ? transactionType[transaction.transactionType].color : ""} py-4`}
    >
      <Link
        to={`/customer/${transaction.playerNumber}`}
        className={transactionType[transaction.transactionType] ? transactionType[transaction.transactionType].color : ""}
        >
        <FontIcon className="fa-user mx-1" />
        Customer
        {" "}
        {transaction.firstName}
        {" "}
        {transaction.lastName}
        {" "}
        ({transaction.playerNumber})
        {" "}
        {transactionType[transaction.transactionType] ? transactionType[transaction.transactionType].text : ""}
        {" "}
        {numeral(transaction.transactionValue).format("$0,0.00")}
        {" "}
        in cash
        {" "}
        ({moment.utc(transaction.timestamp).local().format('L')}
        {" "}
        {moment.utc(transaction.timestamp).local().format('LT')})
      </Link>
    </ListGroupItem>
  );

  const linkTransactions = {
    href: '/reports',
    class: 'btn btn-lg btn-info mr-2',
    content: 'See more'
  };

  return (
    <div className="animated fadeIn">
      <Row>
        <Col md="8" className="mb-3">
          <h1>Welcome {authUserInfo.accountName}!</h1>
        </Col>
      </Row>
      <Row>
        <Col md="8" lg="6">
          <CustomCard
            header={{
              title: 'Your recent Transactions',
              badge: transactions.length ? '' : 'No Transactions',
              refresh: {
                getter: getEmployeeTransactionsList,
                isRefreshing: isUserFetching
              }
            }}
            isCollapsed={isMobile}
            footer={{
              class: 'd-flex justify-content-end',
              link: linkTransactions,
            }}
          >
            <ListGroup className="list-group list-group-flush d-block w-100">
              { listItems }
            </ListGroup>
          </CustomCard>
        </Col>
        <Col md="4" lg="6" className="mobile_order-1">
          <div className="btn-wrapper btn-wrapper--home">
            <button
              type="button"
              className="btn btn-lg btn-success w-100 py-5 mobile_py-2"
              onClick={showPaymentsModal}>
              <FontIcon className="fa-fax mb-1 d-block fa-3x" />Payments
              </button>
          </div>
          <div className="btn-wrapper btn-wrapper--home">
            <Link to="/customers" className="btn btn-lg btn-success w-100 py-5 mobile_py-2">
              <FontIcon className="fa-group mb-1 d-block fa-3x" /> Customers
            </Link>
          </div>
        </Col>
      </Row>
    </div>
  );
};

View.propTypes = {
  currentUser: PropTypes.object.isRequired,
  transactions: PropTypes.array.isRequired,
  showPaymentsModal: PropTypes.func.isRequired
};

export default View;
