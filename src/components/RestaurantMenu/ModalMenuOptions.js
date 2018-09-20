import React from "react";
import { Button, Input, Icon, Confirm } from "semantic-ui-react";
import { Mutation } from "react-apollo";
import { ADD_MENU_OPTION, REMOVE_MENU_OPTION } from "./graphql";
import { query } from "../RestaurantProfile/graphql";
import SortableList from "../SortableList";
import { arrayMove } from "react-sortable-hoc";

class ModalMenuOptions extends React.Component {
  state = {
    id: "",
    option: "",
    description: "",
    confirmOpen: false
  };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  onSortEnd = ({ oldIndex, newIndex }) => {
    this.setState({
      items: arrayMove(this.state.items, oldIndex, newIndex)
    });
  };
  handleCreateMenuOptions = (e, mutation) => {
    this.props.closeModal()
    this.state.items.forEach(item => {
      mutation({
        variables: {
          restaurant_menu_id: this.props.menu.id,
          name: item.value,
          ingredients: item.description,
          price: 0.0
        }
      });
    });
  };
  removeIndex = (index, mutation) => {
    if (confirm("Deseja deletar esta opção?")) {
      const newArray = this.state.items.filter((value, indexItem) => {
        return index !== indexItem;
      });
      mutation({
        variables: {
          id: this.state.items[index].id
        }
      })
      this.setState({
        items: newArray
      });
      this.props.closeModal()
    }
  };
  handleChangeItem = index => {
    const newArray = this.state.items.map((value, indexItem) => {
      return index === indexItem ? "ae" : value;
    });
    this.setState({
      items: newArray
    });
  };
  componentWillMount() {
    this.setState({
      items: this.props.menu.menu_options.map(option => ({
        id: option.id,
        value: option.name,
        description: option.ingredients,
        price: option.price
      }))
    });
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      items: nextProps.menu.menu_options.map(option => ({
        id: option.id,
        value: option.name,
        description: option.ingredients,
        price: option.price
      }))
    });
  }
  submitForm = (e, mutation) => {
    if (this.form.checkValidity()) e.preventDefault();
    mutation({
      variables: {
        restaurant_menu_id: this.props.menu.id,
        name: this.state.option,
        ingredients: this.state.description,
        price: this.state.price
      }
    });
  };
  render() {
    return (
      <div
        className={`restaurant_menu__modal${
          this.props.active ? " active" : ""
        }`}
      >
        <div className="restaurant_menu__modal__container">
          <div className="restaurant_menu__modal__header">
            <span>Adicionar Opções de Pedidos</span>
            <span className="close" onClick={this.props.closeModal} />
          </div>
          <div className="restaurant_menu__modal__content">
            <Mutation
              mutation={ADD_MENU_OPTION}
              refetchQueries={[
                { query: query, variables: { id: localStorage["id"] } }
              ]}
            >
              {(ADD_MENU_OPTION, { called, loading, error, data }) => (
                <form
                  ref={form => (this.form = form)}
                  onSubmit={e => this.submitForm(e, ADD_MENU_OPTION)}
                >
                  <div className="flex">
                    <Input
                      type="text"
                      placeholder={"Opção"}
                      onChange={this.handleChange}
                      value={this.state.option}
                      name={"option"}
                      title={"Ala minuta de frango"}
                      required
                    />
                    <Input
                      type="text"
                      placeholder={"Descrição da opção"}
                      onChange={this.handleChange}
                      title={"Aperte enter para adicionar"}
                      value={this.state.description}
                      name={"description"}
                      title={"Arroz, feijão, bife de frango..."}
                      required
                    />
                    <Input
                      type="text"
                      placeholder={"Valor"}
                      onChange={this.handleChange}
                      value={this.state.price}
                      name={"price"}
                      title={"R$ 9,00"}
                      required
                    />
                  </div>
                  <Button labelPosition={"right"} icon>
                    {!called && <Icon name="send" />}
                    {called &&
                      loading &&
                      !error && <Icon name="circle notched" loading />}
                    {called &&
                      !loading &&
                      error && <Icon name="exclamation triangle" />}
                    {called &&
                      !loading &&
                      !error && <Icon name="check circle outline" />}
                    Enviar
                  </Button>
                </form>
              )}
            </Mutation>
            <Mutation
              mutation={REMOVE_MENU_OPTION}
              refetchQueries={[
                { query: query, variables: { id: localStorage["id"] } }
              ]}
            >
            {REMOVE_MENU_OPTION => (
              <SortableList
                items={this.state.items}
                onChangeItem={this.handleChangeItem}
                onSortEnd={this.onSortEnd}
                removeIndex={(index) => this.removeIndex(index, REMOVE_MENU_OPTION)}
              />
            )}
            </Mutation>
          </div>
          <div className="restaurant_menu__modal__footer" />
        </div>
      </div>
    );
  }
}

export default ModalMenuOptions;
