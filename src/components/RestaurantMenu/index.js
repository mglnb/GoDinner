import React from "react";
import { Button, Icon, Card } from "semantic-ui-react";
import Modal from "./Modal";
import ModalMenuOptions from "./ModalMenuOptions";
import { Query } from "react-apollo";
import { query } from "../RestaurantProfile/graphql";
import CustomLoader from "../Loader";
class RestaurantMenu extends React.Component {
  state = {
    modal: false,
    modalOptions: false,
    menu: null
  };
  openModal = () => {
    this.setState({ modal: true });
  };

  openModalOptions = menu => this.setState({ modalOptions: true, menu });
  closeModal = () => {
    this.setState({ modal: false, modalOptions: false });
  };
  render() {
    return (
      <Query query={query} variables={{ id: localStorage["id"] }}>
        {({ loading, error, data }) => {
          if (loading) return <CustomLoader size="huge" />;
          if (error) return `${error}`;
          const menus = data.restaurant[0].menus;
          const name = data.restaurant[0].name;
          return (
            data && (
              <div className="restaurant_menu">
                <div className="restaurant_menu__container">
                  <div className="restaurant_menu__header">
                    {this.state.modal && (
                      <Modal
                        closeModal={this.closeModal}
                        modal={this.state.modal}
                      />
                    )}
                    {this.state.modalOptions && (
                      <ModalMenuOptions
                        menu={this.state.menu}
                        active={this.state.modalOptions}
                        closeModal={this.closeModal}
                      />
                    )}
                    <h1>Cardápios</h1>
                    <Button
                      basic
                      circular
                      className="restaurant_posts__addbutton"
                      animated
                      color="blue"
                      onClick={this.openModal}
                    >
                      <Button.Content hidden>Novo</Button.Content>
                      <Button.Content visible>
                        <Icon name="plus" />
                      </Button.Content>
                    </Button>
                  </div>
                  <div className="restaurant_menu__main">
                    <Card.Group itemsPerRow={3} style={{ width: "100%" }}>
                      {menus.map((menu, index) => (
                        <Card
                          key={index}
                          link
                          onClick={() => this.openModalOptions(menus[index])}
                        >
                          <Card.Content>
                            <Card.Header>{menu.type}</Card.Header>
                            <Card.Meta>
                              {menu.menu_options.length > 0
                                ? menu.menu_options.length === 1
                                  ? "1 item"
                                  : menu.menu_options.length + " itens"
                                : "Sem itens adicionados"}{" "}
                            </Card.Meta>
                          </Card.Content>
                        </Card>
                      ))}
                    </Card.Group>
                  </div>
                </div>
              </div>
            )
          );
        }}
      </Query>
    );
  }
}

export default RestaurantMenu;
