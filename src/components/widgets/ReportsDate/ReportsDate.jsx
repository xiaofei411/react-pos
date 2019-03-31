import React from "react";
import DatePicker from 'react-datepicker';
import moment from 'moment';
import { Button } from 'reactstrap';

import 'react-datepicker/dist/react-datepicker.css';

class ReportsDate extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      dateFrom: moment(),
      dateTo: moment(),
    };
  }

  componentDidMount() {
    const { dateFrom, dateTo } = this.props;

    this.dateFromChange(this.dateFormater(dateFrom))
    this.dateToChange(this.dateFormater(dateTo))
  }

  componentWillReceiveProps(nextProps) {
    const { dateFrom, dateTo } = nextProps;

    this.dateFromChange(this.dateFormater(dateFrom))
    this.dateToChange(this.dateFormater(dateTo))
  }

  dateFormater = (date) => {
    const dateToDate = new Date(date);
    return moment(dateToDate)
  }

  dateFromChange = (date) => {
    this.setState({
      dateFrom: date
    });
  }

  dateToChange = (date) => {
    this.setState({
      dateTo: date
    });
  }

  submitHandler = () => {
    const { dateFrom, dateTo } = this.state;

    const fromDate = dateFrom.format('L') + " " + dateFrom.format('HH:mm');
    const toDate = dateTo.format('L') + " " + dateTo.format('HH:mm');  

    this.props.getInfo(fromDate, toDate)
  }

  render() {
    return (
      <div className="mb-2 d-flex flex-row flex-wrap">
        <strong className="mobile_d-block">Reference period: </strong>
        <div className="mx-2 mb-2 d-flex">
          <span className="mr-2">From:</span>
          <DatePicker
            selected={moment(this.state.dateFrom)}
            openToDate={moment(this.state.dateFrom)}
            onChange={this.dateFromChange}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={30}
            dateFormat="MM/DD/YYYY h:mm a"
            timeCaption="time"
          />
        </div>
        <div className="mx-2 mb-2 d-flex">
          <span className="mr-2">To:</span>
          <DatePicker
            selected={moment(this.state.dateTo)}
            openToDate={moment(this.state.dateTo)}
            onChange={this.dateToChange}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={30}
            dateFormat="MM/DD/YYYY h:mm a"
            timeCaption="time"
          />
        </div>
        <Button
          size="lg"
          color="primary"
          onClick={this.submitHandler}>
          Get reports
        </Button>
      </div>
    );
  }
}

export default ReportsDate;
