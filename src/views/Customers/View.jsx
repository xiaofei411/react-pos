import React from "react";
import PropTypes from "prop-types";
import { Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

import CustomCard from "components/widgets/CustomCard/CustomCard";
import CustomTable from "components/widgets/CustomTable/CustomTable";
import TableDetails from 'components/modals/TableDetails';
import FontIcon from "components/widgets/FontIcon/FontIcon";

import modals from "components/modals";

const View = ({
  users,
  isMobile,
  showModal,
  pagination,
  selectedUser,
  showUserDetails,
  resetUsersList,
  usersTableActions: {
    onUsersPageChanged,
    onSearchTermChanged,
    onUsersPerPageChanged
  }
}) => {
  const tableHead = [
    "Login",
    "First Name",
    "Last Name",
    "Email",
    "Phone",
    "Driver license",
    "Entry balance",
    "Win Points"
  ];

  const tableHeadMobile = ["Login","First Name","Last Name"];

  const tableRows = [];

  if (isMobile) {
    users.map((user, i) => {
      tableRows.push(
        <tr key={i}>
          <th scope="row" className="text-primary text-center">
            <Link to={`/customer/${user.playerNumber}`}>
              <FontIcon className="fa-user mr-2" />
              {user.playerNumber}
            </Link>
          </th>
          <td onClick={() => showUserDetails(user.playerNumber)}>{user.firstName || "-"}</td>
          <td onClick={() => showUserDetails(user.playerNumber)}>{user.lastName || "-"}</td>
        </tr>
      );
    });
  } else {
    users.map((user, i) => {
      tableRows.push(
        <tr key={i}>
          <th scope="row" className="text-primary text-center">
            <Link to={`/customer/${user.playerNumber}`}>
              <FontIcon className="fa-user mr-2" />
              {user.playerNumber}
            </Link>
          </th>
          <td>{user.firstName || "-"}</td>
          <td>{user.lastName || "-"}</td>
          <td>{user.email || "-"}</td>
          <td>{user.phone || "-"}</td>
          <td>{user.driverLicense || "-"}</td>
          <td>{user.freeEntries}</td>
          <td>{user.winPoints}</td>
        </tr>
      );
    });
  }

  const tableDetailsData = {
    header:
      selectedUser.firstName
      + " " + selectedUser.lastName +
      "(" + selectedUser.playerNumber + ")",
    labels: [
      "Email",
      "Phone",
      "Driver license",
      "Entry balance",
      "Winpoint balance"
    ],
    data: [
      selectedUser.email,
      selectedUser.phone,
      selectedUser.driverLicense,
      selectedUser.freeEntries,
      selectedUser.winPoints
    ]
  }

  return (
    <div className="animated fadeIn">
      <Row>
        <Col lg="10" className="main-table">
          <CustomCard
            header={{
              title: 'Customers list',
              search: true,
              onSearchChanged: onSearchTermChanged,
              onSearchReset: resetUsersList,
              class: "mobile_flex-row-wrap",
              badge: users.length ? "" : "No Results"
            }}
          >
          {users.length ?
            <CustomTable
              tableId="customers-list"
              head={isMobile ? tableHeadMobile : tableHead}
              rows={tableRows}
              onPerPageChanged={onUsersPerPageChanged}
              onPageChanged={onUsersPageChanged}
              {...pagination}
            />
            : ""
          }
          </CustomCard>
        </Col>
        <Col lg="2" className="mb-3">
          <button
            type="button"
            className="btn btn-lg btn-success w-100 d-block py-5 mobile_py-2"
            onClick={() => showModal(modals.USER_CREATE)}>
            <FontIcon className="fa-user mb-1 d-block fa-3x" />New Customer
          </button>
        </Col>
      </Row>
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

View.propTypes = {
  users: PropTypes.array.isRequired
};

export default View;
