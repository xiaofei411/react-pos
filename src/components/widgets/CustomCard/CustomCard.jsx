import React, { Component } from 'react';
import { Collapse, Card, CardBody } from 'reactstrap';

import HeaderWrapper from './HeaderWrapper';
import FooterWrapper from './FooterWrapper';

class CustomCard extends Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      collapse: this.props.isCollapsed ? this.props.collapse : true,
      isCollapsed: this.props.isCollapsed
    };
  }

  componentWillReceiveProps(nextProps) {   
    if (this.props === nextProps) {
      return
    }
    
    this.setState({
      collapse: nextProps.isCollapsed ? nextProps.collapse : true,
      isCollapsed: nextProps.isCollapsed
    });
  }

  toggle(e) {
    const {disableClick, collapseCallback} = this.props;

    if (disableClick) {
      return
    }

    const elem = e.target.className;
    const isAlowed = !elem.includes('fa-download') && !elem.includes('csv-link') && !elem.includes('fa-refresh');

    if (typeof collapseCallback === 'function' && isAlowed) { 
      collapseCallback(!this.state.collapse);
      return
    }

    if (this.state.isCollapsed && isAlowed) {
      this.setState({ collapse: !this.state.collapse });
    }
  }

  render() {
    const mainClass= this.props.mainClass;
    const header = this.props.header;
    const content = this.props.children;
    const footer = this.props.footer;

    return (
      <Card className={mainClass}>
        {header &&
          <HeaderWrapper
            settings={header}
            isEnabled={!this.props.disableClick}
            cardToggler={this.toggle} />
        }
        <Collapse isOpen={this.state.collapse}>
          <CardBody className="p-0">
            {content}
          </CardBody>
        </Collapse>
        {footer &&
          <FooterWrapper settings={footer} />
        }
      </Card>
    )
  }
}

// TODO add PropTypes

export default CustomCard;
