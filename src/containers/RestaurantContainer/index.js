import React from 'react';
import gql from 'graphql-tag'
import { Query } from 'react-apollo'
import './index.scss'

const restaurant = gql`
query restaurant ($id: ID!){
  restaurant(id: $id) {
    name
  }
}
`

class RestaurantContainer extends React.Component {
  constructor() {
    super();
  }

  render () {
    return this.props.match.params.param === 'meuperfil' ? (
      <Query query={restaurant} variables={{id: localStorage['id']}}>
        {({ loading, error, data }) => {
          if (loading) return "Loading..."
          if (error) return `Error! ${error}`

          return (
            data.restaurant[0].name
          )
        }}
      </Query>
    ) : ''


  }
}

export default RestaurantContainer;
