import React from "react";
import { Query, ApolloConsumer } from "react-apollo";
import { query } from "./graphql";

import Loader from "../Loader";
import MyProfile from "./MyProfile";
import PasswordChange from "./PasswordChange";
import Stars from "./Stars";
import { Card } from "semantic-ui-react";
import firebase from "../../firebase";
import { ALTER_AVATAR } from "./graphql";
import { notification } from "antd";
const storageRef = firebase.storage().ref();
const imagesRef = storageRef.child("images");

class RestaurantProfile extends React.Component {
  handleFileChange = async (e, client) => {
    const file = e.target.files[0];
    notification.open({
      message: "Atualizando imagem...",
      key: "imagem_perfil",
      duration: 10,
    });
    await imagesRef.child(file.name).put(file);

    const fileReader = new FileReader();
    fileReader.onload = () => {
      this.avatar.src = fileReader.result;
    };
    fileReader.readAsDataURL(file);

    const url = await imagesRef.child(file.name).getDownloadURL();
    notification.success({
      message: "Imagem de perfil atualizada",
      key: "imagem_perfil"
    });
    localStorage["avatar_url"] = url;
    client.mutate({
      mutation: ALTER_AVATAR,
      variables: { avatar_url: url, id: localStorage["id"] }
    });
  };
  callFileUpload = () => {
    this.inputFile.click();
  };
  render() {
    return (
      <Query query={query} variables={{ id: localStorage["id"] }}>
        {({ loading, error, data }) => {
          if (loading) return <Loader size="huge" />;
          if (error) return `${error}`;
          const restaurant = data.restaurant[0];
          localStorage["avatar_url"] =
            restaurant.avatar_url ||
            "http://www.rathjenpt.com/wp-content/uploads/2016/09/default-user-img.jpg";
          return (
            data && (
              <React.Fragment>
                <h1 className="restaurant_profile__h1">Meu Perfil</h1>
                <section className="restaurant_profile">
                  <ApolloConsumer>
                    {client => (
                      <div className="restaurant_profile__header">
                        <img
                          ref={img => (this.avatar = img)}
                          className="restaurant_profile__img"
                          src={
                            restaurant.avatar_url ||
                            "http://www.rathjenpt.com/wp-content/uploads/2016/09/default-user-img.jpg"
                          }
                          alt="Avatar"
                          onClick={this.callFileUpload}
                        />
                        <input
                          onChange={e => this.handleFileChange(e, client)}
                          type="file"
                          ref={file => (this.inputFile = file)}
                          style={{ visibility: "hidden", width: 0, height: 0 }}
                        />
                        <h1 className="restaurant_profile__name">
                          {restaurant.name}
                        </h1>
                        <p className="restaurant_profile__subname">
                          {restaurant.user.email}
                        </p>
                      </div>
                    )}
                  </ApolloConsumer>
                  <div className="restaurant_profile__tab">
                    <Card.Group>
                      <div className="restaurant_profile__profile">
                        <MyProfile restaurant={restaurant} />
                      </div>
                      <div className="restaurant_profile__column">
                        <Stars restaurant={restaurant} />
                        <PasswordChange restaurant={restaurant} />
                      </div>
                    </Card.Group>
                  </div>
                  {/* <Tab  panes={panes(restaurant)} /> */}
                </section>
              </React.Fragment>
            )
          );
        }}
      </Query>
    );
  }
}
export default RestaurantProfile;
