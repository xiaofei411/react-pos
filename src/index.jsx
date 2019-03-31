import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import axios from 'axios';

import ScrollToTop from 'components/widgets/ScrollToTop/ScrollToTop';
import ScreenSizeController from 'components/widgets/ScreenSizeController/ScreenSizeController';
import Layout from 'components/layout/Full/Full';

import Login from 'views/Login/Login';
import Dashboard from 'views/Dashboard/Dashboard';
import Customers from 'views/Customers/Customers';
import Customer from 'views/Customer/Customer';
import Reports from 'views/Reports/Reports';
// import Settings from 'views/Settings/Settings';
import Cashiers from 'views/Cashiers/Cashiers';

import store from './store';

// Import Flag Icons Set
import 'flag-icon-css/css/flag-icon.min.css';
// Import Font Awesome Icons Set
import 'font-awesome/css/font-awesome.min.css';
// Import Simple Line Icons Set
import 'simple-line-icons/css/simple-line-icons.css';
// Import Main styles for this application
import './scss/style.scss'
// Temp fix for reactstrap
import './scss/core/_dropdown-menu-right.scss'

window.axios = axios;

ReactDOM.render((
  <Provider store={store}>
    <HashRouter>
      <Switch>
        <ScrollToTop>
          <ScreenSizeController />

          <Route path="/" name="Login" component={Login} />

          <Layout>
            <Switch>
              <Route path="/dashboard" name="Dashboard" component={Dashboard} />
              <Route path="/customer/:customerId" name="Customer" component={Customer} />
              <Route path="/customers" name="Customers" component={Customers} />
              <Route path="/reports" name="Reports" component={Reports} />
              {/* <Route path="/settings" name="Settings" component={Settings} /> */}
              <Route path="/cashiers" name="Cashiers" component={Cashiers} />
              <Redirect from="/" to="/dashboard" />
            </Switch>
          </Layout>
        </ScrollToTop>
      </Switch>
    </HashRouter>
  </Provider>
), document.getElementById('root'));
