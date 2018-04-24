import React from 'react';
import {Query} from 'react-apollo'
import {query} from './graphql'
import Loader from '../Loader';
import MyProfile from './MyProfile'
import PasswordChange from './PasswordChange'
import Stars from './Stars'
import {Card} from 'semantic-ui-react'

const RestaurantProfile = () => (
  <Query query={query} variables={{id: localStorage['id']}}>
    {({loading, error, data}) => {
      if (loading)
        return <Loader size='huge' />
      if (error)
        return `${error}`
      console.log('render')
      const restaurant = data.restaurant[0]
      return data && (
        <React.Fragment>
          <h1 className="restaurant_profile__h1">Meu Perfil</h1>
          <section className='restaurant_profile'>
            <div className='restaurant_profile__header'>
              <img className='restaurant_profile__img' src={restaurant.avatar_url.replace(/640\/640/g, '160/160')} alt='Avatar' />
              <h1 className='restaurant_profile__name'>{restaurant.name}</h1>
              <p className='restaurant_profile__subname'>{restaurant.user.email}</p>
            </div>
            <div className='restaurant_profile__tab'>
              <Card.Group>
                <div className="restaurant_profile__profile">
                  <MyProfile restaurant={restaurant} />
                </div>
                <div className="restaurant_profile__column" >
                  <Stars restaurant={restaurant} />
                  <PasswordChange restaurant={restaurant} />
                </div>
              </Card.Group>
            </div>
            {/* <Tab  panes={panes(restaurant)} /> */}
          </section>
        </React.Fragment>
      )
    }}
  </Query>
)

export default RestaurantProfile;
