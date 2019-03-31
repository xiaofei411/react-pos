import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Button  } from 'reactstrap';

import CustomCard from 'components/widgets/CustomCard/CustomCard';
import CustomTable from 'components/widgets/CustomTable/CustomTable';
import FontIcon from 'components/widgets/FontIcon/FontIcon';

const View = ({ 
  cashiers,
  pagination,
  cashiersTableActions: {
    onCachiersPageChanged,
    onSearchTermChanged,
    onCachiersPerPageChanged
  },
  showCreateCashierModal,
  showUpdateCashierModal
}) => {

  const tableHead = ['Login', 'Status', 'Cashier since', 'Reports'];
  const tableRows = [];

  cashiers.map((cashier, i) => {
    tableRows.push(
      <tr key={i}>
        <th
          scope="row"
          className="text-primary pointer"
          onClick={() => showUpdateCashierModal(cashier.loginName)} >
          {cashier.accountName}
        </th>
        <td>{cashier.statusReasonLabel}</td>
        <td>-</td>
        <td className="d-flex justify-content-between">
          <Button color="primary" size="sm">
            today
            <FontIcon className="fa-arrow-right" />
          </Button>
          <Button color="secondary" size="sm">
            yesterday
            <FontIcon className="fa-arrow-right" />
          </Button>
        </td>
      </tr>
    );
  });

  return (
    <div className="animated fadeIn">
      <Row>
        <Col lg="10" className="main-table">
          <CustomCard 
            header={{
              title:'My cashiers',
              search: true,
              onSearchChanged: onSearchTermChanged
            }}
          >
            <CustomTable
              tableId="cashiers-list"
              head={tableHead}
              rows={tableRows}
              onPerPageChanged={onCachiersPerPageChanged}
              onPageChanged={onCachiersPageChanged}
              {...pagination}
            />
          </CustomCard>
        </Col>
        <Col lg="2" className="mb-3">
          <Button
            color="success"
            size="lg"
            className="w-100 d-block py-5 mobile_py-2"
            onClick={showCreateCashierModal}>
            <FontIcon className="fa-user mb-1 d-block fa-3x" />Create cashier
          </Button>
        </Col>
      </Row>
    </div>
  )
}

View.propTypes = {
  cashiers: PropTypes.array.isRequired
};

export default View;