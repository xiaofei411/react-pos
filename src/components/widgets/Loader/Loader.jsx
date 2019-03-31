import React, {Component} from 'react';
import Version from 'components/widgets/VersionWrapper/Version';

class Loader extends Component {
  render() {
    const { isShown, wrapperClass, imageClass, textClass } = this.props;
    
    const imageClassMod = `${imageClass} loader__img`;
    const textClassMod = `${textClass} loader__text`;
    
    if (isShown) {
      return (
        <div className={wrapperClass}>
          <img src={require("img/pre_img.png")} className={imageClassMod}/>
          <p className={textClassMod}>Please wait...</p>
        </div>
      )
    }

    return null
  }
}

export default Loader;