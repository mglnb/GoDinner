import gql from 'graphql-tag'

export const login = gql`
query Login($email: String!, $password: String!) {
  login(email: $email password: $password) {
    token
    is
    client {
      id
    }
    restaurant {
      id
    }
  }
}
`

export const register = gql`
mutation($name: String!, $address: String!, $number: Int!, $cnpj: String!, $email: String!, $password: String!) {
  restaurantCreate(
    name: $name,
    location: $address,
    number: $number,
    cnpj: $cnpj,
    email: $email,
    password: $password
  ) {
    id,
    name
    user {
      id
    }
  }
}
`