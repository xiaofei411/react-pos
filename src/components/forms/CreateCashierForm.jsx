import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Form, Button, InputGroup, FormGroup } from "reactstrap";

import { container, customFieled } from "components/forms/base";
import { createCashier as validationRule } from "data/validation/rules";


let CreateCashierForm = props => {
  const { handleSubmit, anyTouched, valid, error, submitFailed } = props;

  return (
    <Form className="p-3" onSubmit={handleSubmit}>
      <div className="d-flex justify-content-center mb-3 p-3">
        <Field
          name="cachierName"
          component={customFieled}
          type="text"
          placeholder="Cashier name"
          wrapClassName="d-flex flex-column col-3 p-0 mr-1 ml-1"
          inputClassName="form-control p-3"
          errorClassName="d-block invalid-tooltip"
        />
        <Field
          name="username"
          component={customFieled}
          type="text"
          placeholder="Cashier login name"
          wrapClassName="d-flex flex-column col-3 p-0 mr-1 ml-1"
          inputClassName="form-control p-3"
          errorClassName="d-block invalid-tooltip"
        />
        <Field
          name="password"
          component={customFieled}
          type="text"
          placeholder="Password"
          wrapClassName="d-flex flex-column col-3 p-0 mr-1 ml-1"
          inputClassName="form-control p-3"
          errorClassName="d-block invalid-tooltip"
        />
        <FormGroup className="d-flex flex-column col-3 p-0 mr-1 ml-1">
          <Button
            className="btn btn-success p-3 btn-lg"
            type="submit"
            disabled={anyTouched && !valid}
          >
            + Create
          </Button>
        </FormGroup>
      </div>

      {submitFailed &&
        error && (
          <strong className="error invalid-feedback d-block mb-3">
            {error}
          </strong>
        )
      }
    </Form>
  )
}

export const formName = "CreateCashier";
export default container(CreateCashierForm, formName, validationRule);