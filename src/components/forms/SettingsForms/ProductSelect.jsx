import React from 'react';
import { Field, reduxForm } from 'redux-form';
import CustomCard from 'components/widgets/CustomCard/CustomCard';
import Switch from 'components/widgets/Switch/Switch';

let ProductSelect = props => {
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
          label="Type:"
          title1="INTERNET TIME"
          title2="OWNER PRODUCTS"
          name="value" />
      </CustomCard>
    </form>
  )
}

ProductSelect = reduxForm({
  form: 'ProductSelect'
})(ProductSelect)

export default ProductSelect;