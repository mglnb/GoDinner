import React from "react";
import { Button, Icon, Table, Label } from "semantic-ui-react";
import { Query, Mutation } from "react-apollo";
import { query } from "../RestaurantProfile/graphql";
import CustomLoader from "../Loader";
class RestaurntBooking extends React.Component {
  state = {
    modalOpen: false
  };
  handleDelete = (mutation, order) => {
    if (confirm("Você tem certeza?")) {
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
              {/* {this.state.modalOpen && (
                <Modal
                  closeModal={() =>
                    this.setState({ modalOpen: !this.state.modalOpen })
                  }
                  tables={tables}
                  menus={menus}
                  modal={this.state.modalOpen}
                />
              )} */}
              <div className="content_header">
                <h1>Reservas</h1>
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
              </div>
              <div className="content_body">
                <Table color={"blue"}>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Cliente</Table.HeaderCell>
                      <Table.HeaderCell width="2">
                        Número da Mesa
                      </Table.HeaderCell>
                      <Table.HeaderCell>Dia / Horário</Table.HeaderCell>
                      <Table.HeaderCell width="2">Ações</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>
                  <Table.Body>
                    {orders.map((order, oIndex) => (
                      <Table.Row key={"order-" + oIndex}>
                        <Table.Cell>{order.client.name}</Table.Cell>
                        <Table.Cell>{order.restaurant_tables.id}</Table.Cell>
                        <Table.Cell>
                            24/08/2018 20:00
                        </Table.Cell>

                        <Table.Cell>
                          <Button basic size="medium" color="red">
                            Remover
                          </Button>
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

export default RestaurntBooking;
