import React from "react";
import { Field, reduxForm } from "redux-form";
import { Form, Button, InputGroup, FormGroup } from "reactstrap";

import { container, customFieled } from "components/forms/base";
import { createUser as validationRule } from "data/validation/rules";

const CreateUserForm = props => {
  const { handleSubmit, anyTouched, valid, error, submitFailed } = props;

  return (
    <Form className="p-3" onSubmit={handleSubmit}>
      <div className="mb-3 p-3">
        <div className="d-flex flex-wrap justify-content-between">
          <Field
            name="firstName"
            component={customFieled}
            type="text"
            placeholder="First name"
            wrapClassName="d-flex flex-column p-0 ml-1 position-relative w-45 mb-3 mobile_w-100"
            inputClassName="form-control p-3"
            errorClassName="d-block invalid-tooltip"
          />
          <Field
            name="lastName"
            component={customFieled}
            type="text"
            placeholder="Last name"
            wrapClassName="d-flex flex-column p-0 ml-1 position-relative w-45 mb-3 mobile_w-100"
            inputClassName="form-control p-3"
            errorClassName="d-block invalid-tooltip"
          />
          <Field
            name="driverLicense"
            component={customFieled}
            type="text"
            placeholder="Driver license"
            wrapClassName="d-flex flex-column p-0 ml-1 position-relative w-45 mb-3 mobile_w-100"
            inputClassName="form-control p-3"
            errorClassName="d-block invalid-tooltip"
          />
          <Field
            name="email"
            component={customFieled}
            type="text"
            placeholder="Email"
            wrapClassName="d-flex flex-column p-0 ml-1 position-relative w-45 mb-3 mobile_w-100"
            inputClassName="form-control p-3"
            errorClassName="d-block invalid-tooltip"
          />
          <Field
            name="phoneNum"
            component={customFieled}
            type="tel"
            placeholder="Phone"
            wrapClassName="d-flex flex-column p-0 ml-1 position-relative w-45 mb-3 mobile_w-100"
            inputClassName="form-control p-3"
            errorClassName="d-block invalid-tooltip"
          />
          <Field
            name="password"
            component={customFieled}
            type="text"
            placeholder="Password (Dr. License)"
            wrapClassName="d-flex flex-column p-0 ml-1 position-relative w-45 mb-3 mobile_w-100"
            inputClassName="form-control p-3"
            errorClassName="d-block invalid-tooltip"
          />
          <FormGroup className="d-flex flex-column w-30 ml-auto pr-0 mobile_w-100">
            <Button
              className="btn btn-success mt-3 p-3"
              type="submit"
              disabled={anyTouched && !valid}
            >
              + Create
            </Button>
          </FormGroup>
        </div>
      </div>
      
      {submitFailed &&
        error && (
          <strong className="error invalid-feedback d-block mb-3">
            {error}
          </strong>
        )}
    </Form>
  );
};

export const formName = "CreateUser";
export default container(CreateUserForm, formName, validationRule);
