import React from "react";
import { Field, reduxForm } from "redux-form";
import { InputGroup, Label } from "reactstrap";
import CustomCard from "components/widgets/CustomCard/CustomCard";

import { container, customFieled } from "components/forms/base";
import { editUser as validationRule } from "data/validation/rules";

let CustomerDetailsForm = props => {
  const { player, styles, handleSubmit } = props;
  const labelClass = `${styles.staticLabelClass} mb-0 pt-2 pointer`;

  return (
    <form className={`${styles.gridClass}`} onSubmit={handleSubmit}>
      <div className={styles.staticLabelClass}>
        <p className="mb-0">User number:</p>
      </div>
      <div className={styles.staticDataClass}>
        <strong>{player.playerLabel}</strong>
      </div>
      <Field
        name="email"
        component={customFieled}
        type="text"
        wrapClassName="m-0"
        inputClassName="w-60 border outline-0 mt-1"
        errorClassName="d-block invalid-feedback text-right"
        id="email"
      >
        <Label className={labelClass} for="email">
          E-mail:
        </Label>
      </Field>
      <Field
        name="phoneNum"
        component={customFieled}
        type="tel"
        wrapClassName="m-0"
        inputClassName="w-60 border outline-0 mt-1"
        errorClassName="d-block invalid-feedback text-right"
        id="phoneNum"
      >
        <Label className={labelClass} for="phoneNum">
          Phone Number:
        </Label>
      </Field>
      <Field
        name="password"
        component={customFieled}
        type="text"
        wrapClassName="m-0"
        inputClassName="w-60 border outline-0 mt-1"
        errorClassName="d-block invalid-feedback text-right"
        placeholder="******"
        id="password"
      >
        <Label className={labelClass} for="password">
          Password:
        </Label>
      </Field>
      <Field
        name="firstName"
        component={customFieled}
        type="text"
        wrapClassName="m-0"
        inputClassName="w-60 border outline-0 mt-1"
        errorClassName="d-block invalid-feedback text-right"
        id="firstName"
      >
        <Label className={labelClass} for="firstName">
          First name:
        </Label>
      </Field>
      <Field
        name="lastName"
        component={customFieled}
        type="text"
        wrapClassName="m-0"
        inputClassName="w-60 border outline-0 mt-1"
        errorClassName="d-block invalid-feedback text-right"
        id="lastName"
      >
        <Label className={labelClass} for="lastName">
          Last name:
        </Label>
      </Field>
      <Field
        name="driverLicense"
        component={customFieled}
        type="text"
        wrapClassName="m-0"
        inputClassName="w-60 border outline-0 mt-1"
        errorClassName="d-block invalid-feedback text-right"
        id="driverLicense"
      >
        <Label className={labelClass} for="driverLicense">
          Driver license:
        </Label>
      </Field>
    </form>
  );
};

export const formName = "CustomerDetailsForm";
export default container(CustomerDetailsForm, formName, validationRule);
