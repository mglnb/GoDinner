import gql from "graphql-tag";

export const GET_CLIENTS_NAMES = gql`
  query {
    client {
      id
      name
    }
  }
`;

export const ADD_ORDER = gql`
  mutation(
    $restaurant_id: ID!
    $client_id: ID!
    $restaurant_tables_id: ID!
    $menu_options: [ID]
  ) {
    orderCreate(
      restaurant_id: $restaurant_id
      client_id: $client_id
      restaurant_tables_id: $restaurant_tables_id
      menu_options: $menu_options
    ) {
      id
      star
    }
    tableUpdate(
      id: $restaurant_tables_id
      state: "Ocupada"
      client_id: $client_id
    ) {
      id
    }
  }
`;

export const DELETE_ORDER = gql`
  mutation($id: ID!, $restaurant_tables_id: ID!) {
    orderDelete(id: $id)
    tableUpdate(id: $restaurant_tables_id, state: "Desocupada") {
      id
    }
  }
`;
