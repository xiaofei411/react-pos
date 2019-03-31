import React from 'react';
import { Field } from 'redux-form';
import { InputGroup, InputGroupAddon, InputGroupText, Button } from 'reactstrap'
import FontIcon from 'components/widgets/FontIcon/FontIcon';

class CalcInput extends React.Component {
  
  render() {

    const { submitBtnText, onSubmitButtonClick, isSubmitDisabled, onResetButtonClick, isResetDisabled } = this.props;

    return (
      <InputGroup className="mb-2" size="lg" >
        <InputGroupAddon addonType="prepend">
          <InputGroupText className="bg-secondary">
            $
          </InputGroupText>
        </InputGroupAddon>
        <Field name="amount" component="input" type="text" className="w-50 font-size-2" />
        <InputGroupAddon addonType="append">
          <Button
            className="btn-calc-clean"
            color="secondary"
            onClick={onResetButtonClick}
            disabled={isResetDisabled}
          >
            <FontIcon className="fa-times-circle" />
          </Button>
        </InputGroupAddon>
        {submitBtnText &&
          <button
            disabled={isSubmitDisabled}
            className="btn btn-primary mt-0 ml-auto btn-lg btn-calc-submit"
            type="submit"
            onClick={onSubmitButtonClick}>
            {this.props.submitBtnText}
          </button>
        }
      </InputGroup>
    );
  }
}

export default CalcInput;