import React from 'react'
import {Button, Icon, Card} from 'semantic-ui-react';
import Modal from './Modal'
class RestaurantMenu extends React.Component {
  state = {
    modal: false
  }
  openModal = () => {
    this.setState({modal: true})
  }
  closeModal = () => {
    this.setState({modal: false})
  }
  render () {
    return (
      <div className="restaurant_menu">
        <div className="restaurant_menu__container">
          <div className="restaurant_menu__header">
            <Modal modal={this.state.modal}/>
            <h1>Cardápios</h1>
            <Button basic circular className="restaurant_posts__addbutton" animated color='blue' onClick={this.openModal}>
              <Button.Content hidden>Novo</Button.Content>
              <Button.Content visible>
                <Icon name='plus' />
              </Button.Content>
            </Button>
          </div>
          <div className="restaurant_menu__main">
            <Card.Group itemsPerRow={3} style={{width: "100%"}}>
              <Card link>
                <Card.Content>
                  <Card.Header>Cárdapio de Lanches</Card.Header>
                  <Card.Meta>CIRCULUS </Card.Meta>
                  <Card.Description>Lanches tradicionais</Card.Description>
                </Card.Content>
              </Card>
              <Card link>
                <Card.Content>
                  <Card.Header>Cárdápio de Bebidas</Card.Header>
                  <Card.Meta>CIRCULUS</Card.Meta>
                  <Card.Description>Bebidas geladas</Card.Description>
                </Card.Content>
              </Card>
            </Card.Group>
          </div>
        </div>
      </div>
    )
  }
}

export default RestaurantMenu