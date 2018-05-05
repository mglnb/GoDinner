import gql from 'graphql-tag'

export const ADD_MENU = gql`
  mutation($restaurant_id: ID!, $type: String!) {
    menuCreate(restaurant_id: $restaurant_id, type: $type) {
      id
      type
    }
  } 
`