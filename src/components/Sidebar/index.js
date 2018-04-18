import React from 'react';
import { Sidebar, Menu, Icon } from 'semantic-ui-react';
class SidebarComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: this.props.visible,
      menu: [
        { name: 'home', text: 'Home' },
        { name: 'food', text: 'Meu Perfil' },
        { name: 'feed', text: 'Posts' },
        { name: 'address book outline', text: 'Reservas' },
        { name: 'shop', text: 'Pedidos' }
      ]
    }
  }

  componentDidMount () {
    this.setState({ visible: this.props.visible });
  }
  componentWillReceiveProps (nextProps) {
    console.log(nextProps)
    this.setState({ visible: nextProps.visible })
  }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name })
  }
  render () {
    const { activeItem } = this.state
    return (
      <div>
        <Sidebar id="sidebar" as={Menu} width='thin' visible={this.state.visible} icon='labeled' vertical inverted>
          {this.state.menu.map((value, key) => (
            <Menu.Item key={key} href={`#/restaurant/${value.text.toLocaleLowerCase().replace(/ /g, '')}`} active={activeItem === value.name} onClick={this.handleItemClick} name={value.name} >
              <Icon name={value.name} />
              {value.text}
            </Menu.Item>
          ))}
        </Sidebar>
        <Sidebar.Pusher>
          {this.props.children}
        </Sidebar.Pusher>
      </div>
    )
  }

}

export default SidebarComponent;
