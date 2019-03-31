import React from 'react';
import { reduxForm } from 'redux-form';
import { Alert, ListGroup, ListGroupItem } from 'reactstrap';

let TimeZone = props => {
  const { handleSubmit } = props;
  
  return (
    <form>
      <Alert color="warning">
        <h2>Warning!</h2>
        <p>the time zone offset detected in your browser is different from the associsted to your account, pleasse contact your supplier</p>
      </Alert>
      <ListGroup>
        <ListGroupItem
          className="d-flex justify-content-between"
          tag="button"
          action>
          <span>Your browser time</span>
          <strong>11:33:35 AM</strong>
        </ListGroupItem>
        <ListGroupItem
          className="d-flex justify-content-between"
          tag="button"
          action>
          <span>Your timezone offset</span>
          <span>GMT-7</span>
        </ListGroupItem>
        <ListGroupItem
          className="d-flex justify-content-between"
          tag="button"
          action
          color="secondary">
          <span>Detected offset</span>
          <span> GMT-5</span>
        </ListGroupItem>
      </ListGroup>
    </form>
  )
}

TimeZone = reduxForm({
  form: 'TimeZone'
})(TimeZone)

export default TimeZone;