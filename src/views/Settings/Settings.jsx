import React, { Component } from "react";
import { connect } from "react-redux";

import View from "./View";

import TimeZone from 'components/forms/SettingsForms/TimeZone';
import ProductSelect from 'components/forms/SettingsForms/ProductSelect';
import PreReveal from 'components/forms/SettingsForms/PreReveal';
import InternetTimeSetting from 'components/forms/SettingsForms/InternetTimeSetting';
// import Passwords from 'components/forms/SettingsForms/Passwords';

class Settings extends Component {
  render() {
    return <View {...this.props} />;
  }
}

export default connect(
  state => ({
    tabContent: tabsData
  }),

  dispatch => ({
    dispatch
  })
)(Settings);

const tabsData = [
  {
    title: 'Time Zone',
    content: (<TimeZone/>)
  },
  {
    title: 'Product Select',
    content: (<ProductSelect/>)
  },
  {
    title: 'Pre reveal',
    content: (<PreReveal/>)
  },
  {
    title: 'Internet Time Settings',
    content: (<InternetTimeSetting/>)
  },
  {
    title: 'Statistics',
    content: (<h4>Statistics</h4>)
  },
  // {
  //   title: 'Common password for customers',
  //   content: (<Passwords/>)
  // },
]