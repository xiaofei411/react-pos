import React, { Component } from "react";
import { reduxForm } from "redux-form";
import { FormGroup } from "reactstrap";
import classNames from "classnames";

import { validate } from "data/validation/validator";

/**
 * HOC function that contains base logic for validation and forms management.
 * @param {function} Comp - React component to be wrapped to
 * @param {string} formId - Id of the form to be displayed
 * @param {object} [validationRule] - Validation rule for the form
 * @returns {function} Extended React component
 */
export const container = (Comp, formId, validationRule) => {
  class FormContainer extends Component {
    render() {
      return <Comp {...this.props} />;
    }
  }

  let props = {
    form: formId,
    touchOnChange: true
  };

  if (validationRule) props.validate = v => validate(v, validationRule);

  return reduxForm(props)(FormContainer);
};

export const customFieled = field => {
  const inputClassList = classNames(field.inputClassName, {
    "is-invalid": field.meta.touched && !field.meta.valid
  });

  return (
    <FormGroup className={field.wrapClassName}>
      {field.children}
      <input
        {...field.input}
        type={field.type}
        className={inputClassList}
        placeholder={field.placeholder}
        autoComplete="off"
        disabled={field.disabled}
      />
      {field.meta.touched &&
        field.meta.error && (
          <em className={field.errorClassName}>{field.meta.error}</em>
        )}
    </FormGroup>
  );
};
