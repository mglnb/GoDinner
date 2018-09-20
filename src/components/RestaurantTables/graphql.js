import gql from "graphql-tag";


export const ADD_TABLE = gql`
mutation($table_number: Int!) {
    tableCreate(state: "", restaurant_id: 0, table_number: $table_number) {
        id
        state
    }
}
`
export const REMOVE_TABLE = gql`
mutation($id: ID!) {
    tableDelete(id: $id)
}

`