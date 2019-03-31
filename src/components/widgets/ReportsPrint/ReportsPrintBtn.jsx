import React, { Component } from "react";
import { Button } from "reactstrap";
import ReactToPrint from "react-to-print";
import numeral from 'numeral';

import FontIcon from "components/widgets/FontIcon/FontIcon";
import ReportsPrint from "./ReportsPrint";

class ReportsPrintBtn extends Component {
  
  render() {
    const { data } = this.props;

    return ([
      <ReactToPrint
        key="0"
        trigger={() => (
          <div
            className="fa fa-print p-3 ml-auto border-left pointer">
          </div>
        )}
        content={() => this.componentRef}
      />,

      <div className="print" key="1">
        <ReportsPrint
          data={data}
          ref={el => (this.componentRef = el)}
        />
      </div>
    ]);
  }
}

export default ReportsPrintBtn;
