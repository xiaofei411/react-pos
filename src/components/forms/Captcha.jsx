import React, { Component } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

class Captcha extends Component {

  captchaOnChange = (value) => {
    console.log("Captcha value:", value);
  };

  
  render() {
    const { meta } = this.props;
    const sitekeys = {
      'skyline-qa.bitglu.io': '6LeCin4UAAAAAGO02Nd4ZrmOM0houirS7z0Ed-fZ',
      'skyline-dev.bitglu.io': '6LfSGSkUAAAAACwaCS6FvmJ2wwIHzW1-9OZ4Blxg'
    };
    const key = sitekeys[window.location.hostname] || '6Le9ZV4UAAAAAHDaa3c2HTy8CR9gvmmGoEKKAiDt';
    console.log("Using captcha site key " + key)
    return(
      <div>
        {meta.touched && meta.error}
        <ReCAPTCHA
          sitekey={key}
          onChange={value => this.captchaOnChange(value)}
        />
      </div>
    )
  }
}

export default Captcha;