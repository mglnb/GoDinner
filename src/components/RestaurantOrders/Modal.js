import React from "react";
import Select from "react-select";
import { GET_CLIENTS_NAMES, ADD_ORDER } from "./graphql";
import { Input, Form, Button, Icon } from "semantic-ui-react";
import { Query, Mutation } from "react-apollo";
import CustomLoader from "../Loader";
import { query } from "../RestaurantProfile/graphql";
class Modal extends React.Component {
  state = {
    client: undefined,
    table: undefined,
    options: [],
    price: 0
  };
  handleSubmit(e, mutation) {
    mutation({
      variables: {
        restaurant_id: localStorage["id"],
        client_id: this.state.client.id,
        restaurant_tables_id: this.state.table.id,
        menu_options: this.state.options.map(o => o.id)
      }
    });
  }
  render() {
    return (
      <Query query={GET_CLIENTS_NAMES}>
        {({ loading, error, data }) => {
          if (loading) return <CustomLoader />;
          const array = data.client.map(c => ({
            label: c.name,
            value: c.id,
            id: c.id
          }));
          const tablesMap = this.props.tables.map(t => ({
            label: t.id,
            value: t.id,
            id: t.id,
            state: t.state
          }));
          const tables = tablesMap.filter(t => t.state === "Desocupada")
          const options = [].flatten(this.props.menus.map(m => m.menu_options));
          const selectOptions = options.map(o => ({
            label: o.name,
            value: o.id,
            price: o.price,
            id: o.id
          }));
          return (
            <div className={`orders modal${this.props.modal ? " active" : ""}`}>
              <div className="modal__container">
                <div className="modal__header">
                  <span>Adicionar Pedido</span>
                  <span className="close" onClick={this.props.closeModal} />
                </div>
                <div className="modal__content">
                  <Form>
                    <Form.Field>
                      <label>Cliente:</label>
                      <Select
                        options={array}
                        value={this.state.client}
                        onChange={client => this.setState({ client })}
                        placeholder="Selecione o cliente"
                      />
                    </Form.Field>
                    <Form.Field>
                      <label>Mesa:</label>
                      <Select
                        options={tables}
                        onChange={table => this.setState({ table })}
                        value={this.state.table}
                        placeholder="Selecione a mesa"
                      />
                    </Form.Field>
                    <Form.Field>
                      <label>Opções:</label>
                      <Select
                        multi
                        value={this.state.options}
                        onChange={options =>
                          this.setState({
                            options,
                            price:
                              options.length > 0
                                ? options.reduce((a, b) => ({
                                    price: a.price + b.price
                                  })).price
                                : 0
                          })
                        }
                        options={selectOptions}
                        placeholder="Selecione os pedidos"
                      />
                    </Form.Field>
                  </Form>
                  <p>
                    Total:{" "}
                    {this.state.price.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL"
                    })}
                  </p>
                </div>
                <div className="modal__footer">
                  <Mutation
                    mutation={ADD_ORDER}
                    refetchQueries={[
                      { query: query, variables: { id: localStorage["id"] } }
                    ]}
                  >
                    {(addOrder, _) => (
                      <Button
                        onClick={e => this.handleSubmit(e, addOrder)}
                        labelPosition={"right"}
                        icon
                      >
                        <Icon name="send" />
                        Enviar
                      </Button>
                    )}
                  </Mutation>
                </div>
              </div>
            </div>
          );
        }}
      </Query>
    );
  }
}

export default Modal;
