import RestaurantContainer from '../containers/RestaurantContainer/index.js'
import RestaurantProfile from '../components/RestaurantProfile'
export default [
  // {
  //   exact: true,
  //   path: '/'
  //   component: Home
  // },

  {
    exact: true,
    path: '/restaurant/',
    component: RestaurantContainer,
  },
  {
    path: '/restaurant/home',
    component: RestaurantContainer
  },
  {
    path: '/restaurant/meuperfil',
    component: RestaurantProfile
  },
  {
    path: '/restaurant/posts',
    component: RestaurantContainer
  },
  {
    path: '/restaurant/reservas',
    component: RestaurantContainer
  },
  {
    path: '/restaurant/pedidos',
    component: RestaurantContainer
  },

  {
    path: '/client/'
  }
]


// <Switch>
// {/*<Route exact path='/' component={Home}/>*/}
// <Route path='/restaurant/:param' component={RestaurantContainer} />
// <Route path='/restaurant/' component={RestaurantContainer} />
// <Route path='/client' />
// </Switch>
// </ApolloProvider>

// <ApolloProvider client={client} >
// <Route exact path='/' component={LoginContainer} />