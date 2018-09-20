import React from 'react';
import { Loader } from 'semantic-ui-react';
class CustomLoader extends React.Component {
  constructor() {
    super();
    this.state = { someKey: 'someValue' };
  }

  render () {
    return (
      <div className="loader">
        <Loader active className="loader_elem" inline="centered" {...this.props}>Carregando</Loader>;
      </div>
    )
  }

  componentDidMount () {
    this.setState({ someKey: 'otherValue' });
  }
}

export default CustomLoader;
