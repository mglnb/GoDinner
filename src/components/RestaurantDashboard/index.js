import React from "react";
import NumberCard from "./NumberCard";
import SaleChart from "./SaleChart";
class RestaurantDashboard extends React.Component {
  data = [
    {
      Teste1: 210,
      Teste2: 400,
      name: "Janeiro"
    },
    {
      Teste1: 400,
      Teste2: 531,
      name: "Fevereiro"
    },
    {
      Teste1: 123,
      Teste2: 532,
      name: "Março"
    },
    {
      Teste1: 634,
      Teste2: 754,
      name: "Abril"
    },
    {
      Teste1: 454,
      Teste2: 643,
      name: "Maio"
    },
    {
      Teste1: 513,
      Teste2: 23,
      name: "Junho"
    }
  ];
  labels = [
    { name: "Teste1", color: "red" },
    { name: "Teste2", color: "blue" }
  ];

  render() {
    return (
      <div className="content_container">
        <div className="restaurant_dashboard__header">
          <NumberCard icon="food" number="150" title="Pedidos desse mês" />
          <NumberCard icon="dollar sign" currency number="3000" title="Total de Venda" />
          <NumberCard icon="user" number="200" title="Total Clientes" />
        </div>
        <div className="restaurant_dashboard__charts">
          <SaleChart
            data={this.data}
            title={"Vendas Mensal"}
            labels={this.labels}
          />
        </div>
      </div>
    );
  }
}
export default RestaurantDashboard;
