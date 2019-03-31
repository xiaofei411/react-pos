import React from 'react';
import { Button } from 'reactstrap';

import CustomCard from 'components/widgets/CustomCard/CustomCard';
import CustomTable from 'components/widgets/CustomTable/CustomTable';
import PaymentsHeader from 'components/modals/PaymentsMain/PaymentsHeader';
import SearchForm from 'components/forms/SearchForm';
import FontIcon from 'components/widgets/FontIcon/FontIcon';
import CalculatorWrapper from 'components/widgets/Calculator/CalculatorWrapper';
import InternetTimeCalc from 'components/forms/InternetTimeCalc';
import RedeemWinnings from 'components/forms/RedeemWinnings';
import modals from 'components/modals';

const View = ({
  showModal,
  user,
  users,
  showSearchResults,
  redeemWinningButtons,
  internetTimeButtons,
  coinPrice,
  redeemFormAmount,
  paymentModes,
  isPlayerFetching,
  isMobile,
  isPaymentStart,
  actionHandlers: {
    onSearchTermChanged,
    onInternetTimeTmplBtnClick,
    onRedeemTmplBtnClick,
    onPaymentSubmit,
    onPlayerSelect,
    onPlayerUpdate
  }
}) => {
  const userKeys = Object.keys(user);
  const userAvailable = userKeys.length > 1;
  const incorrectSum = (redeemFormAmount * coinPrice) > user.winPoints ? false : true;

  const tableHead = ['Customer ID', 'FirstName', 'LastName', 'Email', 'Phone'];
  const tableRows = [];
  const tableEmptyRow = (<tr><th>No results</th><td></td><td></td></tr>);

  users.map((user, i) => {
    tableRows.push(
      <tr
        key={i}
        onClick={() => onPlayerSelect(user.playerNumber)}>
        <th scope="row" className="text-primary py-3">
          <FontIcon className="fa-user mr-2" />
          {user.playerNumber}
        </th>
        <td className="py-3">{user.firstName}</td>
        <td className="py-3">{user.lastName}</td>
        <td className="py-3">{user.email}</td>
        <td className="py-3">{user.phone}</td>
      </tr>
    );
  });

  const searchResults = () => {
    if (showSearchResults)
      return <CustomTable
        tableId="payment-search-results"
        hover={true}
        head={tableHead}
        rows={users.length ? tableRows : tableEmptyRow}
        wrapperClass="search-results pointer"
      />
  }

  redeemWinningButtons[0].value = user.winPoints ? user.winPoints / coinPrice : 1;
  
  const refreshSettings = {
    getter: () => onPlayerUpdate(user.playerNumber),
    isRefreshing: isPlayerFetching,
    className: 'mobile_order-1'
  }

  return (
    <CustomCard
      mainClass="mb-0"
      header={{
        title: "Payments",
        secondTitle: <PaymentsHeader user={user} userAvailable={userAvailable} />,
        class: "justify-content-between mobile_flex-row-wrap",
        refresh: userAvailable ? refreshSettings : ''
      }}>
      <div className="d-flex flex-wrap justify-content-between p-3">

        <SearchForm
          size="lg"
          onSubmit={onSearchTermChanged} />

        <Button
          className="mobile_mt-2"
          color="primary"
          size="lg"
          onClick={() => showModal(modals.USER_CREATE)}>
          <FontIcon className="fa-user mx-1" />
          New customer
        </Button>
      </div>

      {searchResults()}

      <div className="d-flex flex-wrap justify-content-between p-3 mb-3">
        <div className="pr-1 w-50 mobile_w-100">
          <CalculatorWrapper
            name='Internet time'
            icon='fa-list-ul'
            isCollapsed={isMobile}>

            <InternetTimeCalc
              userAvailable={userAvailable}
              isPaymentStart={isPaymentStart}
              buttons={internetTimeButtons}
              onTemplateButtonClick={onInternetTimeTmplBtnClick}
              onSubmitButtonClick={e => onPaymentSubmit(e, paymentModes.add)}
            />
          </CalculatorWrapper>
        </div>
        <div className="pl-1 w-50 mobile_w-100">
          <CalculatorWrapper
            name="Redeem winnings"
            icon="fa-list-ul"
            isCollapsed={isMobile}>

            <RedeemWinnings
              userAvailable={userAvailable}
              buttons={redeemWinningButtons}
              isPaymentStart={isPaymentStart}
              onTemplateButtonClick={onRedeemTmplBtnClick}
              onSubmitButtonClick={e => onPaymentSubmit(e, paymentModes.withdraw)}
              incorrectSum={incorrectSum}
            />
          </CalculatorWrapper>
        </div>
      </div>
      <div className="pb-3">
        <Button
          color="light"
          size="lg"
          className="d-block p-3 mx-auto"
          disabled={!userAvailable}
          onClick={() => showModal(modals.PAYMENTS_CREDITS)}>
          <FontIcon className="fa-gift mx-1" />
          Promo credits
        </Button>
      </div>
      <div className="pb-3">
        <Button
          color="danger"
          size="lg"
          className="d-block p-3 mx-auto"
          onClick={() => showModal("hidden")}
          >
          <FontIcon className="fa-close mr-1"/>
          Close
        </Button>
      </div>
      {/* <div className="p-3">
        <CustomCard
          header={{
            title: "Select payment mode to confirm",
          }}>
          <div className="d-flex justify-content-between p-3">
            <button className="btn btn-primary" onClick={() => showModal(modals.PAYMENTS_CONFIRM)}>Cash</button>
            <button className="btn btn-primary" onClick={onPaymentSubmit}>Check</button>
            <button className="btn btn-primary" onClick={onPaymentSubmit}>Credit Card</button>
            <button className="btn btn-primary" onClick={onPaymentSubmit}>Other</button>
          </div>
        </CustomCard>
      </div> */}
    </CustomCard>
  );
};

View.propTypes = {

};

export default View;
