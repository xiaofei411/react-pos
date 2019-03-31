import React, { Component } from "react";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
import LoginForm from "components/forms/LoginForm";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { indexPageName, getPathByPageName } from "routes";
import { isAuthorized, failedLogin } from "data/selectors/auth";
import { signIn } from "actions/auth";
import { AUTH as authActionTypes } from 'actions';
import { throwIfServerError } from "data/validation/validator";
import { getEmployee } from 'actions/employee';

class Full extends Component {

  componentWillReceiveProps({ isAuthorized }) {
    if (isAuthorized && !this.props.isAuthorized) this.redirectAuth();
  }

  redirectAuth = () =>
    this.props.history.replace(getPathByPageName(indexPageName));

  onSignInSubmit = model => {

    return this.props
      .signIn({
        client: "Authenticated",
        username: model.username,
        password: model.password,
        grantType: "password"
      })
      .then(action => {
        if (action.type === authActionTypes.SIGN_IN_OK) {
          this.props.getEmployee({ username: model.username, saveData: true })
        }

        return throwIfServerError(action, {
          [`${action.payload.status}`]: {
            ...action.payload
          }
        });
      });
  };

  render() {
    if (this.props.isAuthorized) return null;

    const isCaptchaShown = this.props.failedLogin >= 5 ? true : false;

    return (
      <div className="app flex-row align-items-center bg-dark">
        <div className="app-body">
          <Container>
            <Row className="justify-content-center row">
              <Col md="7" lg="5">
                <Card className="p-4">
                  <CardBody>
                    <LoginForm onSubmit={this.onSignInSubmit} isCaptchaShown={isCaptchaShown} />
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

const Login = connect(
  state => ({
    isAuthorized: isAuthorized(state),
    failedLogin: failedLogin(state)
  }),
  dispatch => ({
    signIn: m => dispatch(signIn(m)),
    getEmployee: n => dispatch(getEmployee(n)),
    setUserData: m => dispatch(setUserData(m))
  })
)(Full);

export default withRouter(Login);
