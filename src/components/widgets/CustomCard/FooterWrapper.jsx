import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { CardFooter } from 'reactstrap';
import FontIcon from 'components/widgets/FontIcon/FontIcon';

class FooterWrapper extends Component {

  render() {
    const settings = this.props.settings;

    return (
      <CardFooter className={settings.class}>
        {settings.link &&
          <Link to={settings.link.href} className={settings.link.class}>{settings.link.content}</Link>
        }
        {settings.btnReset &&
          <button type="button" className="btn btn-primary">
            <FontIcon className="fa-rotate-left" /> Reset
          </button>
        }
        {settings.btnSave &&
          <button type="button" className="btn btn-secondary">
            <FontIcon className="fa-save" />
            Save
          </button>
        }
      </CardFooter>
    )
  }
}

// TODO add PropTypes

export default FooterWrapper;
