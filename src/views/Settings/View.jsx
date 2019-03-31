import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import CustomCard from 'components/widgets/CustomCard/CustomCard';

class View extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.state = {
      activeTab: '1'
    };
  }

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }
  render() {

    const { tabContent } = this.props;

    const tabsTitles = [];
    const tabsContent = [];

    for (let i = 0; i <= tabContent.length - 1; i++) {
      tabsTitles.push(
        <NavItem key={i}>
          <NavLink
            className={classnames({ active: this.state.activeTab === `${i + 1}` })}
            onClick={() => { this.toggle(`${i + 1}`); }}
          >
            {tabContent[i].title}
          </NavLink>
        </NavItem>
      );
      tabsContent.push(
        <TabPane tabId={`${i + 1}`} key={i}>
          <Row>
            <Col sm="12">
              {tabContent[i].content}
            </Col>
          </Row>
        </TabPane>
      );
    }  

    return (
      <div className="animated fadeIn">
        <Row>
          <Col md="12">
            <Nav tabs>
              {tabsTitles}
            </Nav>
            <TabContent activeTab={this.state.activeTab}>
              {tabsContent}
            </TabContent>
          </Col>
        </Row>
      </div>
    );
  }
}

View.defaultProps = {};

View.propTypes = {};

export default View;