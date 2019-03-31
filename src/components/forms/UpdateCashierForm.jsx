import React from "react";
import { Field, reduxForm } from "redux-form";
import { InputGroup, Label } from "reactstrap";

import { container, customFieled, customTextarea } from "components/forms/base";
import { editCashier as validationRule } from "data/validation/rules";

let UpdateCashierForm = props => {
  const { cashier, styles, handleSubmit } = props;
  const labelClass = `${styles.staticLabelClass} mb-0 pt-2 pointer`;
  const inputClassName = "w-60 border outline-0 mt-1";
  const errorClassName = "d-block invalid-feedback text-right";

  return (
    <form onSubmit={handleSubmit}>
      <div className={labelClass}>
        <p className="mb-0">Login:</p>
      </div>
      <div className={styles.staticDataClass}>
        <strong>{cashier.loginName}</strong>
      </div>
      <Field
        name="cachierName"
        component={customFieled}
        type="text"
        wrapClassName="m-0"
        inputClassName={inputClassName}
        errorClassName={errorClassName}
        id="label"
      >
        <Label className={labelClass} for="label">
          Name:
        </Label>
      </Field>
      <Field
        name="password"
        component={customFieled}
        type="text"
        wrapClassName="m-0"
        inputClassName={inputClassName}
        errorClassName={errorClassName}
        id="password"
      >
        <Label className={labelClass} for="password">
          Password:
        </Label>
      </Field>
      <Field
        name="info"
        component={customFieled}
        type="text"
        wrapClassName="m-0"
        inputClassName={inputClassName}
        errorClassName={errorClassName}
        id="info"
        disabled={true}
      >
        <Label className={labelClass} for="info">
          Info:
        </Label>
      </Field>
    </form>
  );
};

export const formName = "UpdateCashierForm";
export default container(UpdateCashierForm, formName, validationRule);
