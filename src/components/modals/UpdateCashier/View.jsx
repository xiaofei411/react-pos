import React from "react";
import PropTypes from "prop-types";
import { Button } from "reactstrap";

import CustomCard from "components/widgets/CustomCard/CustomCard";
import UpdateCashierForm from "components/forms/UpdateCashierForm";
import FontIcon from "components/widgets/FontIcon/FontIcon";

const View = ({
  cashier,
  canEdit,
  onEditClick,
  isActive,
  onUpdateSubmit,
  onSaveClick,
  onDeactivateClick,
  onActivateClick
}) => {
  const staticLabelClass = "d-inline-block w-40 text-right pr-2 pb-3";
  const staticDataClass = "d-inline-block w-60 pb-3";

  const buttonsData = [
    {
      text: canEdit ? "Save" : "Edit",
      color: "success",
      icon: canEdit ? "fa-save" : "fa-pencil",
      handler: canEdit ? onSaveClick : onEditClick
    },
    {
      text: isActive ? "Inactive" : "Active",
      color: isActive ? "secondary" : "primary",
      icon: isActive ? "fa-pause-circle" : "fa-play-circle",
      handler: isActive ? onDeactivateClick : onActivateClick
    }
  ];

  const buttons = buttonsData.map((button, id) => (
    <Button
      key={id}
      size="lg"
      color={button.color}
      block
      className={"mb-3"}
      onClick={button.handler}
    >
      <FontIcon className={`${button.icon} mr-2`} />
      {button.text}
    </Button>
  ));

  let editFormInitialVals = {
    password: "*******",
    cachierName: cashier.accountName,
    username: cashier.loginName
  };

  return (
    <div>
      <CustomCard
        mainClass="mb-0"
        header={{
          title: "Update casheir"
        }}
      >
        <div className="d-flex justify-spase-between p-3">
          <div className="w-60 pr-3">
            {!canEdit ? (
              <div className="pt-2">
                <div className={`${staticLabelClass} mb-2`}>
                  <p className="mb-0">Login:</p>
                </div>
                <div className={staticDataClass}>
                  <strong>{cashier.loginName}</strong>
                </div>
                <div className={`${staticLabelClass} mb-2`}>
                  <p className="mb-0">Name:</p>
                </div>
                <div className={staticDataClass}>
                  <strong>{cashier.accountName}</strong>
                </div>
                <div className={`${staticLabelClass} mb-2`}>
                  <p className="mb-0">Password:</p>
                </div>
                <div className={staticDataClass}>
                  <strong>******</strong>
                </div>
                <div className={`${staticLabelClass} mb-2`}>
                  <p className="mb-0">Info:</p>
                </div>
                <div className={staticDataClass}>
                  <strong>-</strong>
                </div>
              </div>
            ) : (
              <UpdateCashierForm
                initialValues={editFormInitialVals}
                onSubmit={onUpdateSubmit}
                cashier={cashier}
                styles={{
                  staticLabelClass,
                  staticDataClass
                }}
              />
            )}
            <div>
              <div className={`${staticLabelClass} mb-2`}>
                <p className="mb-0">Status:</p>
              </div>
              <div className={staticDataClass}>
                <strong>{cashier.statusReasonLabel}</strong>
              </div>
              <div className={`${staticLabelClass} mb-2`}>
                <p className="mb-0">Cashier since:</p>
              </div>
              <div className={staticDataClass}>
                <strong>-</strong>
              </div>
            </div>
          </div>
          <div className="w-40">{buttons}</div>
        </div>
      </CustomCard>
    </div>
  );
};

View.propTypes = {
  cashier: PropTypes.object,
  canEdit: PropTypes.bool,
  editTogler: PropTypes.func,
  onUpdateSubmit: PropTypes.func,
  onDeactivateClick: PropTypes.func,
  onDeleteClick: PropTypes.func
};

export default View;
