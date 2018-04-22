import React, {Component} from 'react'
import {HashRouter, Switch, Route} from 'react-router-dom'
import ApolloClient from 'apollo-boost'
import {ApolloProvider} from 'react-apollo'
import Sidebar from '../components/Sidebar'
import routes, {RouteWithSubRoutes} from '../routes'

const secret = new ApolloClient({
  uri: "http://localhost:8000/graphql/secret",
  request: async (operation) => {
    const token = await localStorage.getItem('token');
    operation.setContext({
      headers: {
        authorization: token,
      }
    });
  },
})

const client = new ApolloClient({
  uri: "http://localhost:8000/graphql",
});
class App extends Component {
  state = {visible: true}

  toggleVisibility = () => this.setState({visible: !this.state.visible})

  render () {
    const {visible} = this.state
    return (
      <HashRouter>
        <Route render={(location) => (
          <Sidebar location={location} visible={location.location.pathname === '/' ? false : visible}>
            <ApolloProvider client={secret}>
              <Switch>
                {routes.secretRoutes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
              </Switch>
            </ApolloProvider>

            <ApolloProvider client={client} >
              <Switch>
                {routes.publicRoutes.map((route, i) => <RouteWithSubRoutes key={i} {...route} />)}
              </Switch>
            </ApolloProvider>

          </Sidebar>
        )} />
      </HashRouter>
    )
  }
}

export default App
