import React from 'react';
import { Field, reduxForm } from 'redux-form';
import CustomCard from 'components/widgets/CustomCard/CustomCard';
import Switch from 'components/widgets/Switch/Switch';

let PreReveal = props => {
  const { handleSubmit } = props;
  
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
        <Switch
          wrapperClass="d-flex justify-content-center p-3"
          label="Status Pre Reveal:"
          title1="ENABLED"
          title2="DISABLED"
          name="value"
          disabled={true}/>
          <p className='text-center'>Not Available</p>
      </CustomCard>
    </form>
  )
}

PreReveal = reduxForm({
  form: 'PreReveal'
})(PreReveal)

export default PreReveal;