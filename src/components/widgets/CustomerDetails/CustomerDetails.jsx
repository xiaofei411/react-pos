import React, { Component } from "react";
import { Button } from "reactstrap";
import { submit } from "redux-form";
import { connect } from "react-redux";
import ReactToPrint from "react-to-print";
import numeral from 'numeral';
import modals from 'components/modals';

import CustomCard from "components/widgets/CustomCard/CustomCard";
import FontIcon from "components/widgets/FontIcon/FontIcon";
import CustomerDetailsForm, {
  formName
} from "components/forms/CustomerDetailsForm";
import CustomerDetailsPrint from "components/widgets/CustomerDetails/CustomerDetailsPrint";

class CustomerDetails extends Component {
  editTogler = () => {
    this.props.onEditClick();
  };

  onSaveClick = () => {
    this.props.dispatch(submit(formName));
  };

  cancelTransaction = () => {
    const { showModalCancel } = this.props;
    showModalCancel();
  };

  render() {
    const { player, onUpdateSubmit, isSubmitSuccess, canEdit} = this.props;

    const gridClass = "w-50 my-3 mobile_w-100";
    const staticLabelClass = "d-inline-block w-40 text-right pr-2 pb-3";
    const staticDataClass = "d-inline-block w-60 pb-3";

    const seveEditBtnData = {
      save: {
        text: "Save",
        icon: "fa-save",
        handler: this.onSaveClick
      },
      edit: {
        text: "Edit",
        icon: "fa-pencil",
        handler: this.editTogler
      }
    };

    let editFormInitialVals = {
      password: "*******",
      email: player.email,
      phoneNum: player.phone,
      firstName: player.firstName,
      lastName: player.lastName,
      driverLicense: player.driverLicense || ''
    };

    const cancelTransactionBtn = (
        <Button
            size="lg"
            color="warning"
            className="mr-2 p-3"
            onClick={this.cancelTransaction}
        >
          <FontIcon
              className={`fa-undo mr-2`}
          />
            Cancel Transaction
        </Button>
    );

    const saveEditBtn = (
      <Button
        size="lg"
        color="success"
        className="mr-2 p-3"
        onClick={
          canEdit ? seveEditBtnData.save.handler : seveEditBtnData.edit.handler
        }
      >
        <FontIcon
          className={`${
            canEdit ? seveEditBtnData.save.icon : seveEditBtnData.edit.icon
          } mr-2`}
        />
        {canEdit ? seveEditBtnData.save.text : seveEditBtnData.edit.text}
      </Button>
    );

    return (
      <CustomCard
        header={{
          title: "Customer details",
          icon: "fa-user"
        }}
      >
        <div className="d-flex flex-wrap">
          {!canEdit ? (
            <div className={gridClass}>
              <div className={`${staticLabelClass} mb-2`}>
                <p className="mb-0">Customer ID:</p>
              </div>
              <div className={staticDataClass}>
                <strong>{player.playerLabel}</strong>
              </div>
              <div className={`${staticLabelClass} mb-2`}>
                <p className="mb-0">E-mail:</p>
              </div>
              <div className={staticDataClass}>
                <strong>{player.email || "-"}</strong>
              </div>
              <div className={`${staticLabelClass} mb-2`}>
                <p className="mb-0">Phone Number:</p>
              </div>
              <div className={staticDataClass}>
                <strong>{player.phone  || "-"}</strong>
              </div>
              <div className={`${staticLabelClass} mb-2`}>
                <p className="mb-0">Password:</p>
              </div>
              <div className={staticDataClass}>
                <strong>******</strong>
              </div>
              <div className={`${staticLabelClass} mb-2`}>
                <p className="mb-0">First name:</p>
              </div>
              <div className={staticDataClass}>
                <strong>{player.firstName  || "-"}</strong>
              </div>
              <div className={`${staticLabelClass} mb-2`}>
                <p className="mb-0">Last name:</p>
              </div>
              <div className={staticDataClass}>
                <strong>{player.lastName  || "-"}</strong>
              </div>
              <div className={staticLabelClass}>
                <p className="mb-0">Driver license:</p>
              </div>
              <div className={staticDataClass}>
                <strong>{player.driverLicense || "-"}</strong>
              </div>
            </div>
          ) : (
            <CustomerDetailsForm
              initialValues={editFormInitialVals}
              onSubmit={onUpdateSubmit}
              player={player}
              styles={{
                gridClass,
                staticLabelClass,
                staticDataClass
              }}
            />
          )}
          <div className={gridClass}>
            <div className={staticLabelClass}>
              <p className="mb-0">Available time:</p>
            </div>
            <div className={staticDataClass}>
              <strong>
                {player.availableTime ? player.availableTime : numeral(player.freeEntries).format("00:00:00")}
              </strong>
            </div>
            <div className={staticLabelClass}>
              <p className="mb-0">Free entries:</p>
            </div>
            <div className={staticDataClass}>
              <strong>{player.freeEntries}</strong>
            </div>
            <div className={staticLabelClass}>
              <p className="mb-0">Win Points:</p>
            </div>
            <div className={staticDataClass}>
              <strong>{player.winPoints}</strong>
            </div>
          </div>
        </div>
        <div className="my-3">
          <div className="col-md-12 text-right">
            <ReactToPrint
              trigger={() => (
                <Button className="btn btn-lg btn-info p-3 mr-3" type="button">
                  <FontIcon className="fa-print mr-2" />
                  Print card
                </Button>
              )}
              content={() => this.componentRef}
            />
            {saveEditBtn}
            {cancelTransactionBtn}
          </div>
        </div>
        <div className="print">
          <CustomerDetailsPrint
            {...this.props}
            paymentMode="none"
            ref={el => (this.componentRef = el)}
          />
        </div>
      </CustomCard>
    );
  }
}

export default connect(null, dispatch => ({ dispatch }))(CustomerDetails);
