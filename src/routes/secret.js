import RestaurantContainer from '../containers/RestaurantContainer'
import RestaurantProfile from '../components/RestaurantProfile'
import RestaurantPosts from '../components/RestaurantPosts'
import RestaurantMenu from '../components/RestaurantMenu'
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
    path: '/restaurant/dashboard',
    component: RestaurantContainer
  },
  {
    path: '/restaurant/perfil',
    component: RestaurantProfile
  },
  {
    path: '/restaurant/posts',
    component: RestaurantPosts
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
    path: '/restaurant/cardapios',
    component: RestaurantMenu
  },
  {
    path: '/restaurant/mesas',
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