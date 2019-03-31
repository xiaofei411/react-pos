import React from 'react';
import CalcInput from 'components/widgets/Calculator/CalcInput';
import CalcControls from 'components/widgets/Calculator/CalcControls';

import { container } from 'components/forms/base';
import { paymentCredits as validationRule } from 'data/validation/rules';

let PromoCredits = props => {
  const { handleSubmit, buttons, onTemplateButtonClick, reset } = props;

  return (
    <form onSubmit={handleSubmit}>
      <CalcInput
        onResetButtonClick={reset}/>
      <CalcControls
        buttons={buttons}
        btnClassName="btn btn-success w-100 btn-lg btn-square"
        onButtonClick={onTemplateButtonClick}  />
    </form>
  )
}

export const formName = 'PromoCredits';

export default container (PromoCredits, formName, validationRule);