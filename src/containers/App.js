import React, { Component } from 'react'
import RestaurantContainer from './RestaurantContainer'
import { Switch, Route } from "react-router"
import { HashRouter } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import './App.scss'


class App extends Component {
  state = { visible: true }

  toggleVisibility = () => this.setState({ visible: !this.state.visible })

  render () {
    const { visible } = this.state
    return (
      <Sidebar visible={visible}>
        <HashRouter>
          <Switch>
            {/*<Route exact path='/' component={Home}/>*/}
            <Route path='/restaurant/:param' component={RestaurantContainer} />
            <Route path='/restaurant/' component={RestaurantContainer} />
            <Route path='/client' />
          </Switch>
        </HashRouter>
      </Sidebar>
    )
  }
}

export default App
