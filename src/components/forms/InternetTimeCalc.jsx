import React from 'react';

import CalcInput from 'components/widgets/Calculator/CalcInput';
import CalcControls from 'components/widgets/Calculator/CalcControls';

import { container } from 'components/forms/base';
import { internetTimeCalc as validationRule } from 'data/validation/rules';

let InternetTimeCalc = props => {
  const { buttons, onTemplateButtonClick, onSubmitButtonClick, anyTouched, valid, userAvailable, reset, isPaymentStart } = props;

  return (
    <form>
      <CalcInput
        onSubmitButtonClick={onSubmitButtonClick}
        submitBtnText="Buy"
        isSubmitDisabled={!anyTouched || !valid || !userAvailable || isPaymentStart}
        onResetButtonClick={reset}
        isResetDisabled={!anyTouched} />
      <CalcControls
        buttons={buttons}
        onButtonClick={onTemplateButtonClick}
        btnClassName="btn btn-success w-100 btn-lg btn-square" />
    </form>
  )
}

export const formName = "InternetTimeCalc";
export default container(InternetTimeCalc, formName, validationRule);