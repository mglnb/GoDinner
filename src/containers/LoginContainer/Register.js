import React from 'react'
import { ApolloConsumer } from 'react-apollo';
import { CSSTransition } from 'react-transition-group'
import { Input, Button, Icon, Message } from 'semantic-ui-react';
import RegisterSteps from './RegisterSteps'
// import googleMapsClient from '@google/maps'
import _ from 'lodash'
import MaskedInput from 'react-maskedinput'
import jsonp from 'jsonp'
// const gmaps = googleMapsClient.createClient({
//   key: 'AIzaSyCkUXgyaiuJ-8BERszscr5qwSOWHZI8Hq4',
//   Promise: Promise
// })
import { register } from './graphql'


class Register extends React.PureComponent {

  state = {
    addressOptions: [],
    cnpj: '',
    name: '',
    address: '',
    number: '',
    city: '',
    uf: '',
    telphone: '',
    subname: '',
    neighborhood: '',
    called: false,
    error: false,
    loading: false
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
    if (this.state.called && this.state.error) {
      return (
        <Message  icon negative onDismiss={this.handleDismiss}>
          <Icon name='x' />
          <Message.Content>
            <Message.Header>Ops! ocorreu um erro </Message.Header>
            {this.state.error.message}
          </Message.Content>
        </Message>
      )
    }
    if(this.state.called && !this.state.error && !this.state.loading) {
      return (
        <Message icon positive onDismiss={this.handleDismiss}>
          <Icon color="green" name='check' />
          <Message.Content>
            <Message.Header>Usuário cadastrado!</Message.Header>
          </Message.Content>
        </Message>
      )
    }
  }
  handleRegisterForm = async (e, client) => {
    if (this.registerForm.checkValidity()) e.preventDefault()
    this.setState({ address: `${this.state.address}, ${this.state.city}, ${this.state.uf.toUpperCase()}`, loading: true, called: true, error: false})
    const { data } = await client.mutate({
      mutation: register,
      variables: { ...this.state }
    })
    if(data.name) {
      this.setState({loading: false, called: true, error: false})
    } else {
      this.setState({loading: false, called: true, error: false})
    }
  }
  handleChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }
  handleCNPJChange = _.debounce(() => {
    if (this.state.cnpj.length > 0) {
      jsonp(
        `https://www.receitaws.com.br/v1/cnpj/${cnpj}`,
        null,
        (err, json) => {
          if (err) return;
          if (json.status !== "OK") {
            return;
          }
          this.setState({
            name: json.nome,
            address: json.logradouro,
            number: json.numero,
            city: json.municipio,
            uf: json.uf,
            telphone: json.telefone,
            subname: json.atividade_principal[0].text || "",
            neighborhood: json.bairro
          });
        }
      );
    }
  }, 700)
  addStep() {
    if (this.registerForm.checkValidity()) {
      this.props.addStep()
    }
  }
  decreaseStep() {
    this.props.decreaseStep()
  }
  render() {
    return (
      <ApolloConsumer>
        {client => (
          <React.Fragment>
            <RegisterSteps step={this.props.step} />
            <h2>Cadastre-se</h2>
            <form ref={form => (this.registerForm = form)} onSubmit={(e) => this.handleRegisterForm(e, client)}>
              <CSSTransition
                in={this.props.step === 1}
                out={`${this.props.step !== 1}`}
                timeout={1000}
                classNames={'inputs'}
                unmountOnExit
              >
                <div>
                  <Input
                    className={'left icon'}
                    children={
                      <React.Fragment>
                        <MaskedInput
                          name="cnpj"
                          mask='11.111.111/1111-11'
                          placeholder="CNPJ"
                          pattern={'[0-9]{2}\.[0-9]{3}\.[0-9]{3}\/[0-9]{4}\-[0-9]{2}'}
                          title="Digite o CNPJ no formato ###.###.###-##"
                          value={this.state.cnpj}
                          onChange={this.handleChange}
                          required
                          onKeyUp={this.handleCNPJChange}
                        />
                        <Icon name="building outline" />
                      </React.Fragment>

                    }
                  />
                  <Input
                    icon="user"
                    name="name"
                    type="text"
                    value={this.state.name}
                    onChange={this.handleChange}
                    required
                    iconPosition="left"
                    placeholder="Nome"
                    title="Digite seu nome"
                  />
                </div>
              </CSSTransition>
              <CSSTransition
                in={this.props.step === 2}
                out={`${this.props.step !== 2}`}
                timeout={1000}
                classNames={'inputs'}
                unmountOnExit
              >
                <div>
                  <div className="input__group">
                    <Input
                      icon="marker"
                      name="address"
                      type="text"
                      iconPosition="left"
                      placeholder="Endereço"
                      title="Digite seu endereço"
                      value={this.state.address}
                      onChange={this.handleChange}
                      required
                    // onKeyUp={this.handleKeyAddress}
                    />
                    <Input
                      icon="map pin"
                      name="number"
                      onChange={this.handleChange}
                      value={this.state.number}
                      iconPosition="left"
                      required
                      placeholder="Numero do endereço"
                      title="Digite o numero do endereço"
                    />
                  </div>
                  <div className="input__group">
                    <Input
                      icon="map signs"
                      name="city"
                      title="Cidade"
                      onChange={this.handleChange}
                      value={this.state.city}
                      iconPosition="left"
                      placeholder="Digite sua cidade"
                      required
                    />
                    <Input
                      icon="map outline"
                      name="uf"
                      required
                      onChange={this.handleChange}
                      value={this.state.uf}
                      iconPosition="left"
                      placeholder="UF"
                      title="Digite seu UF"
                    />
                  </div>
                </div>
              </CSSTransition>
              <CSSTransition
                in={this.props.step === 3}
                out={`${this.props.step !== 3}`}
                timeout={1000}
                classNames={'inputs'}
                unmountOnExit
              >
                <div>
                  <Input
                    icon="user"
                    name="email"
                    type="email"
                    required
                    value={this.state.email}
                    onChange={this.handleChange}
                    iconPosition="left"
                    placeholder="Digite seu email"
                    title="Digite seu email"
                  />
                  <Input
                    icon="lock"
                    name="password"
                    type="password"
                    required
                    onChange={this.handleChange}
                    value={this.state.password}
                    iconPosition="left"
                    placeholder="Digite sua senha"
                    title="Digite sua senha"
                  />
                </div>
              </CSSTransition>
              <div className="button_group">
                {this.props.step > 1 && this.props.step < 4 && (
                  <Button labelPosition={'left'} icon onClick={() => this.decreaseStep()}>
                    <Icon name='arrow left' />
                    Voltar
                  </Button>
                )}
                {this.props.step > 0 && this.props.step < 3 && (
                  <Button icon labelPosition={'right'} onClick={() => this.addStep()}>
                    <Icon name='arrow right' />
                    Próximo
                  </Button>
                )}
                {this.props.step === 3 && (
                  <Button icon labelPosition={'right'} type={'submit'}>
                    <Icon name='send outline' />
                    Enviar
                  </Button>
                )}
              </div>
            </form>
            {this.status()}
            <div className={"login__register"}>
              <a href="#/" onClick={() => this.props.flip()}>Já possui uma conta?</a>
            </div>
          </React.Fragment>
        )}
      </ApolloConsumer>
    )
  }
}
export default Register