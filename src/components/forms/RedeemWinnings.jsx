import React from 'react';

import { InputGroup, InputGroupAddon, Button } from 'reactstrap';
import FontIcon from 'components/widgets/FontIcon/FontIcon';
import CalcInput from 'components/widgets/Calculator/CalcInput';
import CalcControls from 'components/widgets/Calculator/CalcControls';
import { container } from 'components/forms/base';
import { redeemCalc as validationRule } from 'data/validation/rules';

let RedeemWinnings = props => {
  const { buttons, onTemplateButtonClick, onSubmitButtonClick, anyTouched, valid, userAvailable, reset, incorrectSum, isPaymentStart } = props;

  return (
    <form>
      <CalcInput
        onSubmitButtonClick={onSubmitButtonClick}
        submitBtnText="Redeem"
        isSubmitDisabled={!anyTouched || !valid || !userAvailable || !incorrectSum || isPaymentStart} 
        onResetButtonClick={reset}
        isResetDisabled={!anyTouched}/>
      <CalcControls
        buttons={buttons}
        btnClassName="btn btn-danger w-100 btn-lg btn-square"
        labelClassName="p-1"
        onButtonClick={onTemplateButtonClick}
      />
    </form>
  )
}

export const formName = "RedeemWinnings";
export default container(RedeemWinnings, formName, validationRule);