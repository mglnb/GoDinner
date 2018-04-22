import React from 'react'
import {Card, Button, Form} from 'semantic-ui-react'
import {ALTER_PASSWORD} from "./graphql";
import {Mutation} from 'react-apollo'
class PasswordChange extends React.Component {
  handleSubmit (e, alterPassword) {
    e.preventDefault()
    const form = new FormData(this.form)
    console.log(form)
    if (form.get('new_password') === form.get('new_password_2')) {
      alterPassword({
        variables: {
          id: this.props.restaurant.user.id,
          old_password: this.old.value,
          new_password: this.new.value
        }
      })
    } else {
      console.log('não são iguais')
    }
  }
  render () {
    return (
      <Mutation mutation={ALTER_PASSWORD}>
        {(alterPassword, {loading, error, called, data}) => (
          <Card>
            <Card.Content>
              <Card.Header>
                Alterar Senha
              </Card.Header>
            </Card.Content>
            <Card.Content>
              <Form ref={form => this.form = form}
                onSubmit={(e) => this.handleSubmit(e, alterPassword)}>
                <div className="input">
                  <label htmlFor="old_password">Antiga senha: </label>
                  <input type="password" name="old_password" ref={old => this.old = old} onChange={this.handleChange} />
                </div>
                <div className="input">
                  <label htmlFor="new_password">Nova senha: </label>
                  <input type="password" name="new_password" ref={newPassword => this.new = newPassword} onChange={this.handleChange} />
                </div>
                <div className="input">
                  <label htmlFor="new_password_2">Repita a nova senha: </label>
                  <input type="password" name="new_password_2" ref={new2 => this.new2 = new2} onChange={this.handleChange} />
                </div>
                <Button primary>Enviar</Button>
                {error && <p>Erro: {error.message}</p>}
                {loading && <p>Loading...</p>}
                {called && !error && !loading && data.resetPassword && <p>Alterado com sucesso</p>}
                {called && !error && !loading && !data.resetPassword && <p>Antiga senha inválida</p>}
                {console.log(data)}
              </Form>
            </Card.Content>
          </Card>
        )}
      </Mutation>
    )
  }
}

export default PasswordChange