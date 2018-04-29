import React from 'react';
import { Sidebar, Menu, Icon, Image, Dropdown } from 'semantic-ui-react';
import {NavLink} from 'react-router-dom'
import Logo from '../Logo'
class SidebarComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: this.props.visible,
      activeItem: '',
      menu: [
        { name: 'computer', text: 'Dashboard' },
        { name: 'food', text: 'Meu Perfil' },
        { name: 'feed', text: 'Posts' },
        { name: 'address book outline', text: 'Reservas' },
        { name: 'shop', text: 'Pedidos' }
      ],
      dropdown: [
        {key: 'user',  text: 'Perfil', href: "#/restaurant/meuperfil", icon: 'food'},
        {key: 'settings', text: 'Configurações', icon: 'settings'},
        {key: 'sign-out', text: 'Sair', href: "#/", icon: 'sign out'},
      ]
    }
  }

  componentDidMount() {
    this.setState({ visible: this.props.visible });
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ visible: nextProps.visible })
  }

  render() {
    const { activeItem } = this.state
    console.log(activeItem, this.props.location.location.pathname.split('/')[2])
    return (
      <React.Fragment>
        {this.state.visible && (
          <React.Fragment>
            <Sidebar id="sidebar" as={Menu} width='thin' visible={this.state.visible} icon='labeled'>
              <Logo style={{ transform: 'scale(0.4) translateX(-250px)' }} />
              {this.state.menu.map((value, key) => (
                <Menu.Item as={NavLink} to={`/restaurant/${value.text.toLocaleLowerCase().replace(/ /g, '')}`} key={key} activeClass={'active'}>
                  <Icon name={value.icon} />
                  {value.text}
                </Menu.Item>
              ))}
            </Sidebar>
            <div className="navbar">
              <Dropdown trigger={<span><Image avatar circular src="https://lorempixel.com/70/70/people" /></span>} options={this.state.dropdown} pointing={'top right'} />
            </div>
          </React.Fragment>
        )}
        <Sidebar.Pusher>
          {this.props.children}
        </Sidebar.Pusher>
      </React.Fragment>
    )
  }

}

export default SidebarComponent;
