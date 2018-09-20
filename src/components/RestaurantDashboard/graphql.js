import gql from 'graphql-tag'

export const DASHBOARD = gql`
query {
    dashboard {
        ordersNow
        totalSales
        totalClients
        salesPerMonth {
            month
            sales
        }
    }
}
`