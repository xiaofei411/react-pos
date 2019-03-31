import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { InputGroup, Label } from 'reactstrap';
import CustomCard from 'components/widgets/CustomCard/CustomCard';

let InternetTimeSetting = props => {
  const { handleSubmit } = props;
  const labelClass = 'w-50 text-center mb-0 py-1 border  border-right-0 bg-light';

  return (
    <form>
      <CustomCard
        header={{
          icon: 'fa-question-circle',
        }}
        footer={{
          class: 'd-flex justify-content-end',
          btnReset: true,
          btnSave: true
        }}
      >
        <div className="d-flex p-3 mb-3">
          <InputGroup className="w-50 mb-3 pr-1">
            <Label className={labelClass} for="name">
              Time expiration <i>(days)</i>:
            </Label>
            <Field
              name="name"
              component="input"
              type="text"
              className="w-50"
              id="name"/>
          </InputGroup>
          <InputGroup className="w-50 mb-3 pl-1">
            <Label className={labelClass} for="surname">
              Price per hour:
            </Label>
            <Field
              name="surname"
              component="input"
              type="text"
              className="w-50"
              id="surname"/>
          </InputGroup>
        </div>
      </CustomCard>
    </form>
  )
}

InternetTimeSetting = reduxForm({
  form: 'InternetTimeSetting'
})(InternetTimeSetting)

export default InternetTimeSetting;