import React from 'react'
import {Button, Input, Icon} from 'semantic-ui-react';
import {Mutation} from 'react-apollo'
import {ADD_MENU} from './graphql'
import {query} from '../RestaurantProfile/graphql'
class Modal extends React.Component {
  state = {
    type: ''
  }
  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }
  handleCreateMenu = (e, mutation) => {
    mutation({
      variables: {
        restaurant_id: localStorage['id'],
        type: this.state.type
      }
    })
  }
  render () {
    return (
      <div className={`restaurant_menu__modal${this.props.modal ? ' active' : ''}`}>
        <div className="restaurant_menu__modal__container">
          <div className="restaurant_menu__modal__header">
            <span>Adicionar Cardápio</span>
            <span className="close" onClick={this.props.closeModal}></span>
          </div>
          <div className="restaurant_menu__modal__content">
            <Input type="text" placeholder={'Tipo de cardápio'} onChange={this.handleChange} value={this.state.type} name={'type'} />
          </div>
          <div className="restaurant_menu__modal__footer">
            <Mutation mutation={ADD_MENU} refetchQueries={[{query: query, variables: {id: localStorage['id']}}]}>
              {(ADD_MENU, {called, loading, error, data}) => (
                <Button labelPosition={'right'} icon onClick={(e) => this.handleCreateMenu(e, ADD_MENU)}>
                  {!called && <Icon name='send' />}
                  {called && loading && !error && <Icon name='circle notched' loading />}
                  {called && !loading && error && <Icon name='exclamation triangle' />}
                  {called && !loading && !error && <Icon name='check circle outline' />}
                  {(called && !loading && !error) && this.props.closeModal()}
                  Enviar
            </Button>
              )}
            </Mutation>
          </div>
        </div>
      </div>
    )
  }
}

export default Modal