import gql from 'graphql-tag'

export const ADD_MENU = gql`
  mutation($restaurant_id: ID!, $type: String!) {
    menuCreate(restaurant_id: $restaurant_id, type: $type) {
      id
      type
    }
  } 
`

export const ADD_MENU_OPTION = gql`
mutation($restaurant_menu_id: ID!, $name: String!, $price: Float!, $ingredients: String!) {
  menuOptionsCreate(restaurant_menu_id: $restaurant_menu_id, name: $name, price: $price, ingredients: $ingredients) {
    id
    name
    price
    ingredients
  }
} 
`

export const REMOVE_MENU_OPTION = gql`
  mutation($id: ID!) {
    menuOptionsDelete(id: $id)
  }
`


