import React from 'react';
import { Input, Button, Icon, Message } from "semantic-ui-react";
import gql from 'graphql-tag'
import { ApolloConsumer } from 'react-apollo'
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


class LoginContainer extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      called: false,
      error: null
    }
  }
  handleSubmit = async (e, client) => {
    if (this.form.checkValidity()) e.preventDefault()

    this.setState({ loading: false, called: false, error: null })
    const form = new FormData(this.form)

    try {
      this.setState({ loading: true, called: true })

      const { data } = await client.query({
        query: login,
        variables: { email: form.get('email'), password: form.get('password') }
      })

      this.setState({ loading: false })

      localStorage['token'] = "Bearer " + data.login.token
      localStorage['is'] = data.login.is
      localStorage['id'] = data.client ? data.login.client.id : data.login.restaurant.id

      this.props.history.push(data.client ? '/client/home' : '/restaurant/home')
    } catch (e) {
      this.setState({ error: e })
    }
  }

  handleError (error) {
    let msg = ''
    if (error.includes('$email')) {
      msg = "Insira seu email"
      this.setState({ emailError: true })
    } else {
      this.setState({ emailError: false })
    }

    if (error.includes('$password')) {
      msg = "Insira sua senha"
      this.setState({ passwordError: true })
    } else {
      this.setState({ passwordError: false })
    }

    if (error.includes('inválidos')) {
      msg = error.replace('GraphQL error:', '')
    }
    if (error.includes('Failed to fetch')) {
      msg = "Erro na requisição, verifique sua internet."
    }

    return msg
  }
  handleDismiss = () => {
    this.setState({ error: null, loading: false, called: false })
  }

  status () {
    if (this.state.loading && this.state.called && !this.state.error) {
      return (
        <Message icon>
          <Icon name='circle notched' loading />
          <Message.Content>
            <Message.Header>Aguarde um pouquinho</Message.Header>
            Estamos verificando suas credenciais
         </Message.Content>
        </Message>
      )
    }
    if (
      this.state.called && this.state.error) {
      return (
        <Message icon negative onDismiss={this.handleDismiss}>
          <Icon name='x' />
          <Message.Content>
            <Message.Header>Ops! ocorreu um erro </Message.Header>
            {this.handleError(this.state.error.message)}
          </Message.Content>
        </Message>
      )
    }
  }
  
  render () {
    return (
      <div className="login">
        <div className="login__box">
          <Logo />
          <ApolloConsumer>
            {client => (
              <React.Fragment>
                <form ref={form => (this.form = form)} onSubmit={(e) => this.handleSubmit(e, client)}>
                  <Input
                    error={this.state.emailError}
                    icon="user"
                    name="email"
                    type="email"
                    iconPosition="left"
                    placeholder="Digite seu email"
                    required
                  />
                  <Input
                    error={this.state.passwordError}
                    icon="lock"
                    type="password"
                    name="password"
                    iconPosition="left"
                    placeholder="Digite sua senha"
                    required
                  />
                  <Button className="login__button" type="submit" animated primary>
                    <Button.Content visible>Enviar</Button.Content>
                    <Button.Content hidden>
                      <Icon name='send' />
                    </Button.Content>
                  </Button>
                </form>
                {this.status()}
              </React.Fragment>
            )}
          </ApolloConsumer>
        </div>
      </div>
    )
  }
}

export default LoginContainer;
