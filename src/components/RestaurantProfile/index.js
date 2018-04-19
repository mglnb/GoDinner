import React from 'react';
import { Query } from 'react-apollo'
import { query } from './graphql'
import Loader from '../Loader';
import MyProfile from './MyProfile'
import { Tab } from 'semantic-ui-react'

const panes = (restaurant) => [
  { menuItem: { key: 'user', icon: 'users', content: 'Meu Perfil' }, render: () => <Tab.Pane><MyProfile restaurant={restaurant} /></Tab.Pane> },
  { menuItem: { key: 'star', icon: 'star', content: 'Avaliações' }, render: () => <Tab.Pane>Tab 2 Content</Tab.Pane> },
  { menuItem: { key: 'lock', icon: 'lock', content: 'Alterar Senha' }, render: () => <Tab.Pane>Tab 3 Content</Tab.Pane> },
]

const RestaurantProfile = () => (
  <Query query={query} variables={{ id: localStorage['id'] }}>
    {({ loading, error, data }) => {
      if (loading)
        return <Loader size='huge' />
      if (error)
        return `${error}`
      console.log('render')
      const restaurant = data.restaurant[0]
      return data && (
        <section className='restaurant_profile'>
          <div className='restaurant_profile__header'>
            <img className='restaurant_profile__img' src={restaurant.avatar_url.replace(/640\/640/g, '160/160')} alt='Avatar' />
            <h1 className='restaurant_profile__name'>{restaurant.name}</h1>
            <p className='restaurant_profile__subname'>{restaurant.user.email}</p>
          </div>
          <Tab className='restaurant_profile__tab' panes={panes(restaurant)} />
        </section>
      )
    }}
  </Query>
)

export default RestaurantProfile;
