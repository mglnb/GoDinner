import React from "react";
import NumberCard from "./NumberCard";
import SaleChart from "./SaleChart";
import { Query } from "react-apollo";
import { DASHBOARD } from "./graphql";
import CustomLoader from "../Loader";
class RestaurantDashboard extends React.Component {
    setMonths(months) {
        if (!months) return;
        let array = [];
        for (let i = 1; i <= 12; i++) {
            let j = i;
            if (i < 10) {
                j = `0${i}`;
            }
            let month = months.find(({month}) => month == j)
            if (month) {
                array.push({
                    name: month.month,
                    Venda: month.sales
                });
            } else {
                array.push({
                    name: j,
                    Venda: 0
                });
            }
        }
        return array;
    }

    render() {
        return (
            <Query query={DASHBOARD}>
                {({ data, loading, error }) => {
                    if (loading) return <CustomLoader />;
                    if (error) return <CustomLoader />;
                    return (
                        <div className="content_container">
                            <div className="restaurant_dashboard__header">
                                <NumberCard
                                    icon="food"
                                    number={data.dashboard.ordersNow}
                                    title="Pedidos desse mês"
                                />
                                <NumberCard
                                    icon="dollar"
                                    currency
                                    number={data.dashboard.totalSales}
                                    title="Total de Venda"
                                />
                                <NumberCard
                                    icon="user"
                                    number={data.dashboard.totalClients}
                                    title="Total Clientes"
                                />
                            </div>
                            <div className="restaurant_dashboard__charts">
                                <SaleChart
                                    data={this.setMonths(
                                        data.dashboard.salesPerMonth
                                    )}
                                    title={"Vendas Mensal"}
                                    labels={[
                                        { name: "Venda", color: "#007aff" }
                                    ]}
                                />
                            </div>
                        </div>
                    );
                }}
            </Query>
        );
    }
}
export default RestaurantDashboard;
