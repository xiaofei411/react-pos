import React, { Component } from "react";
import FontIcon from "components/widgets/FontIcon/FontIcon";
import { signOut } from "actions/auth";
import { connect } from "react-redux";

class LogoutBtn extends Component {
  logout = () => this.props.signOut();

  render() {
    return (
      <button
        className="mx-3 p-2 bg-white border text-dark"
        onClick={() => this.logout()}
      >
        <FontIcon className="fa-sign-out" /> Logout
      </button>
    );
  }
}

export default connect(
  state => ({
    state
  }),
  dispatch => ({
    signOut: () => dispatch(signOut())
  })
)(LogoutBtn);
