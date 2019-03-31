import React from 'react';
import FontIcon from 'components/widgets/FontIcon/FontIcon';

class CalcControls extends React.Component {

  render() {
    const { buttons, btnClassName, onButtonClick, labelClassName } = this.props;

    const content = buttons.map((button, id) =>
      <div key={id} className="w-30 m-1">
        <span className={labelClassName}>{button.label}</span>
        <button
          type="button"
          value={button.value}
          className={btnClassName}
          onClick={onButtonClick}>
          {button.text}{button.value}
        </button>
      </div>
    );

    return (
      <div className="d-flex justify-content-between flex-row flex-wrap">
        {content}
      </div>
    );
  }
}

export default CalcControls;