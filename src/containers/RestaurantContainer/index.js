import React from 'react';
import gql from 'graphql-tag'
import {Query} from 'react-apollo'
import './index.scss'

const restaurant = gql`
query restaurant ($id: Int!){
  restaurant(id: $id) {
    id
		name
		subname
		location
		number
		phone_number
		cellphone_number
		cpnj
		avatar_url
		description
		user {
			id
			name
			email
		}
		stars {
			id
			star
			client {
				id
				name
				lastname
			}
		}
		bookings {
			id
			client {
				id
				name
			}
		}
		posts {
			id
			likes {
				user{
					id
					name
				}
				liked
			}
			comments {
				
				user {
					id
					name
				}
				comment
			}
		}
		menus { 
			id
			type
			menu_options {
				price
				id
				name
				ingredients
			}
		}
		tables {
			id
			state
		}
	}
}
`

class RestaurantContainer extends React.Component {
  constructor () {
    super();
  }

  render () {
    return this.props.match.params.param === 'meuperfil' ? (
      <Query query={restaurant} variables={{id: localStorage['id']}}>
        {({loading, error, data}) => {
          if (loading) return "Loading..."
          if (error) return `Error! ${error}`
          console.log(data)
          return (
            <p>{data.restaurant[0].name}</p>
          )
        }}
      </Query>
    ) : ''


  }
}

export default RestaurantContainer;
