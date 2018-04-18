import React from 'react'
import publicRoutes from './public'
import secretRoutes from './secret'
import {Route} from 'react-router-dom'
export default {
  publicRoutes,
  secretRoutes
}

export const RouteWithSubRoutes = route => (
  <Route
    path={route.path}
    exact={route.exact}
    render={props => (
      // pass the sub-routes down to keep nesting
      <route.component {...props} routes={route.routes} />
    )}
  />
);