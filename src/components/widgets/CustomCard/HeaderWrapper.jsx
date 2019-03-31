import React, { Component } from 'react';
import { CardHeader, Badge } from 'reactstrap';
import SearchForm from 'components/forms/SearchForm';
import FontIcon from 'components/widgets/FontIcon/FontIcon';
import CsvConverter from 'components/widgets/CsvConverter/CsvConverter';
import ReportsPrintBtn from "components/widgets/ReportsPrint/ReportsPrintBtn";

class HeaderWrapper extends Component {

  render() {
    const settings = this.props.settings;

    const headerClass = `p-0 d-flex flex-row flex-nowrap ${settings.class ? settings.class : ''}`;
    const headerIconClass = `mobile_order-1 p-3 border-right fa ${settings.icon}`;
    const refreshClass = `p-3 ml-auto border-left fa fa-refresh pointer ${settings.refresh && settings.refresh.isRefreshing ? 'rotation' : ''} ${settings.refresh && settings.refresh.className}`;

    return (
      <CardHeader className={headerClass} onClick={(e) => this.props.cardToggler(e)}>
        {settings.icon &&
          <div className={headerIconClass}></div>
        }

        {settings.csv && this.props.isEnabled &&
          <CsvConverter
            headers={settings.csv.headers}
            data={settings.csv.data}
            filename={settings.csv.filename}
            className={headerIconClass}
            dataGetter={settings.csv.dataGetter}
            currentTableData={settings.csv.currentTableData}/>
        }

        <div className="p-3 mobile_order-1">
          <strong>{settings.title}</strong>
          <span className="font-italic">{settings.subTitle}</span>
          {settings.badge &&
            <Badge color="danger" className="ml-2" pill>{settings.badge}</Badge>
          }
        </div>

        {settings.search &&
          <SearchForm
            className="p-2 ml-auto mobile_ml-0 mobile_w-100"
            onSubmit={settings.onSearchChanged}
            onReset={settings.onSearchReset}
          />
        }

        {settings.secondTitle &&
          settings.secondTitle
        }

        {settings.refresh &&
          <div
            className={refreshClass}
            onClick={() => settings.refresh.getter(1, 10)}>
          </div>
        }

        {typeof settings.printedData === 'object' &&
          <ReportsPrintBtn data={settings.printedData} />
        }
      </CardHeader>
    )
  }
}

// TODO add PropTypes

export default HeaderWrapper;
