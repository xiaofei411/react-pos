import React, {Component} from 'react';
import Version from 'components/widgets/VersionWrapper/Version';

class Footer extends Component {
  render() {

    const { user } = this.props;

    return (
      <footer className="app-footer">
        <div>
          <span>
            <strong>{user.accountTypeLabel}: </strong>
            {user.accountName}
          </span>
          <span>
            <strong> Store: </strong>
            {user.storeLabel}
          </span>
        </div>

        <Version className="ml-auto text-dark font-weight-bold p-2 mobile_mr-auto"/>
      </footer>
    )
  }
}

export default Footer;
