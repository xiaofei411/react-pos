import React from 'react';
import PropTypes from 'prop-types';
import { Badge } from 'reactstrap';
import { Link } from "react-router-dom";

import { __oneCoinPrice as coinPrice } from 'components/modals/PaymentsMain/PaymentsMain';
import FontIcon from 'components/widgets/FontIcon/FontIcon';
import numeral from 'numeral';

const PaymentsHeader = ({
  user,
  userAvailable
}) => {

  return (
    userAvailable ?
      <div className="d-flex no-wrap">
        <div className="p-3">
          <span className="mr-2 mobile_d-block">
            <strong>Customer: </strong>
            <Link to={`/customer/${user.playerNumber}`}>
              {user.firstName && user.lastName
                ? user.firstName + ' ' + user.lastName
                : user.playerNumber
              }
            </Link>
          </span>
          <span className="mr-2 mobile_d-block">
            <strong>ID: </strong> {user.playerNumber}
          </span>
          <span className="mr-2 mobile_d-block">
            <strong>Free entries: </strong> {user.freeEntries}
          </span>
          <span className="mr-2 mobile_d-block">
            <strong> Win Points: </strong> {numeral(user.winPoints / coinPrice).format("$0,0.00")}
          </span>
        </div>
      </div>
      :
      <div className="p-3">
        <Badge color="danger" className="p-2 text-uppercase">Customer not selected</Badge>
      </div>
  );
};

PaymentsHeader.propTypes = {

};

export default PaymentsHeader;
