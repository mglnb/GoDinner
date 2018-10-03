import React from 'react';
import { Sidebar, Menu, Icon, Image, Dropdown } from 'semantic-ui-react';
import {NavLink} from 'react-router-dom'
import Logo from '../Logo' 
import {notification} from 'antd'
import Echo from '../../echo'

Echo.private('App.User' + '.' + localStorage['user_id'])
  .notification((object) => {
    console.log(object)
    notification.info({
      message: object.data.message,
      key: object.data.message,
      duration: 2
    }); 
  })
// Echo.private('Users')
//   .listen('TableStatusChange', object => {
//     console.log(object)
//   })
class SidebarComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: this.props.visible,
      activeItem: '',
      menu: [
        { name: 'dashboard', text: 'Dashboard', href: 'dashboard' },
        { name: 'food', text: 'Meu Perfil', href: 'perfil' },
        { name: 'feed', text: 'Posts', href: 'posts' },
        { name: 'shop', text: 'Pedidos', href: 'pedidos' },
        { name: 'book', text: 'Cardápios', href: 'cardapios' },
        { name: 'grid layout', text: 'Mesas', href: 'mesas' },
      ],
      dropdown: [
        {key: 'user',  text: 'Perfil', href: "#/restaurant/perfil", icon: 'food'},
        // {key: 'settings', text: 'Configurações', icon: 'settings'},
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
    return (
      <React.Fragment>
        {this.state.visible && (
          <React.Fragment>
            <Sidebar id="sidebar" as={Menu} width='thin' visible={this.state.visible} icon='labeled'>
              <Logo style={{ transform: 'scale(0.4) translateX(-250px)' }} />
              {this.state.menu.map((value, key) => (
                <Menu.Item as={NavLink} to={`/restaurant/${value.href}`} key={key}>
                  <Icon name={value.name} />
                  {value.text}
                </Menu.Item>
              ))}
            </Sidebar>
            <div className="navbar">
              <Dropdown trigger={<span><Image avatar circular src={`${localStorage['avatar_url']}`} /></span>} options={this.state.dropdown} pointing={'top right'} />
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
