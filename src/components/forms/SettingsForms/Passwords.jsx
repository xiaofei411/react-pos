import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Alert, InputGroup, Label } from 'reactstrap';
import CustomCard from 'components/widgets/CustomCard/CustomCard';
import Switch from 'components/widgets/Switch/Switch';

let Passwords = props => {
  const { handleSubmit } = props;
  const labelClass = 'w-25 text-center mb-0 py-1 border  border-right-0 bg-light';

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
        <Alert color="primary">
          <p>Here you can decide wheather or not use a common password for you customers, this password will affect only customer logins and customer`s creation when using swipecards via Pos and Customer Terminal</p>
        </Alert>
        <Switch
          wrapperClass="d-flex justify-content-center p-3"
          label="Use custom password:"
          title1="YES"
          title2="NO"
          name="value" />
          <InputGroup className="w-100 mb-3 px-3 justify-content-center">
            <Label className={labelClass} for="password">
              Password
            </Label>
            <Field
              name="password"
              component="input"
              type="text"
              className="w-50"
              id="password"/>
          </InputGroup>
      </CustomCard>
    </form>
  )
}

Passwords = reduxForm({
  form: 'Passwords'
})(Passwords)

export default Passwords;