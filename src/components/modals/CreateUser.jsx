import React, { Component } from 'react';
import { Button } from 'reactstrap';
import { withRouter, Link } from 'react-router-dom';
import { formValueSelector, change as changeFieldValue, touch as touchFormField, getFormMeta } from 'redux-form';

import CustomCard from 'components/widgets/CustomCard/CustomCard';
import CreateUserForm, { formName as createUserFormName } from 'components/forms/CreateUserForm';
import FontIcon from 'components/widgets/FontIcon/FontIcon';
import baseHoc from './hoc';
import { createUser, getUser } from 'actions/user';
import { USER as userActionTypes } from 'actions';
import { throwIfServerError } from 'data/validation/validator';
import { indexPageName, getPathByPageName } from 'routes';

class CreateUser extends Component {

  state = {
    createdUser: null
  };

  componentWillReceiveProps(nextProps) {
    const canEdit = nextProps.formMeta.password ? false : true;
    this.setPaswordValue(nextProps.dLicenseValue, canEdit)
  }

  onNewUserSubmit = model => {
    const { dispatch, history } = this.props;
    const self = this;

    return dispatch(
      createUser(model))
      .then(
        action => {
          if (action.type === userActionTypes.USER_CREATE_OK) {
            self.setState({
              createdUser: action.payload
            });
            dispatch(getUser({
              playerNum: action.payload.playerNumber
            }));
            history.replace(getPathByPageName(indexPageName));
            return;
          } else {
            console.log("PAYLOAD: error", action.payload);
            return throwIfServerError(action);
          }
        }
      );
  }

  onOpenUserPage = () => {
    const { history, hideModal } = this.props;
    history.replace(`/customer/${this.state.createdUser.playerNumber}`);
    return hideModal();
  }

  onCreateMoreUsers = () => {
    this.setState({
      createdUser: null
    });
  }

  setPaswordValue = (val, canEdit) => {
    if (canEdit) {
      this.props.dispatch(changeFieldValue(createUserFormName, "password", val));
      return
    }
    return
  }

  render() {
    const { errors } = this.props;
    let userId = this.state.createdUser != null ? this.state.createdUser.playerNumber : null;

    return (
      <div>
        <CustomCard
          mainClass="mb-0"
          header={{
            title: "New customer",
          }}>
          {!userId  ?
            <CreateUserForm
              errors={errors}
              onSubmit={this.onNewUserSubmit}
            />
            : 
            <div className="d-flex justify-content-between p-3">
              <p className="m-0 py-1">
                Customer <FontIcon className="fa-user" /> {userId} was created successfully!
              </p>
              <div>
                <Button
                  color="primary"
                  onClick={this.onOpenUserPage}
                  className="mr-1"
                >
                  <FontIcon className="fa-user" /> {userId}
                </Button>
                <Button
                  color="success"
                  onClick={this.onCreateMoreUsers}
                >
                  Create another customer
                </Button>
              </div>
            </div>
          }
          <div className="d-flex justify-content-center p-3">
            <Button
              color="danger"
              size="lg"
              className="p-3 mobile_mt-2"
              onClick={this.props.hideModal}
              >
              <FontIcon className="fa-close mr-1"/>
              Close
            </Button>
          </div>
        </CustomCard>
      </div>
    );
  }
}

const mapState = state => {
  let createUserFormSelector = formValueSelector(createUserFormName);

  return {
    dLicenseValue: createUserFormSelector(state, 'driverLicense'),
    formMeta: getFormMeta(createUserFormName)(state)
  };
};

const WithRouteModal = withRouter(CreateUser);

export default baseHoc(WithRouteModal, mapState);