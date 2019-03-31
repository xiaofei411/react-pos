import React, {Component} from 'react';
import {CSVLink} from 'react-csv';
import { Button } from "reactstrap";
import moment from 'moment';

import FontIcon from 'components/widgets/FontIcon/FontIcon';

class CsvConverter extends Component {

  clickHandler = () => {
    const {
      dataGetter,
      currentTableData: {
        defDataModel,
        dataModel
      },
    } = this.props; 

    dataGetter(dataModel.firstParam, dataModel.secondParam, dataModel.thirdParam, dataModel.fourthParam)
      .then(
        response => {
          this.simulateClick()
          dataGetter(defDataModel.firstParam, defDataModel.secondParam, defDataModel.thirdParam, defDataModel.fourthParam)        
        }
      )
  }

  simulateClick = () => {
    const linkEvent = new MouseEvent('click', {
      view: window,
      bubbles: true,
      cancelable: true
    });
    const linkElem = document.querySelector('.csv-link');
    linkElem.dispatchEvent(linkEvent);
  }

  render() {
    const {headers, data, filename, className, linkId} = this.props;

    return (
      <div className="mobile_order-1">
        <div
          className={`${className} fa-download`}
          onClick={() => this.clickHandler()}>
        </div>
        <CSVLink
          headers={headers}
          data={data}
          filename={`${filename}.csv`}
          className={`${linkId} csv-link`}
          >
        </CSVLink>
      </div>
    )
  }
}

export default CsvConverter;
