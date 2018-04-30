import React from 'react'
import {Button, Input, Icon} from 'semantic-ui-react';

class Modal extends React.Component {

  render () {
    return (
      <div className={`restaurant_menu__modal${this.props.modal ? ' active' : ''}`}>
        <div className="restaurant_menu__modal__container">
          <div className="restaurant_menu__modal__header">
            Adicionar Cardápio
          </div>
          <div className="restaurant_menu__modal__content">
            <Input type="text" />
            <Input type="text" />
            <Input type="text" />
          </div>
          <div className="restaurant_menu__modal__footer">
            <Button labelPosition={'right'} icon>
              <Icon name='send' />
              Enviar
            </Button>
          </div>
        </div>
      </div>
    )
  }
}

export default Modal