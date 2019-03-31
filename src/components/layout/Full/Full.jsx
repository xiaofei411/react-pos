import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import Loader from 'components/widgets/Loader/Loader';
import Header from 'components/widgets/Header/Header';
import Sidebar from 'components/widgets/Sidebar/Sidebar';
import Breadcrumb from 'components/widgets/Breadcrumb/Breadcrumb';
import Footer from 'components/widgets/Footer/Footer';
import { loginPageName, getPathByPageName } from 'routes';

import { isAuthorized, authUserInfo, tokenInfo } from 'data/selectors/auth';

class Full extends Component {

  componentWillMount() {
    const { isAuthorized, history } = this.props;
    
    if (!isAuthorized)
      this.redirectNonAuth();
  }

  componentWillReceiveProps({ isAuthorized }) {
    if (!isAuthorized && this.props.isAuthorized)
      this.redirectNonAuth();
  }

  redirectNonAuth = () => this.props.history.replace(getPathByPageName(loginPageName));

  render() {

    const isCashier = this.props.authUserInfo ? this.props.authUserInfo.accountType : 1;

    const isPreloaderShown = this.props.tokenInfo ? this.props.tokenInfo.refreshing : false

    if (!this.props.isAuthorized)
      return null;

    return (
      <div className="app">
        <Loader isShown={isPreloaderShown} wrapperClass="loader-wrapper" />
        <Header />
        <div className="app-body">
          <Sidebar 
            {...this.props}
            isCashier={isCashier}
          />
          <main className="main">
            <Breadcrumb />
            <Container fluid>
           
                {this.props.children}

            </Container>
          </main>
        </div>
        <Footer user={this.props.authUserInfo || {}} />
      </div>
    );
  }
}

const Layout = connect(
  state => ({
    isAuthorized: isAuthorized(state),
    authUserInfo: authUserInfo(state),
    tokenInfo: tokenInfo(state)
  }),
  null
)(Full);

export default withRouter(Layout);
