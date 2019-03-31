import React from "react";
import PropTypes from "prop-types";
import { Field, reduxForm } from "redux-form";
import { InputGroup, InputGroupAddon, Button } from "reactstrap";
import classNames from "classnames";

import FontIcon from "components/widgets/FontIcon/FontIcon";
import { container, customFieled } from "components/forms/base";
import { searchUser as validationRule } from "data/validation/rules";

class SearchForm extends React.Component {
  render() {
    const {
      handleSubmit,
      className,
      valid,
      anyTouched,
      reset,
      size,
      onReset
    } = this.props;

    const inputClassName = `w-100 pl-1 border ${size === 'lg' ? 'font-size-2' : ''}`

    const resetForm = () => {
      reset();
      if (onReset) onReset();
    }

    return (
      <form onSubmit={handleSubmit} className={className}>
        <InputGroup size={size} className="flex-row flex-nowrap">
          <InputGroupAddon addonType="prepend">
            <Button
              className="mt-0"
              color="secondary"
              type="submit"
              disabled={!anyTouched && !valid}
            >
              <FontIcon className="fa-search" />
            </Button>
          </InputGroupAddon>
          <Field
            name="term"
            component={customFieled}
            type="text"
            inputClassName={inputClassName}
            wrapClassName="d-flex m-0 w-100"
            errorClassName="d-none"
          />
          <InputGroupAddon addonType="append">
            <Button
              className="mt-0"
              color="secondary"
              onClick={resetForm}
              disabled={!valid}
            >
              <FontIcon className="fa-times-circle" />
            </Button>
          </InputGroupAddon>
        </InputGroup>
      </form>
    );
  }
}

SearchForm.propTypes = {};

export const formName = "SearchUsersForm";
export default container(SearchForm, formName, validationRule);
