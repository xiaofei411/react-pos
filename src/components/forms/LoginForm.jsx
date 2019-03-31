import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Field, reduxForm } from "redux-form";
import { Form, InputGroup, InputGroupAddon, Button } from "reactstrap";
import FontIcon from "components/widgets/FontIcon/FontIcon";
import Version from 'components/widgets/VersionWrapper/Version';

import { container, customFieled } from "components/forms/base";
import { signIn as validationRule } from "data/validation/rules";

import Captcha from "components/forms/Captcha"

const LoginForm = props => {
  const { handleSubmit, anyTouched, valid, submitFailed, error, isCaptchaShown } = props;

  return (
    <Form className="mt-2" onSubmit={handleSubmit}>
      {submitFailed &&
        error && (
          <strong className="error invalid-feedback d-block mb-3">
            {error}
          </strong>
        )}
      <InputGroup className="mb-3">
        <Field
          name="username"
          component={customFieled}
          type="text"
          placeholder="Username"
          inputClassName="form-control border-dark"
          wrapClassName="d-flex m-0 w-100"
          errorClassName="d-block invalid-tooltip"
        >
          <InputGroupAddon
            addonType="prepend"
            className="input-group-text bg-dark text-light border-dark"
          >
            <FontIcon className="icon-user" />
          </InputGroupAddon>
        </Field>
      </InputGroup>
      <InputGroup className="mb-3">
        <Field
          name="password"
          component={customFieled}
          type="password"
          placeholder="Password"
          inputClassName="form-control border-dark"
          wrapClassName="d-flex m-0 w-100"
          errorClassName="d-block invalid-tooltip"
        >
          <InputGroupAddon
            addonType="prepend"
            className="input-group-text bg-dark text-light border-dark"
          >
            <FontIcon className="icon-lock" />
          </InputGroupAddon>
        </Field>
      </InputGroup>
      {isCaptchaShown &&
        <Field name='captcharesponse' component={Captcha}/>
      }
      <div className="d-flex justify-content-between">
        <Button
          color="dark"
          className="px-4"
          type="submit"
          disabled={anyTouched && !valid}
        >
          <FontIcon className="fa-sign-in mr-2" />
          Login
        </Button>
        {/* <Link to="#" className="btn btn-link text-dark">
          Forgot password?
        </Link> */}
        <Version className="text-dark text-center font-weight-bold p-2 m-0"/>
      </div>
    </Form>
  );
};

export const formName = "LoginForm";
export default container(LoginForm, formName, validationRule);
