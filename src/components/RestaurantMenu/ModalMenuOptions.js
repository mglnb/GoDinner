import React from 'react'
import {Button, Input, Icon} from 'semantic-ui-react';
import {Mutation} from 'react-apollo'
import {ADD_MENU_OPTION} from './graphql'
import {query} from '../RestaurantProfile/graphql'
import SortableList from '../SortableList'
import {arrayMove, } from 'react-sortable-hoc';

class ModalMenuOptions extends React.Component {
  state = {
    option: '',
    description: '',
    items: []
  }
  handleChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
  }
  handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.setState({
        items: [
          ...this.state.items,
          {value: this.state.option, description: this.state.description}
        ],
        option: '',
        description: ''
      })
    }
  }
  onSortEnd = ({oldIndex, newIndex}) => {
    this.setState({
      items: arrayMove(this.state.items, oldIndex, newIndex),
    });
  };
  handleCreateMenuOptions = (e, mutation) => {
    this.state.items.forEach(item => {
      mutation({
        variables: {
          restaurant_menu_id: this.props.menu.id,
          name: item.value,
          ingredients: item.description,
          price: 0.00
        }
      })
    })
  }
  removeIndex = (index) => {
    const newArray = this.state.items.filter((value, indexItem) => index !== indexItem)
    this.setState({
      items: newArray
    })
  }
  handleChangeItem = (index) => {
    const newArray = this.state.items.map((value, indexItem) => {
      return index === indexItem ? 'ae' : value
    })
    this.setState({
      items: newArray
    })
  }
  componentWillMount() {
    this.setState({items:this.props.menu.menu_options.map(option => ({value: option.name, description: option.ingredients})) }) 
  }
  render () {
    return (
      <div className={`restaurant_menu__modal${this.props.active ? ' active' : ''}`}>
        <div className="restaurant_menu__modal__container">
          <div className="restaurant_menu__modal__header">
            <span>Adicionar Opções de Pedidos</span>
            <span className="close" onClick={this.props.closeModal}></span>
          </div>
          <div className="restaurant_menu__modal__content">
            <Input type="text" placeholder={'Opção'} onChange={this.handleChange} value={this.state.option} name={'option'} />
            <Input type="text" placeholder={'Descrição da opção'} onKeyPress={this.handleKeyPress} onChange={this.handleChange} title={'Aperte enter para adicionar'} value={this.state.description} name={'description'} />

            <SortableList items={this.state.items} onChangeItem={this.handleChangeItem} onSortEnd={this.onSortEnd} removeIndex={this.removeIndex} />
          </div>
          <div className="restaurant_menu__modal__footer">
            <Mutation mutation={ADD_MENU_OPTION} refetchQueries={[{query: query, variables: {id: localStorage['id']}}]}>
              {(ADD_MENU_OPTION, {called, loading, error, data}) => (
                <Button labelPosition={'right'} icon onClick={(e) => this.handleCreateMenuOptions(e, ADD_MENU_OPTION)}>
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

export default ModalMenuOptions