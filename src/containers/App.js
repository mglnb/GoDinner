import React, { Component } from 'react'
import RestaurantContainer from './RestaurantContainer'
import { Switch, Route } from "react-router"
import { HashRouter } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import './App.scss'
import LoginContainer from './LoginContainer';
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
const secret = new ApolloClient({
  uri: "https://godinner-backend.herokuapp.com/graphql/secret"
});


const client = new ApolloClient({
  uri: "https://godinner-backend.herokuapp.com/graphql"
});
class App extends Component {
  state = { visible: true }

  toggleVisibility = () => this.setState({ visible: !this.state.visible })

  render () {
    const { visible } = this.state
    return (
      <div>
        <HashRouter>
          <ApolloProvider client={client}>
            <Route path='/' component={LoginContainer} />
          </ApolloProvider>
        </HashRouter>
        <Sidebar visible={window.location.pathname == '/' ? false : visible}>
          <HashRouter>
            <ApolloProvider client={client}>
              <Switch>
                {/*<Route exact path='/' component={Home}/>*/}
                <Route path='/restaurant/:param' component={RestaurantContainer} />
                <Route path='/restaurant/' component={RestaurantContainer} />
                <Route path='/client' />
              </Switch>
            </ApolloProvider>
          </HashRouter>
        </Sidebar>
      </div>

    )
  }
}

export default App
