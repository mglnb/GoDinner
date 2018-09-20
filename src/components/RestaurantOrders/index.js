import React from "react";
import { Button, Icon, Table, Label } from "semantic-ui-react";
import { Query, Mutation } from "react-apollo";
import { query } from "../RestaurantProfile/graphql";
import CustomLoader from "../Loader";
import Modal from "./Modal";
import { DELETE_ORDER } from "./graphql";
class RestaurantOrders extends React.Component {
  state = {
    modalOpen: false
  };
  handleDelete = (mutation, order) => {
    if (confirm("Você tem certeza?")) {
      mutation({
        variables: {
          id: order.id,
          restaurant_tables_id: order.restaurant_tables.id
        }
      });
    }
  };
  render() {
    return (
      <Query query={query} variables={{ id: localStorage["id"] }}>
        {({ loading, error, data }) => {
          if (loading) return <CustomLoader size="huge" />;
          if (error) return `${error}`;
          const { tables, orders, menus } = data.restaurant[0];
          return (
            <div className="content_container">
              {this.state.modalOpen && (
                <Modal
                  closeModal={() =>
                    this.setState({ modalOpen: !this.state.modalOpen })
                  }
                  tables={tables}
                  menus={menus}
                  modal={this.state.modalOpen}
                />
              )}
              <div className="content_header">
                <h1>Pedidos</h1>
                {/* <Mutation
                  mutation={ADD_TABLE}
                  refetchQueries={[
                    { query: query, variables: { id: localStorage["id"] } }
                  ]}
                >
                  {mutation => ( */}
                <Button
                  basic
                  circular
                  className="restaurant_posts__addbutton"
                  animated
                  color="blue"
                  onClick={() => this.setState({ modalOpen: true })}
                >
                  <Button.Content hidden>Novo</Button.Content>
                  <Button.Content visible>
                    <Icon name="plus" />
                  </Button.Content>
                </Button>
                {/* )} */}
                {/* </Mutation> */}
              </div>
              <div className="content_body">
                <Table color={"blue"}>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Cliente</Table.HeaderCell>
                      <Table.HeaderCell width="2">
                        Número da Mesa
                      </Table.HeaderCell>
                      <Table.HeaderCell width="6">Pedido</Table.HeaderCell>
                      <Table.HeaderCell>Total</Table.HeaderCell>
                      <Table.HeaderCell width="2">Ações</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {orders.map((order, oIndex) => (
                      <Table.Row key={"order-" + oIndex}>
                        <Table.Cell>{order.client.name}</Table.Cell>
                        <Table.Cell>{order.restaurant_tables.id}</Table.Cell>
                        <Table.Cell>
                          {order.menu_options.map((value, index) => (
                            <Label key={"order-" + index} as="a">
                              {value.name}
                            </Label>
                          ))}
                        </Table.Cell>
                        <Table.Cell>
                          {order.menu_options.length > 0
                            ? order.menu_options
                                .reduce((a, b) => ({
                                  price: a.price + b.price
                                }))
                                .price.toLocaleString("pt-BR", {
                                  style: "currency",
                                  currency: "BRL"
                                })
                            : "0".toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL"
                              })}
                        </Table.Cell>
                        <Table.Cell>
                          <Mutation
                            mutation={DELETE_ORDER}
                            refetchQueries={[
                              {
                                query,
                                variables: { id: localStorage["id"] }
                              }
                            ]}
                          >
                            {mutation => (
                              <Button
                                onClick={() =>
                                  this.handleDelete(mutation, order)
                                }
                                basic
                                size="medium"
                                color="red"
                              >
                                Fechar Pedido
                              </Button>
                            )}
                          </Mutation>
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default RestaurantOrders;
