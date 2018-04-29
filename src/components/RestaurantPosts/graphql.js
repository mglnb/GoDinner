import gql from 'graphql-tag'

export const ADD_POST = gql`
mutation($id: ID!, $title: String!, $content: String!, $status: String!, $image_url: String!) {
  postCreate(content: $content, status: $status, image_url: $image_url, title: $title, restaurant_id: $id) {
    id
    title
  }
}
`