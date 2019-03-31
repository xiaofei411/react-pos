import React, { Component } from 'react';
import { Button } from 'reactstrap';

import CustomCard from 'components/widgets/CustomCard/CustomCard';
import CreateCashierForm from 'components/forms/CreateCashierForm';
import FontIcon from 'components/widgets/FontIcon/FontIcon';
import baseHoc from './hoc';

import { createCachier } from 'actions/employee';
import { EMPLOYEE as cashierActionTypes } from 'actions';
import { throwIfServerError } from 'data/validation/validator';

class CreateCashier extends Component {

  state = {
    createdCashier: false
  };

  onNewCashierSubmit = model => {
    const { dispatch } = this.props;
    const self = this;

    return dispatch(
      createCachier(model))
      .then(
        action => {
          if (action.type === cashierActionTypes.EMP_CREATE_CACHIER_OK) {
            self.setState({
              createdCashier: action.payload
            });
            return;
          } else {
            console.log("PAYLOAD: error", action.payload);
            return throwIfServerError(action);
          }
        }
      );
  }

  render() {
    const { hideModal } = this.props;

    return (
      <div>
        <CustomCard
          mainClass="mb-0"
          header={{
            title: "New casheir data",
          }}
        >
          {!this.state.createdCashier
            ? <CreateCashierForm 
                onSubmit={this.onNewCashierSubmit}
              />
            : <div className="p-3 text-center">
                <p>Cashier was created successfully!</p>
                <Button
                  color="success"
                  onClick={hideModal}
                >
                  <FontIcon className="fa-close mr-1"/>
                  Close
                </Button>
              </div>
          }
        </CustomCard>
      </div>
    );
  }
}

export default baseHoc(CreateCashier);