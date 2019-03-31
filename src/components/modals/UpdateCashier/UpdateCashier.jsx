import React, { Component } from 'react';

import baseHoc from 'components/modals/hoc';
import View from './View';
import * as cashierSelector from 'data/selectors/currentEmployee';
import { getEmployee, updateCachier } from 'actions/employee';
import { EMPLOYEE as employeeActionTypes } from 'actions';
import { submit } from 'redux-form';
import { formName } from 'components/forms/UpdateCashierForm';

class UpdateCashier extends Component {

  state = {
    canEdit: false,
    isActive: false
  };

  onEditClick = () => {
    this.setState({
      canEdit: true
    })
  }

  onSaveClick = () => {
    this.props.dispatch(submit(formName));
  }

  onUpdateSubmit = model => {
    const { dispatch, cashier } = this.props;
    let updatedData = {
      username: cashier.loginName,
      ...model
    }
    
    if (updatedData.password === '*******') {
      delete updatedData.password;
    }

    dispatch(updateCachier(updatedData))
    .then(
      ({ type }) => {
        if (type === employeeActionTypes.EMP_UPDATE_CACHIER_OK) {

          dispatch(getEmployee({
            username: cashier.loginName
          }))
          this.setState({ canEdit: false })
        }
      }
    );
  }

  onDeactivateClick = () => {
    this.setState({
      isActive: false
    })
  }

  onActivateClick = () => {
    this.setState({
      isActive: true
    })
  }

  render() {
    return (
      <View 
        {...this.props} 
        canEdit={this.state.canEdit}
        onEditClick={this.onEditClick}
        isActive={this.state.isActive}
        onUpdateSubmit={this.onUpdateSubmit}
        onSaveClick={this.onSaveClick}
        onDeactivateClick={this.onDeactivateClick}
        onActivateClick={this.onActivateClick}
      />
    );
  }
}

const mapState = state => {

  return {
    cashier: cashierSelector.getInfo(state),
  };
};

export default baseHoc(UpdateCashier, mapState);
