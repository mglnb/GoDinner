import React, { Component } from "react";
import { HashRouter, Switch, Route } from "react-router-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import Sidebar from "../components/Sidebar";
import routes, { RouteWithSubRoutes } from "../routes";
import "react-select/dist/react-select.css";

// const urlHml = "https://godinner-backend.herokuapp.com"
const urlHml =
   window.location.protocol === "https:"
     ? "https://godinner-backend.herokuapp.com"
     : "http://localhost:8000";
const secret = new ApolloClient({
  uri: urlHml + "/graphql/secret",
  request: async operation => {
    const token = await localStorage.getItem("token");
    // console.log(operation);
    operation.setContext({
      headers: {
        authorization: token
      }
    });
  }
});

const client = new ApolloClient({
  uri: urlHml + "/graphql"
});
class App extends Component {
  constructor(props) {
    super(props);
    this.state = { visible: true };
  }

  toggleVisibility = () => this.setState({ visible: !this.state.visible });

  render() {
    const { visible } = this.state;
    return (
      <HashRouter>
        <Route
          render={location => (
            <Sidebar
              location={location}
              visible={location.location.pathname.includes('restaurant') ? visible : false }
            >
              <ApolloProvider client={secret}>
                <Switch>
                  {routes.secretRoutes.map((route, i) => (
                    <RouteWithSubRoutes key={i} {...route} />
                  ))}
                </Switch>
              </ApolloProvider>

              <ApolloProvider client={client}>
                <Switch>
                  {routes.publicRoutes.map((route, i) => (
                    <RouteWithSubRoutes key={i} {...route} />
                  ))}
                </Switch>
              </ApolloProvider>
            </Sidebar>
          )}
        />
      </HashRouter>
    );
  }
}

export default App;
