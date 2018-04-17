import React, { Component } from 'react'
import RestaurantContainer from './RestaurantContainer'
import { HashRouter, Switch, Route } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import './App.scss'
import LoginContainer from './LoginContainer';
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';
const client = new ApolloClient({
  uri: "https://godinner-backend.herokuapp.com/graphql"
});

// TODO Arrumar para fazer requisição autenticado.
const secret = new ApolloClient({
  uri: 'https://godinner-backend.herokuapp.com/graphql/secret',
  cache: InMemoryCache()
});

class App extends Component {
  state = { visible: true }

  toggleVisibility = () => this.setState({ visible: !this.state.visible })

  render () {
    const { visible } = this.state
    return (
      <HashRouter>
        <Route render={(location) => (
          <Sidebar location={location} visible={location.location.pathname === '/' ? false : visible}>
            <ApolloProvider client={client} >
              <Route exact path='/' component={LoginContainer} />
            </ApolloProvider>
            <ApolloProvider client={secret}>
              <Switch>
                {/*<Route exact path='/' component={Home}/>*/}
                <Route path='/restaurant/:param' component={RestaurantContainer} />
                <Route path='/restaurant/' component={RestaurantContainer} />
                <Route path='/client' />
              </Switch>
            </ApolloProvider>
          </Sidebar>
        )} />
      </HashRouter>
    )
  }
}

export default App
