import React from 'react';
import { Button, Row, Col } from 'reactstrap'
import CustomCard from 'components/widgets/CustomCard/CustomCard';
import SearchForm from 'components/forms/SearchForm';
import FontIcon from 'components/widgets/FontIcon/FontIcon';



class Calculator extends React.Component {
  
  render() {
    const { name, icon, children, isCollapsed } = this.props;    

    return (
      <CustomCard
        header={{
          title: name,
          icon: icon,
          
        }}
        isCollapsed={isCollapsed}>
        <div className="display p-3">
          {children}
        </div>
      </CustomCard>
    );
  }
}

export default Calculator;