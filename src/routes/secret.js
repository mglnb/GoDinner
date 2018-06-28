import RestaurantContainer from '../containers/RestaurantContainer'
import RestaurantProfile from '../components/RestaurantProfile'
import RestaurantPosts from '../components/RestaurantPosts'
import RestaurantMenu from '../components/RestaurantMenu'
import RestaurantTables from '../components/RestaurantTables'
import RestaurantOrders from '../components/RestaurantOrders'
import RestaurantBookings from '../components/RestaurantBookings'
import RestaurantDashboard from '../components/RestaurantDashboard'
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
    component: RestaurantDashboard
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
    component: RestaurantBookings
  },
  {
    path: '/restaurant/pedidos',
    component: RestaurantOrders
  },
  {
    path: '/restaurant/cardapios',
    component: RestaurantMenu
  },
  {
    path: '/restaurant/mesas',
    component: RestaurantTables
  },

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