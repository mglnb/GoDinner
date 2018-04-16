import React from 'react';
import './index.scss'
class RestaurantContainer extends React.Component {
  constructor() {
    super();
    this.state = { someKey: 'someValue' };
  }

  render() {
    return (
      <div className="restaurant_container"> 
      {this.props.match.params.param || 'oi'}
      </div>
    )
  }

  componentDidMount() {
    this.setState({ someKey: 'otherValue' });
  }
}

export default RestaurantContainer;
