import React, { Component } from 'react';
import { Button } from 'reactstrap';

import CustomCard from 'components/widgets/CustomCard/CustomCard';
import FontIcon from 'components/widgets/FontIcon/FontIcon';
import baseHoc from './hoc';

class TableDetails extends Component {

  render() {
    const {
      header,
      labels,
      data
    } = this.props;

    return (
      <CustomCard
        mainClass="mb-0"
        header={{
          title: header,
        }}>
        <div className="p-2">
          {labels.map((e, key) =>
            <div key={key}>
              <strong className="d-inline-block mobile_w-40">
                {e}
              </strong>
              <span className="d-inline-block mobile_w-60 pl-2">
                {data[key]}
              </span>
            </div>
          )}
        </div>
      </CustomCard>
    );
  }
}

export default baseHoc(TableDetails);