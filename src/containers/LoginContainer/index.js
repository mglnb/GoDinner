import React from 'react';
import {Input, Button, Icon, Message} from "semantic-ui-react";
import {ApolloConsumer} from 'react-apollo'
import Logo from '../../components/Logo'
import {login} from './graphql'
import Register from './Register'

class LoginContainer extends React.PureComponent {

  constructor (props) {
    super(props)
    this.state = {
      loading: false,
      called: false,
      error: null,
      active: false,
      step: 1,
    }
  }
  handleLoginForm = async (e, client) => {
    if (this.loginForm.checkValidity()) {
      e.preventDefault()
      e.stopPropagation()
      this.setState({loading: false, called: false, error: null})
      const form = new FormData(this.loginForm)

      try {
        this.setState({loading: true, called: true})

        const {data} = await client.query({
          query: login,
          variables: {email: form.get('email'), password: form.get('password')}
        })

        this.setState({loading: false})

        localStorage['token'] = "Bearer " + data.login.token
        localStorage['is'] = data.login.is
        localStorage['id'] = data.client ? data.login.client.id : data.login.restaurant.id

        this.props.history.push(data.client ? '/client/home' : '/restaurant/home')
      } catch (e) {
        this.setState({error: e})
      }
    }
  }
  handleRegisterForm (e, client) {
    e.preventDefault()
  }
  handleError (error) {
    let msg = ''
    if (error.includes('$email')) {
      msg = "Insira seu email"
      this.setState({emailError: true})
    } else {
      this.setState({emailError: false})
    }

    if (error.includes('$password')) {
      msg = "Insira sua senha"
      this.setState({passwordError: true})
    } else {
      this.setState({passwordError: false})
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
    this.setState({error: null, loading: false, called: false})
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

  addStep = () => {
    this.setState({step: this.state.step + 1})
  }
  decreaseStep = () => {
    this.setState({step: this.state.step - 1})
  }
  render () {
    return (
      <div className="login">
        <Logo />
        <div className={`login__container ${this.state.active && 'active'}`}>
          <div className="login__card">
            <div className="login__box front">
              <ApolloConsumer>
                {client => (
                  <React.Fragment>
                    <h2>Login</h2>
                    <form ref={form => (this.loginForm = form)} onSubmit={(e) => this.handleLoginForm(e, client)}>
                      <div>
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
                      </div>
                      <Button className="login__button" type="submit" animated primary>
                        <Button.Content visible>Enviar</Button.Content>
                        <Button.Content hidden>
                          <Icon name='send' />
                        </Button.Content>
                      </Button>
                    </form>
                    {this.status()}
                    <div className={"login__register"}>
                      <a href="#/" onClick={() => this.setState({active: true, error: null, loading: false})}>Deseja se cadastrar?</a>
                    </div>
                  </React.Fragment>
                )}
              </ApolloConsumer>
            </div>
            <div className="login__box back">
              <Register
                flip={() => this.setState({active: false, error: null, loading: false})}
                step={this.state.step}
                addStep={this.addStep}
                decreaseStep={this.decreaseStep} />
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default LoginContainer;
