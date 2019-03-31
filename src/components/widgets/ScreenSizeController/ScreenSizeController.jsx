import React, { Component } from 'react';
import { connect } from 'react-redux';

import { defineSize, resize } from 'actions/window';
import { getWindowData } from 'data/selectors/window';

class ScreenSizeController extends Component {
  componentDidMount() {
    this.getScreenSize();
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    // clean up listeners
    window.removeEventListener('resize', this.handleResize);
  }

  handleResize = () => {
    const { windowData } = this.props;
    const screenSize = {
      width: windowData.height,
      height: windowData.width,
      orientation: !windowData.orientation
    };

    this.props.dispatch(
      resize(screenSize)
    )
  }

  getScreenSize = () => {
    const screenSize = {
      width: window.innerWidth,
      height: window.innerHeight,
      orientation: this.defineOrientation(window.innerWidth, window.innerHeight),
      isMobile: this.defineDevice(window.innerWidth),
    };

    this.props.dispatch(
      defineSize(screenSize)
    )
  }

  defineOrientation = (width, height) => {
    if (width < height) {
      return false
    }
    return true
  }

  defineDevice = (width) => {
    if (width < 500) {
      return true
    }
    return false
  }
  
  render() {
    return null;
  }

}

export default connect(

  state => {
    return {
      windowData: getWindowData(state),
    }
  },

  dispatch => ({
    dispatch
  })

)(ScreenSizeController);
