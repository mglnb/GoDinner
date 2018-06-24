import React from "react";
import { Button, Icon, Table, Checkbox } from "semantic-ui-react";
import { Query, Mutation } from "react-apollo";
import { query } from "../RestaurantProfile/graphql";
import CustomLoader from "../Loader";
import { ADD_TABLE } from "./graphql";
class RestaurantTables extends React.Component {
  handleCheckBox() {}
  render() {
    return (
      <Query query={query} variables={{ id: localStorage["id"] }}>
        {({ loading, error, data }) => {
          if (loading) return <CustomLoader size="huge" />;
          if (error) return `${error}`;
          const tables = data.restaurant[0].tables;
          return (
            <div className="content_container">
              <div className="content_header">
                <h1>Mesas</h1>
                <Mutation
                  mutation={ADD_TABLE}
                  refetchQueries={[
                    { query: query, variables: { id: localStorage["id"] } }
                  ]}
                >
                  {mutation => (
                    <Button
                      basic
                      circular
                      className="restaurant_posts__addbutton"
                      animated
                      color="blue"
                      onClick={() => mutation()}
                    >
                      <Button.Content hidden>Novo</Button.Content>
                      <Button.Content visible>
                        <Icon name="plus" />
                      </Button.Content>
                    </Button>
                  )}
                </Mutation>
              </div>
              <div className="content_body">
                <Table color={"blue"}>
                  <Table.Header>
                    <Table.Row>
                      <Table.HeaderCell>Número da Mesa</Table.HeaderCell>
                      <Table.HeaderCell>Estado</Table.HeaderCell>
                      <Table.HeaderCell>QR Code</Table.HeaderCell>
                      <Table.HeaderCell>Ações</Table.HeaderCell>
                    </Table.Row>
                  </Table.Header>

                  <Table.Body>
                    {tables.map(table => (
                      <Table.Row key={"table-" + table.id}>
                        <Table.Cell>
                          <input
                            className="input_edit_table"
                            readOnly
                            value={table.id}
                          />
                        </Table.Cell>
                        <Table.Cell verticalAlign="middle">
                          <Checkbox
                            slider
                            checked={table.state === "Ocupada"}
                            onChange={_ => this.handleCheckBox(_, table.id)}
                          />
                          <input
                            className="input_edit_table"
                            readOnly
                            value={table.state}
                          />
                        </Table.Cell>
                        <Table.Cell>
                          <Button basic icon labelPosition="left">
                            Imprimir
                            <Icon name="print" />
                          </Button>
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

export default RestaurantTables;
