import LoginContainer from '../containers/LoginContainer';
import ClientFeed from '../components/ClientFeed/index.js'

export default [
  {
    exact: true,
    path: '/',
    component: LoginContainer
  }, {
    exact: true,
    path: '/client',
    component: ClientFeed
  }
]