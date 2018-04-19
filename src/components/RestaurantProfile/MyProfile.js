import React from 'react'
import { Button, Form, Input } from 'semantic-ui-react'
import { Mutation } from 'react-apollo';
import { UPDATE_RESTAURANT } from './graphql'
class MyProfile extends React.PureComponent {
    constructor(props) {
        super(props)
        this.state = {
            restaurant: this.props.restaurant
        }
    }
    handleChange = (e) => {
        const name = e.target.name.split('.')
        this.setState({
            restaurant: {
                ...this.state.restaurant,
                [name[0]]: name[1] ? {
                    ...this.state.restaurant[name[0]],
                    [name[1]]: e.target.value
                } : e.target.value
            }
        })
    }
    handleSubmit (e, updateRestaurant) {
        e.preventDefault()
        try {
            updateRestaurant({ variables: { ...this.state.restaurant, email: this.state.restaurant.user.email } })
        } catch (e) {
            console.log(e)
        }
    }
    render () {
        return (
            <Mutation mutation={UPDATE_RESTAURANT} >
                {(updateRestaurant, { loading, error }) => (
                    <React.Fragment>
                        <p></p>
                        <Form ref={form => this.form = form} onSubmit={(e) => this.handleSubmit(e, updateRestaurant)} >
                            <Form.Field>
                                <div className="ui labeled input">
                                    <label htmlFor="name" className="ui label label">Nome do Restaurante: </label>
                                    <input name="name" type="text" onChange={this.handleChange} value={this.state.restaurant.name} />
                                </div>
                            </Form.Field>
                            <Form.Field>
                                <div className="ui labeled input">
                                    <label htmlFor="subname" className="ui label label">Slogan: </label>
                                    <input name="subname" onChange={this.handleChange} value={this.state.restaurant.subname} />
                                </div>
                            </Form.Field>
                            <Form.Field>
                                <div className="ui labeled input">
                                    <label htmlFor="description" className="ui label label">Descrição: </label>
                                    <input name="description" onChange={this.handleChange} value={this.state.restaurant.description} />
                                </div>
                            </Form.Field>
                            <Form.Field>
                                <div className="ui labeled input">
                                    <label htmlFor="location" className="ui label label">Endereço: </label>
                                    <input name="location" onChange={this.handleChange} value={this.state.restaurant.location} />
                                </div>
                            </Form.Field>
                            <Form.Field>
                                <div className="ui labeled input">
                                    <label htmlFor="phone_number" className="ui label label">Telefone: </label>
                                    <input name="phone_number" onChange={this.handleChange} value={this.state.restaurant.phone_number} />
                                </div>
                            </Form.Field>
                            <Form.Field>
                                <div className="ui labeled input">
                                    <label htmlFor="cellphone_number" className="ui label label">Celular: </label>
                                    <input name="cellphone_number" onChange={this.handleChange} value={this.state.restaurant.cellphone_number} />
                                </div>
                            </Form.Field>
                            <Form.Field>
                                <div className="ui labeled input">
                                    <label htmlFor="user.email" className="ui label label">Email do usuário: </label>
                                    <input name="user.email" onChange={this.handleChange} value={this.state.restaurant.user.email} />
                                </div>
                            </Form.Field>
                            <Button primary>Enviar</Button>
                            {error && <p>Erro: {error.message}</p>}
                            {loading && <p>Loading...</p>}
                        </Form>
                    </React.Fragment>

                )}
            </Mutation>
        )
    }
}

export default MyProfile