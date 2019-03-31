import React, {Component} from 'react';

class Version extends Component {
  render() {
    const { className } = this.props;

    return (
      <div className={className}>
        ver. 2.1.3
      </div>
    )
  }
}

export default Version;
