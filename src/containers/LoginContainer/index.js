import React from 'react';
import {Input, Button, Icon} from "semantic-ui-react";
import gql from 'graphql-tag'
import {ApolloConsumer} from 'react-apollo'
import Logo from '../../components/Logo'
const login = gql`
query Login($email: String!, $password: String!) {
  login(email: $email password: $password) {
    token
    is
    client {
      id
    }
    restaurant {
      id
    }
  }
}
`


class LoginContainer extends React.Component {
  handleSubmit = async (e, client) => {
    e.preventDefault()
    let form = new FormData(this.form)
    try {
      const {data} = await client.query({
        query: login,
        variables: {
          email: form.get('email'),
          password: form.get('password')
        }
      })
      localStorage['token'] = "Bearer " + data.login.token
      localStorage['is'] = data.login.is
      if (data.client) {
        localStorage['id'] = data.login.client.id
        this.props.history.push('/client/home')
      } else {
        localStorage['id'] = data.login.restaurant.id
        this.props.history.push('/restaurant/home')
      }
    } catch (e) {
      console.log(e)
    }
  }
  render () {
    return (
      <div className="login">
        <div className="login__box">
          <Logo />
          <ApolloConsumer>
            {client => (
              <form method="post" ref={form => (this.form = form)} onSubmit={(e) => this.handleSubmit(e, client)}>
                <Input icon="user" name="email" iconPosition="left" placeholder="Digite seu email" />
                <Input icon="lock" type="password" name="password" iconPosition="left" placeholder="Digite sua senha" />
                <Button className="login__button" type="submit" animated primary>
                  <Button.Content visible>Enviar</Button.Content>
                  <Button.Content hidden>
                    <Icon name='send' />
                  </Button.Content>
                </Button>
              </form>
            )}
          </ApolloConsumer>
        </div>
      </div>

    )
  }

}

export default LoginContainer;
