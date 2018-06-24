import gql from "graphql-tag";


export const ADD_TABLE = gql`
mutation {
    tableCreate(state: "", restaurant_id: 0) {
        id
        state
    }
}
`